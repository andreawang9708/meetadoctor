import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {  Calendar, Badge, Button, Divider, Alert } from 'antd';
import MapContainer from '../common/MapContainer';
import moment from 'moment';
import hospitalInPhilly from '../constants/hospitalInPhilly.json';

class UserCalendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      resultList: []
    }
    // this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
  	this.setState({
  		resultList: hospitalInPhilly
    });
  }

  render(){

    return(
      <div class="container usercalendar-container my-3 border" >

        <br/>
        <div class="jumbotron">

          <div class="row-center" justify="center">
            <div class="h1 text-primary">Top hospitals in Philadelphia</div>
          </div>

        </div>
        <br/>


          <div class="row justify-content-md-left" >
            <div class="col-12">
              <MapContainer mapInfo={this.state.resultList}/>
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
