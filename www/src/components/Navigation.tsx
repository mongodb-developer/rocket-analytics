import React from "react";
import { Link } from "react-router-dom";
import { Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { useAuth } from "../hooks/useAuth";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";

function Navigation() {
   const [isOpen,setIsOpen] = React.useState(false);
   const { authed, loading } = useAuth();
   const [isModalOpen,setModalOpen] = React.useState(false);

   const { register } = useAuth();
   const [loginEmail, setLoginEmail] = React.useState("demo@demo.com");
   const [loginEmailPwd, setLoginEmailPwd] = React.useState("demo@demo.com");

   return (
      <div className="navbar">
         <div>
            <Navbar
               color="dark"
               dark
               expand="md"
               fixed="top"
               full={true}
            >
               <NavbarBrand href="/">
               React &#10084; Mongo

               </NavbarBrand>
               
               <NavbarToggler onClick={function noRefCheck(){setIsOpen(!isOpen)}} />
               <Collapse navbar isOpen={isOpen}>
                  <Nav
                  className="me-auto"
                  navbar
                  >
                     <NavItem>
                        <NavLink>
                           <Link style={{textDecoration:"none",color:"white",padding:"1em",letterSpacing:"3px"}} to={"/"}>
                              Home
                           </Link>
                        </NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink>
                           <Link style={{textDecoration:"none",color:"white",padding:"1em",letterSpacing:"3px"}} to={"/dashboard"}>
                              Charts
                           </Link>
                        </NavLink>
                     </NavItem>

                     {!authed &&
                     <NavItem style={{display:"none"}}>
                        <NavLink>
                           <Link onClick={function noRefCheck(){setModalOpen(!isModalOpen)}} style={{textDecoration:"none",color:"white",padding:"1em",letterSpacing:"3px"}} to={"/"}>
                              Login/Register
                           </Link>
                        </NavLink>
                     </NavItem>                     
                     }
                  </Nav>
               </Collapse>
            </Navbar>
            </div>


            <div>
               <Modal
                  isOpen={isModalOpen}
                  toggle={function noRefCheck(){setModalOpen(!isModalOpen)}} 
               >
                  <ModalHeader toggle={function noRefCheck(){setModalOpen(!isModalOpen)}} >
                     Login/Register
                  </ModalHeader>
                  <ModalBody>
                  <div>
                     <Form>
                        <FormGroup row>
                           <Label
                              for="exampleEmail"
                              sm={12}
                           >
                              Email
                           </Label>
                           <Col sm={12}>
                              <Input
                              id="exampleEmail"
                              name="email"
                              placeholder="with a placeholder"
                              type="email"
                              value={loginEmail} onChange={(e)=>{
                                 setLoginEmail(e.target.value);
                              }} 
                              />
                           </Col>
                        </FormGroup>
                        <FormGroup row>
                           <Label
                              for="examplePassword"
                              sm={12}
                           >
                              Password
                           </Label>
                           <Col sm={12}>
                              <Input
                              id="examplePassword"
                              name="password"
                              placeholder="password placeholder"
                              type="password"
                              value={loginEmailPwd} 
                              onChange={(e)=>{
                                 setLoginEmailPwd(e.target.value);
                              }}
                              />
                           </Col>
                        </FormGroup>
                     </Form>
                     </div>
                  </ModalBody>
                  <ModalFooter>
                     <Button
                     color="primary"
                     onClick={async ()=>{
                        await register(loginEmail,loginEmailPwd);
                        setModalOpen(false);
                     }}
                     >
                     Login/Register
                     </Button>
                     {' '}
                     <Button onClick={function noRefCheck(){}}>
                     Cancel
                     </Button>
                  </ModalFooter>
               </Modal>
               </div>
      </div>
   );
}

export default Navigation;
