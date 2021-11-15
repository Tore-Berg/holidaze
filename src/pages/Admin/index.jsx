import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "./AdminMenu";
import AddNew from "./new/AddNew";

const Admin = ({ children }) => {
  const history = useHistory();
  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/login");
  }
  return (
    <>
      <AdminMenu />
      {children ? children : <p>Select an action</p>}
    </>
  );
};

export default Admin;
