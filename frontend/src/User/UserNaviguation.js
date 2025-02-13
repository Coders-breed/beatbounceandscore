import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchBox from '../components/SearchBox'


// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Action/authAction";
import Logo from "../assets/img/logo.png"

export default function UserNaviguation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-info" expand="lg">
                <Container>
                <NavbarBrand
              
              target="_blank"
              id="navbar-brand"
            >
                <img
          variant="top" 
          src={Logo} alt="okk" style={ {height: " 60px ", width: "60px"}}
        />
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Beat Bounce & Score
            </UncontrolledTooltip>
          
        <NavbarBrand
          onClick={(e) => e.preventDefault()}
        >
          
          <h5>Beat Bounce & Scores</h5>
        </NavbarBrand>
                  <button
                    onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setCollapseOpen(!collapseOpen);
                    }}
                    aria-expanded={collapseOpen}
                    className="navbar-toggler"
                    type="button"
                  >
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                  <Collapse isOpen={collapseOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink  
                           onClick={() => {
                            navigate("/results");
                          }} 
                        >
                          <i
                            aria-hidden={true}
                            class="now-ui-icons design_app mr-1"

                          ></i>
                          <p>Quiz Results</p>

                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                           onClick={() => {
                            navigate("/quiz");
                          }} 
                        >
                          <i aria-hidden={true} className="now-ui-icons ui-1_send"></i>
                          <p>Quiz</p>

                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            navigate("/usercourses");
                          }} 
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons education_paper"
                          ></i>
                          <p>Courses</p>
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-haspopup={true}
                          caret
                          color="default"
                          nav
                        >
                          <i aria-hidden="true" class="now-ui-icons objects_umbrella-13"></i>
                          <p>FinancialAid</p>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem
                            onClick={() => {
                              navigate("/financialaid");

                            }} 
                            
                          >
                              Apply for financial aid
                          </DropdownItem>

                          <DropdownItem
                            onClick={() => {
                              navigate("/resultstatus");
                              window.location.reload()
                            }} 
                          >
                              Result
                          </DropdownItem>

                         
      
                        </DropdownMenu>
              </UncontrolledDropdown>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            navigate("/offers");
                          }} 
                        >
                          <i
                            aria-hidden={true}
                            className="fa fa-suitcase" style={{fontSize:15}}
                          ></i>
                          <p> Jobs</p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            navigate("/profile");
                          }} 
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons users_single-02"
                          ></i>
                          <p>Profile</p>

                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-haspopup={true}
                          caret
                          color="default"
                          nav
                        >
                          <i aria-hidden="true" class="now-ui-icons ui-1_settings-gear-63"></i>
                          <p>Settings</p>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => {
                              dispatch(logout());
                              navigate("/");
                              window.location.reload()
                            }} 
                          >
                            <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                              Logout
                          </DropdownItem>
                    
      
                        </DropdownMenu>
              </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
  )
}
