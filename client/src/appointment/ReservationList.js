import React, { Component } from 'react';
import { getUserReservedAppointments} from '../util/APIUtils';
import Appointment from './Appointment';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { APPOINTMENT_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './ReservationList.css';
import {  Calendar, Badge, Divider, Alert } from 'antd';
import moment from 'moment';

class ReservationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false,
            isReserved: false,
			value: moment(),
		    selectedValue: moment(),
		    appointmentToday: [],
		    map:new Map()
        };
        this.loadReservationList = this.loadReservationList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
		this.dateCellRender = this.dateCellRender.bind(this);
	    //this.monthCellRender = this.monthCellRender.bind(this);
	    this.getListData = this.getListData.bind(this);
	    //this.getMonthData = this.getMonthData.bind(this);
    }

	onSelect = value => {
    // const listData = this.getListData(value);

	    this.setState({
	      value,
	      selectedValue: value,

	    });
	  };

  getListData(value) {
	//console.log(value);
    let listData;
    if(this.state.map.has(value.format('YYYY-MM-DD'))) listData = [{type: 'success', content: this.state.map.get(value.format('YYYY-MM-DD')).doctorName},
																   {type: 'success', content: this.state.map.get(value.format('YYYY-MM-DD')).hospital},
													               {type: 'success', content: this.state.map.get(value.format('YYYY-MM-DD')).department},
                                                                   {type: 'success', content: this.state.map.get(value.format('YYYY-MM-DD')).time}];
    return listData || [];
  }

  onPanelChange = value => {
    this.setState({ value });
    console.log(value);
  };

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

  // getMonthData(value) {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  // }
  //
  // monthCellRender(value) {
  //   const num = this.getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // }

    loadReservationList(page = 0, size = APPOINTMENT_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_RESERVED_APPOINTMENTS') {
                promise = getUserReservedAppointments(this.props.username, page, size);
            }
        }
        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
			console.log(response);
            response.content.forEach((reservation) =>{
				  const map = this.state.map;
				  const list = {doctorName: reservation.details.doctorName, time: reservation.details.time_interval, department: reservation.details.department, hospital: reservation.details.hospital}
	              map.set(reservation.details.date, list);
				  this.setState({map: map});
            });
            const reservations = this.state.reservations.slice();

            this.setState({
                reservations:reservations.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,

                isLoading: false
            })
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });

    }

    componentDidMount() {
        this.loadReservationList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                reservations: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadReservationListList();
        }
    }

    handleLoadMore() {
        this.loadReservationList(this.state.page + 1);
    }


    render() {
	    console.log(this.state.map);
        const reservationViews = [];

        this.state.reservations.forEach(reservation => {
			console.log(reservation);
            reservationViews.push(<Appointment
                key={reservation.id}
                appointment={reservation} />)

        });

        return (
            <div className="reservations-container">
				     <div class="container usercalendar-container my-3 border" >
					        <br/>
					        <div class="jumbotron">

					          <div class="row-center" justify="center" style={{marginBottom:"30px"}}>
					            <div class="h3 text-primary">Meeting schedule</div>
					          </div>
					          <div class="form-row">
					            <Alert
					              message={`You selected date: ${this.state.selectedValue && this.state.selectedValue.format('YYYY-MM-DD')}
					                `}
					            />
					            <Calendar dateCellRender={this.dateCellRender}
					              value={this.state.value} onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>

					          </div>
					        </div>
					   </div>
                {reservationViews}
                {
                    !this.state.isLoading && this.state.reservations.length === 0 ? (
                        <div className="no-reservations-found">
                            <span>No Reservations Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-reservations">
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

export default withRouter(ReservationList);
