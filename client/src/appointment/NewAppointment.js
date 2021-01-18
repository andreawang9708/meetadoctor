import React, { Component } from 'react';
import { createAppointment } from '../util/APIUtils';
import {HOSPITALNAME_MAX_LENGTH, HOSPITALNAME_MIN_LENGTH,DOCTORNAME_MIN_LENGTH,DOCTORNAME_MAX_LENGTH } from '../constants';
import './NewAppointment.css';
import { Form, Input, Button, Icon, Select, Col, notification ,DatePicker,TimePicker} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input


const format = 'HH:mm';


class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospital: {
                value: ''
            },
            department: {
                value: ''
            },
            date:{
                value:''
            },
            time_interval: {
                value: ''
            },
            doctorName: {
                value: ''
            }
        }
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }



    handleDepartmentChange(value) {
		console.log(value);
        this.setState({
            department: {
				value: value
			}
         });
    }


	handleDateChange(value, dateString) {
		console.log(this.state.department.value);
		  console.log('Selected Time: ', value);
		  console.log('Formatted Selected Time: ', dateString);
		this.setState({
            date: {
				value: dateString
			}
         });
    }

    handleTimeChange(value, timeString) {
		console.log(this.state.time_interval.value);
		  console.log('Selected Time: ', value);
		  console.log('Formatted Selected Time: ', timeString);
		this.setState({
            time_interval: {
				value: timeString
			}
         });
	}

    handleSelectionChange(event) {
        console.log(event);
    }
    handleSubmit(event) {
        event.preventDefault();

        const appointmentData = {
            hospital: this.state.hospital.value,
            department: this.state.department.value,
            date: this.state.date.value,
            time_interval: this.state.time_interval.value,
            doctorName: this.state.doctorName.value
        };
        createAppointment(appointmentData)
        .then(response => {
			console.log(response);
            notification.success({
                message: 'New Appointment',
                description: "Thank you! You successfully created a new appointment!",
            });
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create appointment.');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    isFormInvalid() {
        return !(this.state.hospital.validateStatus === 'success' &&
            this.state.doctorName.validateStatus === 'success'
        );
    }

    render() {
		console.log(this.state);
        return (
            <div className="appointment-container">
                <h1 className="page-title">New Appointment</h1>
                <div className="appointment-content">
                    <Form onSubmit={this.handleSubmit} className="appointment-form">
                        <FormItem
                            label="Hospital Name"
                            validateStatus={this.state.hospital.validateStatus}
                            >
                            <Input
                                size="large"
                                name="hospital"
                                autoComplete="off"
                                placeholder="Hospital Name"
                                value={this.state.hospital.value}
                                onChange={(event) => this.handleInputChange(event,this.validateHospitalName)} />
                        </FormItem>
                        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                            <Select
          placeholder="Select a option and change input text above"
          onChange={this.handleDepartmentChange}
          allowClear
        >
          <Option value="Gastroenterology">Gastroenterology</Option>
          <Option value="Cardiology">Cardiology</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
                        <FormItem label="Date"
                            hasFeedback
                            >

                         <DatePicker onChange={this.handleDateChange}  />

                        </FormItem>
                        <FormItem
                            label="Time_interval"
                            hasFeedback
                            >
                            <TimePicker onChange={this.handleTimeChange}  format={format} minuteStep={60} secondStep={60} />   
                        </FormItem>
                        <FormItem
                            label="DoctorName"
                            validateStatus={this.state.doctorName.validateStatus}
                            help={this.state.doctorName.errorMsg}>
                            <Input
                                size="large"
                                name="doctorName"
                                type="doctorName"
                                autoComplete="off"
                                placeholder="A doctor's name"
                                value={this.state.doctorName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateDoctorName)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="Appointment-form-button"
                                disabled={this.isFormInvalid()}>Create</Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateHospitalName = (hospital) => {
        if(hospital.length > HOSPITALNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Hospital name is too long (Maximum ${HOSPITALNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };
        }
    }

    validateDoctorName = (doctorName) => {
        if(doctorName.length < DOCTORNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Doctorname is too short (Minimum ${DOCTORNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (doctorName.length > DOCTORNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Doctorname is too long (Maximum ${DOCTORNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }



}

export default NewAppointment;
