import React from "react";
import ReactDOM from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, ENQUIRY_PATH } from "../../components/constants/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styles/FormStyle";
import styled from "styled-components";
import FormSuccess from "../../components/common/FormSuccess";
import { Button } from "../../components/styles/Button";
import LoaderIndicator from "../../components/common/LoaderIndicator";

const Modal = styled.div`
  z-index: 1000;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
`;
const ModalBg = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 10px auto;
  border-radius: 10px;
`;
const CloseIcon = styled(FaWindowClose)`
  position: absolute;
  color: #fff;
  top: 20px;
  right: 20px;
  cursor: pointer;
  &:hover {
    color: 0.3;
  }
`;
const Overlay = styled.div`
  background: #000;
  opacity: 0.95;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;
const Enquiry = ({ open, onClose, title, image }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    enquiry: yup.string().required("Please tell us what we can do for you"),
    email: yup
      .string()
      .required("Please enter your email address.")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email"
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    setSubmitting(true);
    try {
      const response = await axios.post(`${BASE_URL}/${ENQUIRY_PATH}`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
      setSuccess("Thanks for your enquiry");
    }
  }
  if (submitting) {
    return <LoaderIndicator />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (success) {
    return <FormSuccess message={success} />;
  }
  return ReactDOM.createPortal(
    <>
      {open && (
        <>
          <Overlay />
          <Modal>
            <StyledFormWrapper>
              <StyledForm
                onSubmit={handleSubmit(onSubmit)}
                className="enquiry-form"
                disabled={submitting}
              >
                <CloseIcon onClick={onClose} size={40} />
                <h1>{title}</h1>
                <ModalBg style={{ backgroundImage: `url(${image})` }}></ModalBg>
                <input
                  type="text"
                  name="title"
                  value={title}
                  readOnly
                  {...register("title")}
                />
                <label htmlFor="name">Enter Your Full Name</label>
                <input
                  placeholder="Full Name"
                  {...register("name")}
                  type="text"
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
                <label htmlFor="arrival_date">Arrival date</label>
                <Controller
                  control={control}
                  name="arrival_date"
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select arrival date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      minDate={new Date()}
                    />
                  )}
                />
                <label htmlFor="arrival_date">Departure date</label>
                <Controller
                  control={control}
                  name="departure_date"
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select departure date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      minDate={new Date()}
                    />
                  )}
                />
                <label htmlFor="persons">Number of persons</label>
                <input name="persons" type="number" {...register("persons")} />
                <label htmlFor="enquiry">Comments?</label>
                <textarea
                  placeholder="Comments to your enquiry"
                  {...register("enquiry")}
                  type="text"
                />
                {errors.enquiry && (
                  <span style={{ color: "red" }}>{errors.enquiry.message}</span>
                )}
                <Button type="submit">
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </StyledForm>
            </StyledFormWrapper>
          </Modal>
        </>
      )}
    </>,
    document.getElementById("portal")
  );
};

export default Enquiry;
