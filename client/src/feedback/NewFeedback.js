import React, { Component } from 'react';
import { createFeedback, getFeedback } from '../util/APIUtils';
import { MAX_CHOICES, FEEDBACK_DOCTORINFO_MAX_LENGTH, FEEDBACK_DOCTORDETAIL_MAX_LENGTH } from '../constants';
import './NewFeedback.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: {
                text: ''
            },
			doctorDepartment: {
                text: ''
            },
            doctorHospital: {
                text: ''
            },
            doctorInfo: {
                text: ''
            },
            comments: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDoctorNameChange = this.handleDoctorNameChange.bind(this);
		this.handleDoctorDepartmentChange = this.handleDoctorDepartmentChange.bind(this);
		this.handleDoctorHospitalChange = this.handleDoctorHospitalChange.bind(this);
		this.handleDoctorInfoChange = this.handleDoctorInfoChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const feedbackData = {
            doctorName: this.state.doctorName.text,
            doctorHospital: this.state.doctorHospital.text,
            doctorDepartment: this.state.doctorDepartment.text,
            doctorInfo: this.state.doctorInfo.text,
            comments: this.state.comments
        };

        createFeedback(feedbackData)
        .then(response => {
            console.log(response);
			this.props.history.push("/feedbacks/"+response);
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

    validateDoctorDetail = (doctorDetailText) => {
        if(doctorDetailText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'This block can not be empty'
            }
        } else if (doctorDetailText.length > FEEDBACK_DOCTORDETAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${FEEDBACK_DOCTORDETAIL_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDoctorNameChange(event) {
        const value = event.target.value;
        this.setState({
            doctorName: {
                text: value,
                ...this.validateDoctorDetail(value)
            }
        });
    }

    handleDoctorDepartmentChange(event) {
        const value = event.target.value;
        this.setState({
            doctorDepartment: {
                text: value,
                ...this.validateDoctorDetail(value)
            }
        });
    }

    handleDoctorHospitalChange(event) {
        const value = event.target.value;
        this.setState({
            doctorHospital: {
                text: value,
                ...this.validateDoctorDetail(value)
            }
        });
    }

    handleDoctorInfoChange(event) {
        const value = event.target.value;
        this.setState({
            doctorInfo: {
                text: value,
                ...this.validateDoctorInfo(value)
            }
        });
    }

    validateDoctorInfo = (doctorInfoText) => {
        if(doctorInfoText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'This block can not be empty'
            }
        } else if (doctorInfoText.length > FEEDBACK_DOCTORINFO_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${FEEDBACK_DOCTORINFO_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }


    isFormInvalid() {
        if(this.state.doctorName.validateStatus !== 'success') {
            return true;
        }
		    if(this.state.doctorHospital.validateStatus !== 'success') {
            return true;
        }
        if(this.state.doctorDepartment.validateStatus !== 'success') {
            return true;
        }
        if(this.state.doctorInfo.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div class="container new-poll-container"
              style={{backgroundImage: `url("https://thumbs.dreamstime.com/b/blue-sky-clouds-abstract-art-background-watercolor-digital-artwork-136551201.jpg")`}}>
              <br/>
              <div class="jumbotron">
                <h1 className="page-title">Create Feedback</h1>
              </div>
              <br/>
              <div class="jumbotron">

                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.doctorName.validateStatus}
                            help={this.state.doctorName.errorMsg} className="poll-form-row">
	                        <TextArea
	                            placeholder="Enter doctor name"
	                            style = {{ fontSize: '16px' }}
	                            autosize={{ minRows: 3, maxRows: 6 }}
	                            name = "doctorName"
	                            value = {this.state.doctorName.text}
	                            onChange = {this.handleDoctorNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.doctorHospital.validateStatus}
                            help={this.state.doctorHospital.errorMsg} className="poll-form-row">
	                        <TextArea
	                            placeholder="Enter doctor hospital"
	                            style = {{ fontSize: '16px' }}
	                            autosize={{ minRows: 3, maxRows: 6 }}
	                            name = "doctorHospital"
	                            value = {this.state.doctorHospital.text}
	                            onChange = {this.handleDoctorHospitalChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.doctorDepartment.validateStatus}
                            help={this.state.doctorDepartment.errorMsg} className="poll-form-row">
	                        <TextArea
	                            placeholder="Enter doctor department"
	                            style = {{ fontSize: '16px' }}
	                            autosize={{ minRows: 3, maxRows: 6 }}
	                            name = "doctorDepartment"
	                            value = {this.state.doctorDepartment.text}
	                            onChange = {this.handleDoctorDepartmentChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.doctorInfo.validateStatus}
                            help={this.state.doctorInfo.errorMsg} className="poll-form-row">
	                        <TextArea
	                            placeholder="Enter doctor information"
	                            style = {{ fontSize: '16px' }}
	                            autosize={{ minRows: 3, maxRows: 6 }}
	                            name = "doctorInfo"
	                            value = {this.state.doctorInfo.text}
	                            onChange = {this.handleDoctorInfoChange} />
                        </FormItem>

                        <label class="form-label" for="customFile">Select doctor image</label>
                        <input type="text" class="form-control" placeholder="Enter doctor picture url or upload below"></input>
                        <input type="file" class="form-control-sm" id="customFile" />
                        <br/>
                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Feedback</Button>
                        </FormItem>

                    </Form>

                </div>
              </div>
              <br/>
            </div>
        );
    }
}

export default NewFeedback;
