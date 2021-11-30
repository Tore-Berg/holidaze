import React from "react";
import styled from "styled-components";

const StyledHeading = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin-top: 100px auto;
`;

const Heading = ({ title }) => {
  return (
    <StyledHeading>
      <h1>{title}</h1>
    </StyledHeading>
  );
};

export default Heading;
