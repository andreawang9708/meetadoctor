import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {  Calendar, Badge, Button, Divider } from 'antd';
// import {getAppointmentFunction, getAllExsistingDepartmentFunction} from APIUtils;


export default class SearchAppointment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			startTime: "",
      endTime: "",
			date: "",
      result: []
		};

		this.submitResult = this.submitResult.bind(this);

		this.handleChange_startTime = this.handleChange_startTime.bind(this);
    this.handleChange_endTime = this.handleChange_endTime.bind(this);
		this.handleChange_date = this.handleChange_date.bind(this);

	}

	handleChange_startTime(e) {
		this.setState({
			startTime: e.target.value
		});

	}
  handleChange_endTime(e) {
		this.setState({
			endTime: e.target.value
		});

	}
	handleChange_date(e) {
		this.setState({
			date: e.target.value
		});
	}


	componentDidMount() {
		// fetch accomodates

	//   fetch("http://localhost:8081/airbnb/accommodates", {
	//   method: 'GET' // The type of HTTP request.
	// })
	//   .then(res => res.json()) // Convert the response data to a JSON.



  // Here comes your function defined in backend, but the below line of code can be removed if the method is not in APIUtils
    // getAllExsistingDepartmentFunction().
	  // .then(departmentList => {
    //
  	// 	let departmentDivs = departmentList.map((department, i) =>
  	// 	  <option value={department.department}>{department.department}</option>
  	// 	);
  	// 			// console.log(accomodatesDivs);
  	// 	this.setState({
  	// 	  accomodates_list: departmentDivs,
  	// 	});
    // })
	  // .catch(err => console.log(err))

	}


	submitResult() {
    // used for debugging
		console.log("selected department is: " + this.state.neighborhood)
		console.log("selected date is: " + this.state.priceLow)



    // this link has to be changed manually
    fetch("http://localhost:8081/airbnb/accommodates", {
  	  method: 'GET' // The type of HTTP request.
  	})
	  .then(res => res.json()) // Convert the response data to a JSON.



    // the below line of code can be removed if the method is not in APIUtils
		//getAppointmentFunction(this.state.department, this.state.date)
	  .then(resultList => {
			console.log(resultList);

			let genrerateDivs = resultList.map((airbnbResults, i) =>
			  <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-6">
              <div class="h3 text-primary">{airbnbResults.department}</div>
              <div class="h3 text-primary">{airbnbResults.date}</div>
            </div>
          </div>
        </div>
		);

			this.setState({
			  result: genrerateDivs
			})
	  })
	  .catch(err => console.log(err))
	}


	render() {
		return (
			<div className="appointmentTime">

				<div class="container appointmentTime-container">

					<br/>
					<div class="jumbotron">
						<div class="h1 text-primary">
							Appointment Searching
						</div>

						<br/>
						<div class="dropdown-container">
							<div class="row">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" >
											Enter date and time
										</span>
									</div>
									<input type="text" class="form-control" placeholder="Enter date (format: yyyy-mm-dd)" value={this.state.date} onChange={this.handleChange_date} />
								</div>
							</div>

							<br/>
							<div class="form-row">
								<div class="col-4">
									<input type="text" class="form-control" placeholder="Enter start time (format: 00:00)" value={this.state.startTime} onChange={this.handleChange_startTime} />
								</div>
								<div class="col-4">
									<input type="text" class="form-control" placeholder="Enter end time (format: 00:00)" value={this.state.endTime} onChange={this.handleChange_endTime} />
								</div>
                <div class="col-4">
									<button type="button" class=" btn btn-block btn-danger mt-2 mx-auto" onClick={this.submitResult}>
										Search
									</button>
								</div>
							</div>

							<br/>

						</div>
					</div>
          <div class="jumbotron">
            {this.state.result}
          </div>
				</div>
			</div>
		);
	}
}
