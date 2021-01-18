import { getAllFeedback } from '../util/APIUtils';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {  Calendar, Badge, Button, Divider, Alert, notification } from 'antd';
import moment from 'moment';

class UserCalendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
      appointmentToday: [],
      feedbacks: []
    }
    // this.handleLogout = this.handleLogout.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.monthCellRender = this.monthCellRender.bind(this);
    this.getListData = this.getListData.bind(this);
    this.getMonthData = this.getMonthData.bind(this);
    // this.getappointmentToday = this.getappointmentToday.bind(this);
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

  onSelect = value => {
    // const listData = this.getListData(value);

    this.setState({
      value,
      selectedValue: value,

    });
  };

  onPanelChange = value => {
    this.setState({ value });
    console.log(value);
  };

  getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <div class="container appointment-container">
        {listData.map(item => (
          <div key={item.content}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
      </div>
    );
  }

  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  // getappointmentToday(){
  //   let message = '';
  //   console.log(this.state.appointmentToday)
  //   for(let i = 0; i < this.state.appointmentToday.length; i++){
  //     message = message.concat(this.state.appointmentToday[i]) ;
  //   }
  //   return message;
  // }

  render(){

    return(
      <div class="container usercalendar-container my-3 border" >

        <br/>
        <div class="jumbotron">

          <div class="row-center" justify="center">
            <div class="h1 text-primary">Meeting schedule</div>
          </div>

        </div>
        <Divider>Below is your arrangement</Divider>
        <div class="jumbotron">
          <div class="form-row">
            <Alert
              message={`You selected date: ${this.state.selectedValue && this.state.selectedValue.format('YYYY-MM-DD')}
                `}
            />
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}
              value={this.state.value} onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>

          </div>
        </div>
      </div>
    )
  }
}
// <div class="form-row">
//   {this.getappointmentToday}
// </div>
export default withRouter(UserCalendar);
