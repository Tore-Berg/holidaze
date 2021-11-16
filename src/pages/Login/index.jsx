import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../components/constants/api";

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);
  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(BASE_URL + TOKEN_PATH, data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        disabled={submitting}
      >
        <input
          name="identifier"
          placeholder="Username"
          {...register("identifier")}
        />
        <input
          name="password"
          placeholder="Password"
          {...register("password")}
          type="password"
        />
        <button type="submit">{submitting ? "Loggin in..." : "Login"}</button>
      </form>
    </>
  );
}
