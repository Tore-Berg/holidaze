import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";
import { Button, DangerButton } from "../../styles/Button";
import { useState } from "react";

const StyledLink = styled(NavLink)`
  padding: 0px 10px;
`;
const Ul = styled.ul`
  list-style: none;
  display: flex;
  /* flex-flow: row nowrap; */
  align-items: center;
  padding: 0;
  z-index: 1000;
  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column;
    justify-content: center;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    margin-top: 0;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const Menu = ({ open }) => {
  const [scrolledlink, setScrolledLink] = useState(false);
  const handleChange = () => {
    if (window.scrollY >= 20) {
      setScrolledLink(true);
    } else {
      setScrolledLink(false);
    }
  };
  window.addEventListener("scroll", handleChange);
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setAuth(null);
      history.push("/login");
    }
  };

  return (
    <Ul open={open}>
      <li>
        <StyledLink
          className={scrolledlink ? "scrolledlink" : "navlink"}
          exact
          to="/"
          activeStyle={{ borderBottom: "2px solid gold" }}
        >
          Home
        </StyledLink>
      </li>
      <li>
        <StyledLink
          className={scrolledlink ? "scrolledlink" : "navlink"}
          exact
          to="/results"
          activeStyle={{ borderBottom: "2px solid gold" }}
        >
          View all
        </StyledLink>
      </li>
      <li>
        <StyledLink
          className={scrolledlink ? "scrolledlink" : "navlink"}
          exact
          to="/contact"
          activeStyle={{ borderBottom: "2px solid gold" }}
        >
          Contact
        </StyledLink>
      </li>
      <li>
        {auth ? (
          <>
            <StyledLink
              className={scrolledlink ? "scrolledlink" : "navlink"}
              exact
              to="/admin"
              activeStyle={{ borderBottom: "2px solid gold" }}
            >
              Admin
            </StyledLink>
            <DangerButton onClick={logout}>Logout</DangerButton>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </li>
    </Ul>
  );
};

export default Menu;
