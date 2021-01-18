import React, { Component } from 'react';
import { Form, Input, Button, Icon, Select, Col, notification ,DatePicker, Space ,TimePicker} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input
const format = 'HH:mm';

class AppointmentSearch extends Component {
    render() {
        const AntWrappedAppointmentSearchForm  = Form.create()(AppointmentSearchForm )
        return (
            <div className="login-container">
                
                <div className="login-content">
                    <AntWrappedAppointmentSearchForm  />
                </div>
            </div>
        );
    }
}

class AppointmentSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            department: {
                value: ''
            },
            date:{
                value:''
            }
        }
        
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
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
		

    handleSubmit(event) {
		console.log(this.state.department.value);
        event.preventDefault();
        const redirectTo = this.state.department.value + "/" +  this.state.date.value
		console.log(redirectTo);
        window.location.href = "/appointments/"+ redirectTo;
        
    }
   

    render() {
		console.log(this.state.department.value);
		console.log(this.state.date.value)
        return (
            <div className="appointment-container">
                <h1 className="page-title">Appointment Search</h1>
                <div className="appointment-content">
                    <Form onSubmit={this.handleSubmit} className="appointment-form">
                        
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
                            //validateStatus={this.state.doctorId.validateStatus}
                            //help={this.state.doctorIderrorMsg}
                            >
         
                           <DatePicker onChange={this.handleDateChange} format={dateFormat} />
						
   
                        </FormItem>
                     
                        
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="Appointment-form-button"
                                >Search</Button>
                            
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions






}

export default AppointmentSearch
