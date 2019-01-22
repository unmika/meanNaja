import React, { Component } from "react";
import background from "../images/bg.jpg";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import "./styles.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)"
          }}
        >
          <div className="row justify-content-between">
                <Link className="ml-4 mt-1" to="/"><img src={logo} style={{ width: 'auto',height:'3.5rem'}} alt="BUFFET" /></Link>
                <div className="d-flex align-items-center mr-5">
                    <Link to="/calculator/" className="txt-btn mr-5">CALCULATOR</Link>
                    <Link to="/promotion" className="txt-btn">PROMOTION</Link>
                </div>
          </div>
          <div className="">
            <div className="col-12 flote-left">
              <div className="d-flex justify-content-center align-items-center m-t-10">
                <div className="text-center">
                  <h5 className="txt-content">RESTAURANT BUFFET & DRINKS</h5>
                  <p className="txt-content f-s-4">
                    Welcome to Restaurant Backend
                  </p>
                  <p className="txt-btn f-s-1">Let's start configuration</p>
                </div>
              </div>
              <div className="col-12 flote-left">
                <div className="d-flex justify-content-center align-items-center m-t-5">
                  <div className="d-flex justify-content-between width-30">
                    <Link to="/calculator" className="btn btn-outline-light width-20">
                      BILL CALCULATOR
                    </Link>
                    <Link to="/promotion" className="btn btn-outline-light width-20">
                      PROMOTION
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
