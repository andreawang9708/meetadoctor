import React, { Component } from 'react';
import { getAllFeedbacks, getUserCreatedFeedbacks,  getUserCreatedComments} from '../util/APIUtils';
import SingleFeedbackCard from '../feedback/SingleFeedbackCard';
import SingleCommentCard from '../comment/SingleCommentCard';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { POLL_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import '../poll/PollList.css';

class FeedbackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
			last: true,
        };
        this.loadFeedbackList = this.loadFeedbackList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadFeedbackList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if (this.props.type === 'USER_CREATED_FEEDBACKS') {
				console.log("here");
	            promise = getUserCreatedFeedbacks(this.props.username, page, size);
             } else if (this.props.type === 'USER_CREATED_COMMENTS') {
	            promise = getUserCreatedComments(this.props.username, page, size);
				console.log(promise);
             }
        } else {
            promise = getAllFeedbacks(page, size);
        }

        if(!promise) {
            return;
        } else {
			console.log(promise);
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
			console.log(this.state.feedbacks.slice(response.content));
            const feedbacks = this.state.feedbacks.slice();

            this.setState({
                feedbacks: feedbacks.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
				last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadFeedbackList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                polls: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
				        last: true,
                isLoading: false
            });
            this.loadFeedbackList();
        }
    }

    handleLoadMore() {
        this.loadFeedbackList(this.state.page + 1);
    }


    render() {
        const feedbackViews = [];
		console.log(this.state.feedbacks);
        this.state.feedbacks.forEach((feedback, feedbackIndex) => {
		   {
                this.props.type === 'USER_CREATED_FEEDBACKS' ? (
                       feedbackViews.push(<SingleFeedbackCard key={feedback} feedback={feedback}/>)
                 ): null
           }
		   {
                this.props.type === 'USER_CREATED_COMMENTS' ? (
                       feedbackViews.push(<SingleCommentCard key={feedback} comment={feedback}/>)
                 ): null
            }
        });

        return (
            <div className="polls-container">
                {feedbackViews}
                {
                    !this.state.isLoading && this.state.feedbacks.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No feedbacks Found...</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                    <LoadingIndicator />: null
                }
            </div>
        );
    }
}

export default withRouter(FeedbackList);
