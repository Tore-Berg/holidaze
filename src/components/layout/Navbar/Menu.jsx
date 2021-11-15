import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 40;
  li {
    padding: 18px 10px;
  }
  a {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    a {
      color: #fff;
    }
  }
`;

const Menu = ({ open }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    setAuth(null);
    history.push("/login");
  };
  return (
    <Ul open={open}>
      <li>
        <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/results" activeStyle={{ fontWeight: "bold" }}>
          Results
        </NavLink>
      </li>
      <li>
        <NavLink to="/enquiry" activeStyle={{ fontWeight: "bold" }}>
          Enquiry
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" activeStyle={{ fontWeight: "bold" }}>
          Contact
        </NavLink>
      </li>
      <li>
        {auth ? (
          <>
            <NavLink to="/admin">Admin</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
    </Ul>
  );
};

export default Menu;
