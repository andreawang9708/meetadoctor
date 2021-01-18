import React, { Component } from 'react';
import { getSingleFeedback } from '../util/APIUtils';
import SingleComment from '../comment/SingleComment';
import { withRouter, Link } from 'react-router-dom';
import pollIcon from '../poll.svg';
import { Avatar, Icon } from 'antd';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import './Poll.css';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class SingleCommentCard extends Component {
	constructor(props) {
        super(props);
		this.state = {
            detailLink:"",
			doctorName:""
        };
   }

	componentDidMount() {
			
		    this.setState({
				 detailLink:"/feedbacks/" + this.props.comment.feedbackId
			})
		    getSingleFeedback(this.props.comment.feedbackId).then(response => {
				 console.log(response);
				 this.setState({
				      doctorName: response.doctorName
			     })
			})
	}
	
	commentFeedback() {
		return this.addCommentLink;	
	}
        
    render() {
		console.log(this.props.feedback);  
        return (
            <div className="poll-content">
                <div className="poll-header">
					<div className="poll-creator-info">
						 <Link className="creator-link" to={`/users/${this.props.comment.createdBy.username}`}>
	                            <Avatar className="poll-creator-avatar" 
	                                style={{ backgroundColor: getAvatarColor(this.props.comment.createdBy.name)}} >
	                                {this.props.comment.createdBy.name[0].toUpperCase()}
	                            </Avatar>
	                            <span className="poll-creator-name">
	                                {this.props.comment.createdBy.name}
	                            </span>
	                            <span className="poll-creator-username">
	                                @{this.props.comment.createdBy.username}
	                            </span>
	                            <span className="poll-creation-date">
	                                {formatDateTime(this.props.comment.creationDateTime)}
	                            </span>
	                    </Link>
					</div>
					<div>
						<div>
							<p>Comment: {this.props.comment.text}</p>
	                     </div>
                     </div>
                </div>
				
            </div>
        );
    }
}

export default SingleCommentCard;