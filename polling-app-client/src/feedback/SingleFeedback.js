import React, { Component } from 'react';
import { getSingleFeedback, getPollById } from '../util/APIUtils';
import SingleCommentCard2 from '../comment/SingleCommentCard2';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import pollIcon from '../poll.svg';
import Poll from '../poll/Poll';
import { castVote } from '../util/APIUtils';
import { notification } from 'antd';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class SingleFeedback extends Component {
	constructor(props) {
        super(props);
        this.state = {
            doctorName:"",
			doctorDepartment:"",
			doctorHospital:"",
			doctorInfo:'',
			author:'',
            comments: [],
			pollId:0,
            addCommentLink: "/"+ this.props.match.params.feedbackId + "/comments/new",
			currentVotes:{},
			poll: {}
        };

        this.commentFeedback = this.commentFeedback.bind(this);


    }

	componentWillMount() {
		getSingleFeedback(this.props.match.params.feedbackId).then(response => {
			console.log(response);
			this.setState({
				doctorName:response.doctorName,
				doctorHospital:response.doctorHospital,
			    doctorDepartment:response.doctorDepartment,
			    doctorInfo:response.doctorInfo,
				author: response.createdBy.username,
				comments: response.comments,
				pollId: response.pollId

			})
		});
	}


	commentFeedback() {
		return this.addCommentLink;
	}

    render() {
	    console.log(this.state.pollId);
		console.log(this.props.isAuthenticated);
        return (
            <div className="poll-content">
                <div class="container poll-header">
								<div class="row">
									<div class="col-6">
										<div style={{marginTop:"20px", marginBottom:"20px", marginLeft:"30px"}}>
											<p>Doctor Name: {this.state.doctorName}</p>
											<p>Hospital: {this.state.doctorHospital}</p>
											<p>Department: {this.state.doctorDepartment}</p>
											<p>Information: {this.state.doctorInfo}</p>
											<p>Author: {this.state.author}</p>
											<br/>
											<Link to={this.state.addCommentLink} style={{marginBottom:"50px", marginTop:"50px", marginLeft: "1%", border:"2px white solid", backgroundColor: "#63C5DA", color:"white", padding:"10px"}}>
														Add Comments
											</Link>

									  </div>
				          </div>
									<br/>
									<div class="col-4">
										<br/>
										<div class="card text-center" style={{width:"15rem"}}>
										  <img class="card-img-top" src="https://thumbs.dreamstime.com/b/merry-christmas-happy-new-year-greeting-background-copy-space-winter-background-snow-christmas-light-merry-158265046.jpg" alt="Card image cap"/>
										  <div class="card-body">
										    <p class="card-text">{"Dr.".concat(this.state.doctorName)}</p>
										  </div>
										</div>
									</div>
								</div>

                     {
							!this.state.pollId == 0? (<Poll
						        key={this.state.poll}
						        pollId={this.state.pollId}
						        currentVote={this.state.currentVotes}
										currentUser={this.props.currentUser}
									  handleLogout={this.props.handleLogout}
										isAuthenticated={this.props.isAuthenticated}
						     />):null
                     }
                     <div>
						 {this.state.comments.map((comment, i) => {

					          return (<SingleCommentCard2 key={comment} comment={comment} />)
					       })}
                     </div>
                </div>

            </div>
        );
    }
}

		// <Poll
//			                key={this.state.poll}
	//		                pollId={this.state.pollId}
		//	                currentVote={this.state.currentVotes}
		//	           />

export default SingleFeedback;
