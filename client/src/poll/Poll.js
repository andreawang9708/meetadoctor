import React, { Component } from 'react';
import './Poll.css';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { castVote } from '../util/APIUtils';
import { notification } from 'antd';
import { getSingleFeedback, getPollById } from '../util/APIUtils';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Poll extends Component {
	constructor(props) {
        super(props);
        this.state = {
			poll: {},
			choiceView:[],
			complete: false,
			currentVote: {},
			selectedChoice: {}
        };
        this.handleVoteChange = this.handleVoteChange.bind(this);
        this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
    }

    componentDidMount() {
		getPollById(this.props.pollId).then(response => {
				console.log(response);
				const pollChoices = [];
				if(response.selectedChoice) {
            //const winningChoice = this.props.poll.expired ? this.getWinningChoice() : null;
		            const winningChoice = null;
		            response.choices.forEach(choice => {
		                pollChoices.push(<CompletedOrVotedPollChoice
		                    key={choice.id}
		                    choice={choice}
		                    isWinner={winningChoice && choice.id === winningChoice.id}
		                    isSelected={this.isSelected(choice)}
		                    percentVote={this.calculatePercentage(choice)}
		                />);
		            });
		        } else {
		            response.choices.forEach(choice => {
		                pollChoices.push(<Radio className="poll-choice-radio" key={choice.id} value={choice.id}>{choice.text}</Radio>)
		            })
		        }
				this.setState( {
					poll: response,
					choiceView: pollChoices,
					selectedChoice: response.isSelected,
					complete: true
			    })
			});
	}


    calculatePercentage = (choice) => {
        if(this.state.poll.totalVotes === 0) {
            return 0;
        }
        return (choice.voteCount*100)/(this.state.poll.totalVotes);
    };

    isSelected = (choice) => {
        return this.state.poll.isSelectedChoice === choice.id;
    }

    getWinningChoice = () => {
        return this.state.poll.choices.reduce((prevChoice, currentChoice) =>
            currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice,
            {voteCount: -Infinity}
        );
    }

    handleVoteChange(event) {
			const newPoll = this.state.poll;
			newPoll.isSelectedChoice = event.target.value;
	        this.setState({
	            poll:newPoll,
				currentVote: event.target.value,
	        });
       }

	 handleVoteSubmit(event) {
	        event.preventDefault();
	        if(!this.props.isAuthenticated) {
	            //this.props.history.push("/login");
	            notification.info({
	                message: 'Reservation App',
	                description: "Please login to vote.",
	            });
	            return;
	        }
			this.setState({selectedChoice: this.state.currentVote});
	        const poll = this.state.poll;
	        const selectedChoice = this.state.currentVote;

	        const voteData = {
	            pollId: poll.id,
	            choiceId: selectedChoice
	        };

	        castVote(voteData)
	        .then(response => {
	            this.setState({
	                poll: response
	            });
	        }).catch(error => {
	            if(error.status === 401) {
	                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');
	            } else {
	                notification.error({
	                    message: 'Reservation App',
	                    description: error.message || 'Sorry! Something went wrong. Please try again!'
	                });
	            }
	        });
    }


    getTimeRemaining = (poll) => {
        const expirationTime = new Date(poll.expirationDateTime).getTime();
        const currentTime = new Date().getTime();

        var difference_ms = expirationTime - currentTime;
        var seconds = Math.floor( (difference_ms/1000) % 60 );
        var minutes = Math.floor( (difference_ms/1000/60) % 60 );
        var hours = Math.floor( (difference_ms/(1000*60*60)) % 24 );
        var days = Math.floor( difference_ms/(1000*60*60*24) );

        let timeRemaining;

        if(days > 0) {
            timeRemaining = days + " days left";
        } else if (hours > 0) {
            timeRemaining = hours + " hours left";
        } else if (minutes > 0) {
            timeRemaining = minutes + " minutes left";
        } else if(seconds > 0) {
            timeRemaining = seconds + " seconds left";
        } else {
            timeRemaining = "less than a second left";
        }

        return timeRemaining;
    }

    render() {
		console.log(this.state.poll);
		console.log(this.state.choiceView);
		console.log(this.state.selectedChoice);
		const pollChoices = [];
		if(this.state.complete == true && (this.state.poll.selectedChoice || this.state.selectedChoice)) {
            //const winningChoice = this.props.poll.expired ? this.getWinningChoice() : null;
			  console.log(this.state.selectedChoice);
		      const winningChoice = null;
		      this.state.poll.choices.forEach(choice => {
		                   pollChoices.push(<CompletedOrVotedPollChoice
		                    key={choice.id}
		                    choice={choice}
		                    isWinner={winningChoice && choice.id === winningChoice.id}
		                    isSelected={this.isSelected(choice)}
		                    percentVote={this.calculatePercentage(choice)}
		                />);
		            });
		} else if(this.state.complete == true){
		            this.state.poll.choices.forEach(choice => {
		                pollChoices.push(<Radio className="poll-choice-radio" key={choice.id} value={choice.id}>{choice.text}</Radio>)
		            })
		}
		console.log(pollChoices);

        return (
            <div className="poll-content" style={{marginTop:"40px", marginBottom:"20px", marginLeft:"20px", marginRight:"30px"}}>
				{ this.state.complete === true? (
				<div style={{marginTop:"20px", marginBottom:"20px", marginLeft:"30px", marginRight:"30px"}}>
                <div className="poll-header">
                    <div className="poll-question">
                        {this.state.poll.question}
                    </div>
                </div>
                <div className="poll-choices">
                    <RadioGroup
                        className="poll-choice-radio-group"
                        onChange={this.handleVoteChange}
                        value={this.state.currentVote}>
                        { pollChoices }
                    </RadioGroup>
                </div>
                <div className="poll-footer">
                    {
                        !(this.state.poll.selectedChoice) ?
                        (<Button className="vote-button" disabled={!this.state.currentVote} onClick={this.handleVoteSubmit}>Vote</Button>) : null
                    }
                    <span className="total-votes">{this.state.poll.totalVotes} votes</span>
                    <span className="separator">•</span>
                </div>
                </div>):null}
            </div>
        );
    }
}

function getMatchingChoice(num){
	let res = ""
	switch (num){
		case "1":
			res = "poor";
			break
		case "2":
			res = "fair";
			break;
		case "3":
			res = "good";
			break;
		case "4":
			res = "very good";
			break;
		case "5":
			res = "perfect";
			break;
		default:
			res = "..."
	}
	return res;
}

function CompletedOrVotedPollChoice(props) {
    return (
        <div className="cv-poll-choice">
            <span className="cv-poll-choice-details">
                <span className="cv-choice-percentage">
                    {Math.round(props.percentVote * 100) / 100}%
                </span>
                <span className="cv-choice-text">
                    {getMatchingChoice(props.choice.text)}
                </span>
                {
                    props.isSelected ? (
                    <Icon
                        className="selected-choice-icon"
                        type="check-circle-o"
                    /> ): null
                }
            </span>
            <span className={props.isWinner ? 'cv-choice-percent-chart winner': 'cv-choice-percent-chart'}
                style={{width: props.percentVote + '%' }}>
            </span>
        </div>
    );
}


export default Poll;
