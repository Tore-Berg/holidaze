import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../../components/hooks/useAxios";
import { useHistory } from "react-router";
import AuthContext from "../../../context/AuthContext";
import { ENQUIRY_PATH } from "../../../components/constants/api";
import { Link } from "react-router-dom";
import DeleteEnquiry from "./DeleteEnquiry";
import dateFormat from "dateformat";

const ReadEnquiries = () => {
  const [loading, setLoading] = useState(null);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const [error, setError] = useState(null);
  const history = useHistory();
  const [data, setData] = useState([]);

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    async function getEnquiries() {
      try {
        const response = await http.get(ENQUIRY_PATH);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log("error", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getEnquiries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div>
      <ul>
        {data.map((enquiry) => {
          return (
            <li key={enquiry.id}>
              <h1>{enquiry.name}</h1>
              <p>{enquiry.enquiry}</p>
              <p>{dateFormat(enquiry.published_at)}</p>
              <DeleteEnquiry id={enquiry.id} />
            </li>
          );
        })}
      </ul>
      <div>
        <Link to={"/admin"}>Back to Admin page</Link>
      </div>
    </div>
  );
};

export default ReadEnquiries;
