import React from "react";
import { Wrapper } from "./AddNew.styles";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import Heading from "../../../components/layout/headings/Heading";
import { Helmet } from "react-helmet";

const AddNew = () => {
  return (
    <>
      <Helmet>
        <title>Holidaze | Add New</title>
      </Helmet>
      <Wrapper>
        <Heading title={"Add New place"} />
        <FileUpload />
        <div>
          <Link to={"/admin"}>Back to Admin page</Link>
        </div>
      </Wrapper>
    </>
  );
};

export default AddNew;
