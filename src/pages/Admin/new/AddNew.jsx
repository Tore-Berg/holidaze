import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import Heading from "../../../components/layout/headings/Heading";
import { Helmet } from "react-helmet";

const AddNewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const AddNew = () => {
  return (
    <>
      <Helmet>
        <title>Holidaze | Add New</title>
      </Helmet>
      <AddNewWrapper>
        <Heading title={"Add New place"} />
        <FileUpload />
        <div>
          <Link to={"/admin"}>Back to Admin page</Link>
        </div>
      </AddNewWrapper>
    </>
  );
};

export default AddNew;
