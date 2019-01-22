import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import logo from "../images/logo.svg";
import background from "../images/img_header.png";
import { Link } from 'react-router-dom'
import "./styles.css";

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

  render() {
    return (
      <div style={{ 
        backgroundImage: `url(${background})`,
        height: '45vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div style={{ height: '44vh', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <Navbar className="bg-nav" light expand="md">
          <NavbarBrand href="/"><img src={logo} style={{ width: 'auto',height:'3.5rem'}} alt="BUFFET"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              {/* <NavLink href="/components/">Components</NavLink> */}
                    <Link to="/calculator/" className="txt-btn mr-5">CALCULATOR</Link>
              </NavItem>
              <NavItem>
              {/* <NavLink href="/components/">Components</NavLink> */}
                    <Link to="/promotion" className="txt-btn mr-4">PROMOTION</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="d-flex justify-content-center h-40 align-items-center">
            <p className="txt-content f-s-2">{this.props.page}</p>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
