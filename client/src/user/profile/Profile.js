import React, { Component } from 'react';
import FeedbackList from '../../feedback/FeedbackList';
import ReservationList from '../../appointment/ReservationList'
import { getUserProfile, getUserCreatedFeedbacks, getUserCreatedComments } from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';


const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
			feedbackCount: 0,
			commentCount: 0
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
		getUserCreatedFeedbacks(username, 0, 10) .then(response => {
			console.log(response.totalElements);
			 this.setState({
                    feedbackCount: response.totalElements
             });
		});
		getUserCreatedComments(username, 0, 10) .then(response => {
			console.log(response.totalElements);
			 this.setState({
                    commentCount: response.totalElements
             });
		});
		this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile" style={{backgroundImage: `url("https://cdn.wallpapersafari.com/27/93/cpljCG.jpg")`}}>
                {
                    this.state.user ? (
                        <div className="user-profile">
                          <div class="jumbotron">
                            <div className="user-details">

                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>

                            </div>
                            <div className="user-details">

                                <Tabs defaultActiveKey="1"
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                        <TabPane tab={`Personal Info`} key="1">
                                        <div className="full-name">Name:{this.state.user.name}</div>
                                        <div className="username">Username:{this.state.user.username}</div>
                                        <div className="userId">ID:{this.state.user.id}</div>
                                    </TabPane>
									                  <TabPane tab={`${this.state.feedbackCount} Feedbacks`}  key="2">
                                      <FeedbackList username={this.props.match.params.username} type="USER_CREATED_FEEDBACKS" />
                                    </TabPane>
									                  <TabPane tab={`${this.state.commentCount} Comments`}  key="3">
                                      <FeedbackList username={this.props.match.params.username} type="USER_CREATED_COMMENTS" />
                                    </TabPane>
                                    <TabPane tab={`Reservations`}  key="4">
                                        <ReservationList username={this.props.match.params.username} type="USER_RESERVED_APPOINTMENTS" />
                                    </TabPane>
                                </Tabs>

                            </div>
                          </div>
                        </div>
                    ): null
                }
            </div>
        );
    }
}

export default Profile;
