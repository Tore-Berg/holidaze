import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../../components/hooks/useAxios";
import { useHistory } from "react-router";
import AuthContext from "../../../context/AuthContext";
import { MESSAGE_PATH } from "../../../components/constants/api";
import { Link } from "react-router-dom";
import DeleteMessage from "./DeleteMessage";
import dateFormat from "dateformat";

const ReadMail = () => {
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
    async function getMessages() {
      try {
        const response = await http.get(MESSAGE_PATH);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log("error", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, []);

  return (
    <div>
      <ul>
        {data.map((message) => {
          return (
            <li key={message.id}>
              <h3>
                <strong>Message recieved from</strong> {message.name}
              </h3>
              <p>
                <strong>Message recieved:</strong> {dateFormat(message.published_at)}
              </p>
              <p>
                <strong>Email Address:</strong> {message.email}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
              <DeleteMessage id={message.id} />
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

export default ReadMail;
