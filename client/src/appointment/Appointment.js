import React, { Component } from 'react';
import './Appointment.css';
import { Avatar, notification} from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { castReservation } from '../util/APIUtils';
import { Radio, Button } from 'antd';
import { Redirect } from 'react-router'
const RadioGroup = Radio.Group;

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isReserved:false
        };
        this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
    }


handleReservationSubmit(event) {
    event.preventDefault();
    if(!this.props.isAuthenticated) {
        this.props.history.push("/login");
        notification.info({
            message: 'Reservation',
            description: "Please login to make reservation.",
        });
        return;
    }

    if(!this.props.isAvailable){
        this.props.history.push("/");
        notification.info({
            message: 'Reservation',
            description: "No appointment selected for reservation.",
        });
        return;
    }
    if(this.props.type==='APPOINTMENT_CHECK'){

        notification.info({
            message: 'Reservation',
            description: "Please search for the appointment.",
        });
        return;
    }
    const reservationData = {
        appointment_id: this.props.appointment_id
    };
    console.log(reservationData);
    castReservation(reservationData)
    .catch(error => {
        if(error.status === 401) {
            this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');
        } else {
            notification.error({
                message: 'Reservation',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        }
    });
    window.location.href = "http://localhost:3000"
    //this.props.history.push("/");
    notification.info({
        message: 'Reservation',
        description: "Success! Please check your profile to make a change.",
    });
}

    render() {
        //const appointment = [];


        return (
            <div className="appointments-content">
                <div className="appointments-header">
                    <div className="appointments-doctor-info">
                        <Link className="doctor-link" to={`/users/${this.props.appointment.doctor.name}`}>
                            <Avatar className="appointments-doctor-avatar"
                                style={{ backgroundColor: getAvatarColor(this.props.appointment.doctor.name)}} >
                                {this.props.appointment.doctor.name[0].toUpperCase()}
                            </Avatar>
                            <span className="appointments-doctor">
                                {this.props.appointment.doctor.name}
                            </span>

                        </Link>
                    </div>
                    <div className="appointments-hospital">
                        {this.props.appointment.details.hospital}
                    </div>
                    <div className="appointments-department">
                        {this.props.appointment.details.department}
                    </div>
                    <div className="appointments-date">
                        {this.props.appointment.details.date}
                    </div>
                    <div className="appointments-time">
                        {this.props.appointment.details.time_interval}
                    </div>
                </div>
                <div className="reservation">
					{this.props.appointment.isAvailable ? (
                    <Button
                        className="reservation-radio-group"
                        onClick={this.handleReservationSubmit}
                        >
                        Reserve
                    </Button>):null}
                </div>
            </div>

        );
    }
}





export default Appointment;
