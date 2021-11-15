import React, { useState } from "react";
import { useHistory } from "react-router";
import useAxios from "../../../components/hooks/useAxios";

const DeleteMessage = ({ id }) => {
  const [error, setError] = useState(null);
  const http = useAxios();
  const history = useHistory();
  const url = `messages/${id}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this message?");
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
      {error ? "Error" : "Delete Message"}
    </button>
  );
};

export default DeleteMessage;
