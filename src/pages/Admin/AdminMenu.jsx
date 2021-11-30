import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopHouse, FaMailBulk, FaCommentDots } from "react-icons/fa";
import styled from "styled-components";
import Heading from '../../components/layout/headings/Heading';

const AdminNavigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  height: 100%;
  margin: 100px auto;
`;

const StyledLink = styled(Link)`
  margin: auto;
  transition: all ease-in-out .5s;
  &:hover {
    transform: scale(1.5);
    color: red;
  }
`;

const AdminMenu = () => {
  return (
    <>
    <Heading title="Admin Menu" />
      <AdminNavigation>
        <StyledLink to="/admin/new">
          <FaLaptopHouse size={120} />
        </StyledLink>
        <StyledLink to="/admin/read-mail">
          <FaMailBulk size={120} />
        </StyledLink>
        <StyledLink to="/admin/read-enquiries">
          <FaCommentDots size={120} />
        </StyledLink>
      </AdminNavigation>
    </>
  );
};

export default AdminMenu;
