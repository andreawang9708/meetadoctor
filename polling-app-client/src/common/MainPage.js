import background from "./pexels-karolina-grabowska-4386464.jpg";
import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {  Typography, Divider, Layout, Row, Col, Button } from 'antd';
const {Title, Paragraph} = Typography;


class MainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    // this.handleLogout = this.handleLogout.bind(this);


  }

  render(){
    // let style = { background: '#0092ff', padding: '8px 0' };
    console.log(this.props.currentUser);
    //const link = "/user/" + this.props.currentUser.username;
    return(
      <div class="container main-container" style={{backgroundImage: `url(${background})`}}>

        <br/>
        <div class="jumbotron">
        <Typography>
          <Row justify="center">
            <div class="h1 text-primary">A better way to meet a doctor</div>
          </Row>
          <br/>
          <p>Due to the influence of COVID-19, medical resources are less reachable,
          and people are concerned about how to allocate medical resources fairly and effectively.
           Instead of visiting different hospital websites to find out the earliest possible
           appointments and getting useful information from scarce resources, building
           up a medical platform to unite the hospitals in one region and realize
           resources sharing and arrangement among different hospitals could be a better solution.
          </p>
        </Typography>
        </div>
        <Divider>Explore what we can do</Divider>
        <div class="jumbotron">
          <div class="form-row">
            <div class="col-4" >

              <Link to="/hospital">
                <img src="https://thumbs.dreamstime.com/z/pennsylvania-hospital-franklin-health-philly-68625988.jpg" class="img-fluid rounded border border-primary border-3" alt="Hospital" />
                <div class="p-3 text-primary">
                  Search high ranking hospitals in Philly
                </div>
              </Link>

            </div>
            <div class="col-4" >

              <Link to="/appointments">
                <img src="https://thumbs.dreamstime.com/z/clock-10831850.jpg" class="img-fluid rounded border border-primary border-3" alt="Clock"  />
                <div class="p-3 text-primary">
                  Reserve a meeting with a doctor today
                </div>
              </Link>

            </div>
            <div class="col-4" >

              <Link to="/feedbacks">
                <img src="https://thumbs.dreamstime.com/z/happy-customer-feedback-survey-concept-evaluating-green-marker-check-mark-client-satisfaction-business-service-148171653.jpg" class="img-fluid rounded border border-primary border-3" alt="Department" />
                <div class="p-3 text-primary">
                  Provide feed back to a doctor you met
                </div>
              </Link>

            </div>

          </div>
          <br/>
          <div class="form-row">
            <div class="col-4" >

              <Link to="/">
                <img src="https://thumbs.dreamstime.com/z/page-calendar-129565498.jpg" class="img-fluid rounded border border-primary border-3" alt="Clock" />
                <div class="p-3 text-primary">
                  Looking my schedule
                </div>
              </Link>

            </div>
            <div class="col-4" >

              <Link to="/">
                <img src="https://thumbs.dreamstime.com/z/come-soon-text-black-board-come-soon-goals-text-black-board-beach-194697194.jpg" class="img-fluid rounded border border-primary border-3" alt="Coming soon"  />
                <div class="p-3 text-primary">
                  More powerful functions are coming soon!
                </div>
              </Link>

            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MainPage);
