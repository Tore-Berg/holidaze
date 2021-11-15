import React from "react";
import { useHistory } from "react-router";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../components/hooks/useAxios";
import { ACCOMMODATION_PATH, BASE_URL } from "../../../components/constants/api";
import Admin from "..";
import { Link } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Please enter title"),
  description: yup.string().required("Please enter accomodation description"),
});

const AddNew = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const http = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState()
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    setSubmitting(true);

    try {
      const response = await http.post(ACCOMMODATION_PATH, data);
      console.log(response);
    } catch (error) {
      console.log("error", error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
      history.push("/admin");
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="admin-form"
        disabled={submitting}
      >
        <label htmlFor="title">Enter Title</label>
        <input
          name="title"
          placeholder="Title"
          {...register("title")}
          type="text"
        />
        <label htmlFor="beds">Number of Beds</label>
        <input
          name="beds"
          placeholder="Number of Beds"
          {...register("beds")}
          type="number"
        />
        <label htmlFor="rooms">Number of Rooms</label>
        <input
          name="rooms"
          placeholder="Number of Rooms"
          {...register("rooms")}
          type="number"
        />
        <label htmlFor="bathrooms">Number of Bathrooms</label>
        <input
          name="bathrooms"
          placeholder="Number of Bathrooms"
          {...register("bathrooms")}
          type="number"
        />
        <label htmlFor="persons">Number of Persons</label>
        <input
          name="persons"
          placeholder="Number of Persons"
          {...register("persons")}
          type="number"
        />
        <label htmlFor="media">Upload images. Select more than 1 by holding CTRL</label>
        <input
          name="media"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          {...register("media")}
          type="file"
        />
        <label htmlFor="keyless">Keyless YES/NO</label>
        <input name="keyless" {...register("keyless")} type="checkbox" />
        <input name="price" {...register("price")} type="number" />
        <label htmlFor="hotel">Hotel</label>
        <input
          type="radio"
          id="hotel"
          name="categories"
          value="1"
          {...register("categories")}
        />
        <label htmlFor="guesthouses">Guesthouses</label>
        <input
          type="radio"
          id="guesthouses"
          name="categories"
          value="3"
          {...register("categories")}
        />
        <label htmlFor="b-and-b">Bead and Breakfast</label>
        <input
          type="radio"
          id="b-and-b"
          name="categories"
          value="2"
          {...register("categories")}
        />
        {/*''''''''''''''''''''''''''''''''''''Working on an uploader instead of URL. Not so straight forward in Strapi.*************************************/}
        <label htmlFor="image_url">Type in the image URL</label>
        <input name="image_url" {...register("image_url")} type="text" />
        <label htmlFor="description">Write the description here.</label>
        <textarea
          name="description"
          placeholder="Description"
          {...register("description")}
          type="text"
        />
        <button type="submit">{submitting ? "Submitting..." : "Submit"}</button>
      </form>
      <div>
        <Link to={"/admin"}>Back to Admin page</Link>
      </div>
    </div>
  );
};

export default AddNew;
