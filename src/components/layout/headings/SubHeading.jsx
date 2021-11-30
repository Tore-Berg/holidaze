import React from "react";
import styled from "styled-components";

const StyledSubHeading = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin-top: 100px;
`;

const SubHeading = ({ title }) => {
  return (
    <StyledSubHeading>
      <h2>{title}</h2>
    </StyledSubHeading>
  );
};

export default SubHeading;
