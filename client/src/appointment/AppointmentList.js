import React, { Component } from 'react';
import { getAllAppointments, getUserReservedAppointments, getAppointmentByDateAndDepartment } from '../util/APIUtils';
import Appointment from './Appointment';
import { castReservation } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { APPOINTMENT_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './AppointmentList.css';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            //currentAppointments: [],
            isLoading: false
        };
        this.loadAppointmentList = this.loadAppointmentList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }



    loadAppointmentList(page = 0, size = APPOINTMENT_LIST_SIZE) {
        let promise;
        if(this.props.isAuthenticated) {
            if (this.props.type === 'APPOINTMENT_SEARCH') {
				console.log(this.props.match.params.department);
				console.log(this.props.match.params.date);
                promise = getAppointmentByDateAndDepartment(this.props.match.params.date,this.props.match.params.department, page, size);
        } else if(this.props.type === 'APPOINTMENT_CHECK'){
          console.log("in2");
            promise = getAllAppointments(page, size);

        }

        } else {
            console.log("in1");
            promise = getAllAppointments(page, size);
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
            const appointments = this.state.appointments.slice();
            //const currentAppointments = this.state.currentVotes.slice();
            console.log(response.content);
            this.setState({
                appointments: appointments.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                //currentAppointments: currentappointments.concat(Array(response.content.length).fill(null)),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadAppointmentList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.date !== nextProps.date) {
            // Reset State
            this.setState({
                appointments: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                //currentReservations: [],
                isLoading: false
            });
            this.loadAppointmentList();
        }
    }

    handleLoadMore() {
        this.loadAppointmentList(this.state.page + 1);
    }



    render() {
        const appointmentViews = [];
        this.state.appointments.forEach((appointment) => {
            appointmentViews.push(<Appointment
                key={appointment.id}
                appointment={appointment}
                appointment_id = {appointment.id}
                isAuthenticated = {this.props.isAuthenticated}
                isAvailable = {appointment.isAvailable}
                type = {this.props.type}
                 />)
        });

        return (
            <div className="appointments-container">
		                {appointmentViews}
		                {
		                    !this.state.isLoading && this.state.appointments.length === 0 ? (
		                        <div className="no-appointments-found">
		                            <span>No Appointments Found.</span>
		                        </div>
		                    ): null
		                }
		                {
		                    !this.state.isLoading && !this.state.last ? (
		                        <div className="load-more-appointments">
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


export default withRouter(AppointmentList);
