import Image from "next/image";
import React from "react";
import moment from "moment";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const Post = ({
  id,
  name,
  message,
  image,
  email,
  timestamp,
  currentUser,
  userImage,
}) => {

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id)).then(() => {
      console.log("Document successfully deleted!");
    });
  };

  return (
    <div className="self-stretch rounded-[10px] bg-white h-fit shrink-0 flex flex-col items-center justify-between">
      <div className="self-stretch h-fit shrink-0 flex flex-col p-[15px_20px] box-border items-start justify-start gap-[28px]">
        <div className="w-full flex flex-row items-center justify-between space-x-3">
          <div className="w-full flex flex-row items-center justify-start space-x-3">
            <Image
              className="relative rounded-[108px] w-[30px] h-[30px] shrink-0 object-cover"
              alt=""
              width={30}
              height={30}
              src={userImage}
            />
            <div className="relative font-semibold inline-block">{name}</div>
            <div className="relative text-xs font-medium text-gray-300 inline-block">
              {moment(timestamp).fromNow()}
            </div>
          </div>
          <div>
            {email === currentUser.email && (
              <svg
                onClick={() => {
                  if (currentUser.email === email) {
                    deletePost(id);
                  }
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 scale-95 hover:scale-100 duration-300 cursor-pointer text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="self-stretch relative text-lg font-semibold inline-block">
          {message}
        </div>
        {image && (
          <div className="relative w-full h-64 rounded-xl">
            <Image
              className="relative rounded-[10px] shrink-0  duration-300 object-cover hover:scale-105"
              alt=""
              layout="fill"
              src={image}
            />
          </div>
        )}
      </div>
      {/* TODO: For Comments */}
      {/* <div className="self-stretch flex flex-row p-[15px_20px] box-border items-center justify-start gap-[30px] text-sm text-gray-600">
          <Image
            className="relative rounded-[108px] w-[30px] h-[30px] shrink-0 object-cover"
            alt=""
            width={30}
            height={30}
            src={currentUser.photoURL}
          />
          <input
            className="flex-1 relative rounded-[7px] bg-gray-100 h-[30px] px-3 ring-2 ring-gray-100 focus:ring-orange border-none outline-none"
            placeholder=" Add a comment"
          />
          <div className="relative text-lg [text-decoration:underline] font-medium text-orange inline-block">
            Post
          </div>
        </div> */}
    </div>
  );
};

export default Post;
