import React from "react";
import { useHistory } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, ENQUIRY_PATH } from "../../components/constants/api";

const Enquiry = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    enquiry: yup.string().required("Please tell us what we can do for you"),
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    setSubmitting(true);
    try {
      const response = await axios.post(BASE_URL + ENQUIRY_PATH, data);
      console.log(response);
    } catch (error) {
      console.log("error", error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="enquiry-form"
      disabled={submitting}
    >
      <label htmlFor="name">Enter Your Full Name</label>
      <input placeholder="Full Name" {...register("name")} type="text" />
      {errors.name && (
        <span style={{ color: "red" }}>{errors.name.message}</span>
      )}
      <label htmlFor="enquiry">Write your Message here.</label>
      <textarea placeholder="Enquiry" {...register("enquiry")} type="text" />
      {errors.enquiry && (
        <span style={{ color: "red" }}>{errors.enquiry.message}</span>
      )}
      <button type="submit">{submitting ? "Submitting..." : "Submit"}</button>
    </form>
  );
};

export default Enquiry;
