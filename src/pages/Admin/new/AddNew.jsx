import React from "react";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";

// const schema = yup.object().shape({
//   title: yup.string().required("Please enter title"),
//   description: yup.string().required("Please enter accomodation description"),
// });

const AddNew = () => {
  return (
    <div>
      <FileUpload />
      <div>
        <Link to={"/admin"}>Back to Admin page</Link>
      </div>
    </div>
  );
};

export default AddNew;
