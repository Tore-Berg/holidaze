import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useState } from "react";
import useAxios from "../../../components/hooks/useAxios";
import { Button } from "../../../components/styles/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOMMODATION_PATH } from "../../../components/constants/api";
import FormSuccess from "../../../components/common/FormSuccess";
import {
  StyledForm,
  StyledFormWrapper,
  RadioButtons,
} from "../../../components/styles/FormStyle";

const schema = yup.object().shape({
  title: yup.string().required("Please enter the title"),
  description: yup.string().required("Please enter description"),
  beds: yup.number().required("Please enter the amount of beds"),
  rooms: yup.number().required("Please enter the amount of rooms"),
  bathrooms: yup.number().required("Please enter the amount of bathrooms"),
  persons: yup.number().required("Please enter the amount of persons"),
  price: yup.number().required("Please enter the price per night"),
  keyless: yup
    .boolean()
    .required("Please check box if keyless entry available"),
  featured: yup.boolean().required("Please check box if you place is featured"),
  categories: yup.string().required("Please select category"),
  featured_media: yup.mixed().required("Please upload a featured image"),
  media: yup.mixed().required("Please upload images"),
});

const FileUpload = () => {
  const http = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setSubmitting(true);
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
        featured: data.featured,
      };

      const inputValue = await http({
        url: ACCOMMODATION_PATH,
        method: "POST",
        data: formDataToSend,
      });

      const id = inputValue.data.id;

      const formData = new FormData();
      let featuredImage = data.featured_media;

      formData.append("files", featuredImage[0]);
      formData.append("ref", "accommodation");
      formData.append("refId", id);
      formData.append("field", "featured_media");
      const res = await http({
        method: "POST",
        url: "upload",
        data: formData,
      });

      const addPhotos = async () => {
        try {
          const photoData = new FormData();
          let images = data.media;
          let id = inputValue.data.id;
          for (let i = 0; i < images.length; i++) {
            photoData.append("files", images[i]);
          }

          photoData.append("ref", "accommodation");
          photoData.append("refId", id);
          photoData.append("field", "media");

          const response = await http({
            method: "POST",
            url: "upload",
            data: photoData,
          });
        } catch (error) {
          console.log(error);
        }
      };
      addPhotos();
      console.log("Success", res);
      setSubmitting(false);
      setSuccess("Successfully created a new accommodation");
    } catch (error) {
      setError(error.toString("There was an error. Please try again later."));
    }
  };

  if (submitting) {
    return <div>Submitting...</div>;
  }
  if (error) {
    return <div>There was an error</div>;
  }
  if (success) {
    setTimeout(() => {
      history.push("/admin");
    }, 5000);
    return <FormSuccess message={success} />;
  }
  return (
    <>
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
            {...register("rooms", { required: false })}
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
          <RadioButtons>
            <label htmlFor="keyless">Keyless</label>
            <input name="keyless" {...register("keyless")} type="checkbox" />
          </RadioButtons>
          <RadioButtons>
            <label htmlFor="featured">Featured?</label>
            <input name="featured" {...register("featured")} type="checkbox" />
          </RadioButtons>
          <label htmlFor="price">Price</label>
          <input name="price" {...register("price")} type="number" />
          <RadioButtons>
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
            <label htmlFor="bnb">BnB</label>
            <input
              type="radio"
              id="bnb"
              name="categories"
              value="2"
              {...register("categories")}
            />
          </RadioButtons>
          <label htmlFor="media">Add a Featured Image</label>
          <input
            name="featured_media"
            type="file"
            {...register("featured_media")}
          />
          <label htmlFor="media">Add images</label>
          <input multiple name="media" type="file" {...register("media")} />
          <label htmlFor="description">Write the description here.</label>
          <textarea
            name="description"
            placeholder="Description"
            {...register("description")}
            type="text"
          />
          <Button>Submit</Button>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default FileUpload;
