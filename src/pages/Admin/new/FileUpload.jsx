import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../components/hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOMMODATION_PATH } from "../../../components/constants/api";

const FileUpload = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const http = useAxios();
  //   const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // setSubmitting(true);
    try {
      const formDataToSend = {
        title: data.title,
        description: data.description,
        beds: data.beds,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        persons: data.persons,
        keyless: data.keyless,
        price: data.price,
        categories: data.categories,
      };
      const inputValue = await http({
        url: ACCOMMODATION_PATH,
        method: "POST",
        data: formDataToSend,
      });

      const id = inputValue.data.id;

      const formData = new FormData();

      const images = [];
      images.push(data.media);
      console.log(images);

      let files = data.media;

      for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append("files", files[i]);
      }

      formData.append("ref", "accommodation");
      formData.append("refId", id);
      formData.append("field", "media");
      const res = await http({
        method: "POST",
        url: "upload",
        data: formData,
      });
      console.log("Success", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FileUpload">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="media">
          Upload images. Select more than 1 by holding CTRL
        </label>
        <input multiple name="media" type="file" {...register("media")} />
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
        <label htmlFor="description">Write the description here.</label>
        <textarea
          name="description"
          placeholder="Description"
          {...register("description")}
          type="text"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
