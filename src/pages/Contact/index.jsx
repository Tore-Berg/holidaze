import React from "react";
import { useHistory } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, MESSAGE_PATH } from "../../components/constants/api";
import axios from "axios";

const Contact = () => {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your full name")
      .min(3, "At least 3 characters"),
    email: yup
      .string()
      .required("Please enter your email address.")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email"
      ),
    message: yup
      .string()
      .required("Please let us know what we can do for you.")
      .min(10, "Message must be least 10 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // code goes here, to send data to Strapi/server.
    setSubmitting(true);
    try {
      const response = await axios.post(BASE_URL + MESSAGE_PATH, data);
      console.log(response);
    } catch (error) {
      console.log("error", error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  console.log(errors);

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <span style={{ color: "red" }}>{errors.name.message}</span>
        )}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Your email adress"
        />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}
        <label htmlFor="message">Message</label>
        <textarea
          type="text"
          {...register("message")}
          placeholder="Let us know what's on your mind?"
        />
        {errors.message && (
          <span style={{ color: "red" }}>{errors.message.message}</span>
        )}
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Contact;
