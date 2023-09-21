import React , {useState,useContext} from "react";
import { Navbar, NavbarBrand, NavbarText,NavbarToggler,Collapse,Nav,NavItem,NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import {ContactContext} from "../context/Context"

const Header = () => {


  const context = useContext(ContactContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (

    <Navbar color="info" light expand="md">

      <NavbarBrand  tag={Link} to="/" className="text-white">
               Virugama Contact App
      </NavbarBrand>

      <NavbarText className="text-white">   
        {context.user?.email ? context.user.email : " "}
      </NavbarText>
  
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>

          {context.user ? (
            <NavItem>
              <NavLink tag={Link} onClick={()=>{context.setUser(null)}} to="/" className="text-white">
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink  tag={Link} to="/signup" className="text-white">
                  Signup
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signin" className="text-white">
                  Signin
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
 
  );
};

export default Header;
