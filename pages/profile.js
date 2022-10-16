import { useCallback } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
  orderBy,
  onSnapshot
} from "firebase/firestore";

import { useEffect, useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [posts, setPosts] = useState([]);

  const read = useCallback(async () => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datalist = querySnapshot.docs.map((doc) => {
        return doc;
      });
      setPosts(datalist);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    read();
  }, [read]);



  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  // send user to login page if not logged in
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  });

  if (!auth.currentUser) {
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex justify-center items-center space-x-1 text-2xl font-poppins text-gray-700">
        <svg
          fill="none"
          className="w-10 h-10 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>;
  } else {
    return (
      <div className="relative max-w-[100rem] mx-auto bg-gray-100 w-full flex flex-row items-start justify-start text-left text-5xl text-gray-400 font-poppins">
        <Sidebar />
        <div className="self-stretch flex flex-col items-center w-8/12 mx-auto relative shrink-0 text-[32px] font-poppins">
          <div className="top-[62px] left-[95px] w-[344px] h-[353px] flex flex-col items-center justify-between">
            <Image
              className="relative rounded-[115px] w-[200px] h-[199.71px] shrink-0 object-cover"
              alt=""
              src={auth.currentUser.photoURL}
              width={200}
              height={200}
            />
            <div className="self-stretch flex flex-col items-center justify-center gap-[17px]">
              <div className="relative w-96 flex items-center justify-center h-[48px]">
                <p className="top-[0px] left-[5%] text-center mx-auto font-semibold">
                  {auth.currentUser.displayName}
                </p>
              </div>
              <div className="self-stretch relative text-xl text-gray-500 text-center inline-block">
                {auth.currentUser.email}
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="font-medium text-2xl text-orange underline">Your Posts</p>
            <div className="flex-1 space-y-10 pb-5 flex flex-col p-[6px_30px_0px] box-border items-center justify-between text-base">
              {posts.map((post) => {
                if(post.data().email === auth.currentUser.email){
                  return (
                    <Post
                      key={post.id}
                      currentUser={auth.currentUser}
                      id={post.id}
                      name={post.data().name}
                      message={post.data().message}
                      email={post.data().email}
                      timestamp={post.data().timestamp}
                      userImage={post.data().userImage}
                      image={post.data().image}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
