import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .form-success {
    color: green;
    text-align: center;
  }
`;
const FormSuccess = ({ message }) => {
  return (
    <StyledMessage>
      <h3 className="form-success">{message}</h3>
    </StyledMessage>
  );
};

FormSuccess.propTypes = {
  message: PropTypes.string,
};

export default FormSuccess;
