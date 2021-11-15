import React, { useState } from "react";
import { useHistory } from "react-router";
import useAxios from "../../../components/hooks/useAxios";

const DeleteEnquiry = ({ id }) => {
  const [error, setError] = useState(null);
  const http = useAxios();
  const history = useHistory();
  const url = `enquiries/${id}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this enquiry?");
    if (confirmDelete) {
      try {
        await http.delete(url);
        history.push("/admin");
      } catch (error) {
        setError(error);
      }
    }
  };
  return (
    <button type="button" className="btn-danger" onClick={handleDelete}>
      {error ? "Error" : "Delete Enquiry"}
    </button>
  );
};

export default DeleteEnquiry;
