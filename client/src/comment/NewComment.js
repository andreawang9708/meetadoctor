import React, { Component } from 'react';
import { addComment } from '../util/APIUtils';
import { COMMENT_TEXT_MAX_LENGTH } from '../constants';
import './NewComment.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class NewComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: {
                text: ''
            }

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const CommentData = {
            text: this.state.text.text,
            feedbackId: this.props.match.params.feedbackId
        };

  		console.log(CommentData);
          addComment(this.props.match.params.feedbackId, CommentData)
          .then(response => {
  			console.log(CommentData);
              console.log(response);
  			window.location.href = "/feedbacks/" + this.props.match.params.feedbackId;
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
            } else {
                notification.error({
                    message: 'Reservation App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    validateText = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your question!'
            }
        } else if (text.length > COMMENT_TEXT_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${COMMENT_TEXT_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleTextChange(event) {
        const value = event.target.value;
        this.setState({
                text: {
                text: value,
                ...this.validateText(value)
            }
        });
    }


    isFormInvalid() {
        if(this.state.text.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create Comment</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.text.validateStatus}
                            help={this.state.text.errorMsg} className="poll-form-row">
	                        <TextArea
	                            placeholder="Enter comment"
	                            style = {{ fontSize: '16px' }}
	                            autosize={{ minRows: 3, maxRows: 6 }}
	                            name = "text"
	                            value = {this.state.text.text}
	                            onChange = {this.handleTextChange} />
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Comment</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewComment;
