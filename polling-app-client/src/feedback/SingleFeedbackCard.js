import React, { Component } from 'react';
import { getSingleFeedback } from '../util/APIUtils';
import SingleComment from '../comment/SingleComment';
import { withRouter, Link } from 'react-router-dom';
import pollIcon from '../poll.svg';
import { Avatar, Icon } from 'antd';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class SingleFeedbackCard extends Component {
	constructor(props) {
        super(props);
		this.state = {
            detailLink:""
        };
   }

	componentDidMount() {
		   this.setState({
				 detailLink:"/feedbacks/" + this.props.feedback.id
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
						<div>
							<div className="poll-creator-info">
							 <Link className="creator-link" to={`/users/${this.props.feedback.createdBy.username}`}>
		                            <Avatar className="poll-creator-avatar"
		                                style={{ backgroundColor: getAvatarColor(this.props.feedback.createdBy.name)}} >
		                                {this.props.feedback.createdBy.name[0].toUpperCase()}
		                            </Avatar>
		                            <span className="poll-creator-name">
		                                {this.props.feedback.createdBy.name}
		                            </span>
		                            <span className="poll-creator-username">
		                                @{this.props.feedback.createdBy.username}
		                            </span>
		                            <span className="poll-creation-date">
		                                {formatDateTime(this.props.feedback.creationDateTime)}
		                            </span>
		                    </Link>
					    </div>
						<div>
							<p>Doctor name: {this.props.feedback.doctorName}</p>
							<p>Hospital: {this.props.feedback.doctorHospital}</p>
							<p>Department: {this.props.feedback.doctorDepartment}</p>
							<Link to={this.state.detailLink}>
				                   Find Details
				            </Link>
	                     </div>
                     </div>
                </div>

            </div>
        );
    }
}

export default SingleFeedbackCard;
