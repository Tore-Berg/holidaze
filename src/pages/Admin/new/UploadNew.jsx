import React from "react";
import { useState } from "react";
import { ACCOMMODATION_PATH } from "../../../components/constants/api";
import useAxios from "../../../components/hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Please enter title"),
  description: yup.string().required("Please enter accomodation description"),
});

const UploadNew = () => {
  const http = useAxios();
  const [files, setFiles] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    http
      .post(`upload`, formData)
      .then((response) => {
        console.log(response.data);
        const imageArray = response.data
        for(let i = 0; i < imageArray.length; i++ ) {
          console.log(imageArray[i])
        }
        const imageId = response.data[0].id;
        http
          .post(ACCOMMODATION_PATH, data, { media: imageId })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Enter Title</label>
        <input
          name="title"
          placeholder="Title"
          {...register("title")}
          type="text"
        />
        <label htmlFor="description">Write the description here.</label>
        <textarea
          name="description"
          placeholder="Description"
          {...register("description")}
          type="text"
        />
        <input
          type="file"
          name="media"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          {...register("media")}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default UploadNew;
