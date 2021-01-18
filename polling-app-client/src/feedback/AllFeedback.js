import React, { Component } from 'react';
import { getFeedbackByInfo, getAllFeedback } from '../util/APIUtils';
import SingleComment from '../comment/SingleComment';
import SingleFeedbackCard from '../feedback/SingleFeedbackCard';
import { withRouter, Link } from 'react-router-dom';
import { COMMENT_TEXT_MAX_LENGTH } from '../constants';
import pollIcon from '../poll.svg';
import { Radio, Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input
const RadioGroup = Radio.Group;

class AllFeedback extends Component {
   constructor(props) {
        super(props);
        this.state = {
            feedbacks:[],
			name: {
                text: ''
            },
			hospital: {
                text: ''
            },
			department: {
                text: ''
            }
        };
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
		this.handleHospitalChange = this.handleHospitalChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
		getAllFeedback().then(response => {
			console.log(response.content);
			this.setState({
				feedbacks: response.content
			})
		}).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login first.');
            } else {
                notification.error({
                    message: 'Reservation App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
	}

	 handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateText(value)
            }
        });
    }

	 handleDepartmentChange(event) {
        const value = event.target.value;
        this.setState({
            department: {
                text: value,
                ...this.validateText(value)
            }
        });
    }

	handleHospitalChange(event) {
        const value = event.target.value;
        this.setState({
            hospital: {
                text: value,
                ...this.validateText(value)
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

	handleSubmit(event){
		event.preventDefault();
		console.log("hi");
    let hsp = this.state.hospital.text === ''? 'null' :this.state.hospital.text;
    let dep = this.state.department.text === ''? 'null' : this.state.department.text;
    let n = this.state.name.text === ''? 'null' : this.state.name.text;
    console.log([hsp, dep, n]);
		getFeedbackByInfo(hsp, dep, n).then((response) =>{
			console.log("hi", response);
			this.setState({feedbacks: response.content});
		}).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
	}

	isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
		if(this.state.hospital.validateStatus !== 'success') {
            return true;
        }
		if(this.state.department.validateStatus !== 'success') {
            return true;
        }
    }

    render() {
        return (
	        <div class="container all-feedbacks-container" style={{backgroundImage: `url("https://thumbs.dreamstime.com/b/religion-concept-heavenly-background-divine-shining-heaven-dramatic-clouds-light-sky-beautiful-cloud-sunshine-sunny-142376437.jpg")`}}>
            <div class="jumbotron">
              <div class="h2 text-primary">Search for a doctor</div>


                <div class="form-row">
  								<div class="col-3">
  									<input type='text' placeholder="Enter hospital" value={this.state.hospital.text} onChange={this.handleHospitalChange} class="form-control mt-2 mr-sm-2"/>
  								</div>
  								<div class="col-3">
  									<input type='text' placeholder="Enter department" value={this.state.department.text} onChange={this.handleDepartmentChange} class="form-control mt-2 mr-sm-2"/>
  								</div>
                  <div class="col-3">
  									<input type='text' placeholder="Enter doctor name" value={this.state.name.text} onChange={this.handleNameChange} class="form-control mt-2 mr-sm-2"/>
  								</div>
  								<div class="col-3">
  									<button type="button" class=" btn btn-block btn-primary mt-2 mx-auto" onClick={this.handleSubmit}>
  										Search
  									</button>
  								</div>
  							</div>



            </div>

    				<div class="container all-feedback-container">
              <div class="jumbotron">
    		            {this.state.feedbacks.map((feedback, i) => {
    					    console.log(feedback);
    						return (<SingleFeedbackCard key={feedback} feedback={feedback} />)
    					})}
              </div>
    	      </div>
    			</div>
        );
    }
}
// <Form onSubmit={this.handleSubmit} className="create-poll-form" layout="inline" style={{marginTop:"60px", marginBottom:"50px"}}>
//   <FormItem className="poll-form-row" validateStatus={this.state.hospital.validateStatus}
//                     help={this.state.hospital.errorMsg} className="poll-form-row">
//     <TextArea
//                   placeholder="Enter Hospital"
//                   style = {{ fontSize: '16px', width: "100%", marginLeft:"10px", marginRight:"20px", display: "inline" }}
//                   autosize={{ minRows: 2, maxRows: 3 }}
//                   name = "hospital"
//                   value = {this.state.hospital.text}
//                   onChange = {this.handleHospitalChange} />
//   </FormItem>
//   <FormItem validateStatus={this.state.department.validateStatus}
//                     help={this.state.department.errorMsg} className="poll-form-row">
//     <TextArea
//                   placeholder="Enter Department"
//                   style = {{ fontSize: '16px', width: "100%", marginLeft:"10px", marginRight:"20px", display: "inline"}}
//                   autosize={{ minRows: 2, maxRows: 3 }}
//                   name = "hospital"
//                   value = {this.state.department.text}
//                   onChange = {this.handleDepartmentChange} />
//   </FormItem>
//   <FormItem validateStatus={this.state.name.validateStatus}
//                     help={this.state.name.errorMsg} className="poll-form-row">
//     <TextArea
//                   placeholder="Enter Name"
//                   style = {{ fontSize: '16px', width: "100%", marginLeft:"10px", marginRight:"20px", display: "inline"}}
//                   autosize={{ minRows: 2, maxRows: 3 }}
//                   name = "name"
//                   value = {this.state.name.text}
//                   onChange = {this.handleNameChange} />
//
//   </FormItem>
//   <FormItem className="poll-form-row" >
//     <Button type="primary"
//        htmlType="submit"
//        size="large"
//        style={{marginBottom:"5px", marginTop:"5px", width:"100%"}}
//       disabled={this.isFormInvalid()}
//       className="create-poll-form-button">Search Result</Button>
//   </FormItem>
// </Form>
export default AllFeedback;
