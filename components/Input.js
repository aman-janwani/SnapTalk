import Image from "next/image";
import React, { useState } from "react";
import { db, auth } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";

const Input = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleClickAdd = async () => {
    if (input) {
      await addDoc(collection(db, "posts"), {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        message: input,
        timestamp: Date.now(),
        userImage: auth.currentUser.photoURL,
        image: image,
      }).then(() => {
        setInput("");
        setImage(null);
        console.log("Document successfully written!");
      });
    }
  };

  const handleUploadImage = (e) => {
    console.log(e.target.files[0]);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "vibhzgyx");
    data.append("cloud_name", "dfk5jbk5r");
    fetch("https://api.cloudinary.com/v1_1/dfk5jbk5r/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="self-stretch w-full rounded-[10px] bg-white shrink-0 flex flex-col p-[16px_20px] space-y-3 box-border items-start justify-between">
      <div className="flex flex-row items-center justify-center gap-[10px]">
        <Image
          className="relative rounded-[108px] w-[30px] h-[30px] shrink-0 object-cover"
          alt=""
          width={30}
          height={30}
          src={auth.currentUser.photoURL}
        />
        <div className="relative font-semibold inline-block">
          {auth.currentUser?.displayName}
        </div>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-2 max-h-40 outline-none font-poppins duration-300 text-2xl border-gray-100 focus:border-orange p-3 bg-gray-100 self-stretch relative rounded-[7px] h-[100px] shrink-0"
        placeholder="What’s Happning?"
        required
      />
      <div className="self-stretch flex flex-row items-center justify-between text-2xl">
        <div className="flex items-center justify-start space-x-5">
          <label htmlFor="Image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6  cursor-pointer scale-95 hover:scale-100 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
          <input
            type="file"
            id="Image"
            className="hidden"
            onChange={handleUploadImage}
          />

          <div>
            {image && (
              <Image
                onClick={() => setImage(null)}
                src={image}
                width={50}
                height={40}
                className="rounded-md cursor-pointer"
              />
            )}
          </div>
        </div>

        <div
          onClick={handleClickAdd}
          className="relative text-orange cursor-pointer scale-95 hover:scale-100 duration-300 [text-decoration:underline] capitalize font-medium inline-block"
        >
          post
        </div>
      </div>
    </div>
  );
};

export default Input;
