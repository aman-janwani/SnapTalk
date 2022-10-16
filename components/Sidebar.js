import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { auth } from "../firebase";


const Sidebar = () => {
  const onGroupContainer1Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='snapTalkText']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const router = useRouter();

  // onClick={() => {
  //   auth.signOut(auth).then(() => {
  //     console.log("Sign-out successful.");
  //   }).catch((error) => {
  //     console.log("Sign-out Error.");
  //   });
  // }}


  return (
    <div className="h-screen hidden md:flex sticky top-0 flex-1 py-5 max-w-xs max-h-screen bg-white flex-col box-border items-center justify-between font-pacifico">
      <div
        className="relative w-full  flex items-center justify-center h-[42px] shrink-0 cursor-pointer"
        onClick={onGroupContainer1Click}
      >
        <div className="relative right-16 py-5">
          <div className="absolute top-[5.5px] left-[0px] w-[30px] h-[30px]">
            <div className="absolute top-[0px] left-[0px] rounded-[4px] bg-orange w-[30px] h-[30px]" />
            <img
              className="absolute top-[3.69px] left-[5.77px] w-[18.69px] h-[26.31px] object-cover"
              alt=""
              src="../3drenderkoreanfingerheartsymboliloveyouremovebg-2@2x.png"
            />
          </div>
          <div className="absolute top-[0px] left-[36.5px] w-[98px] h-[42px]">
            <div
              className="absolute top-[0px] left-[0px] text-3xl inline-block"
              data-scroll-to="snapTalkText"
            >
              SnapTalk
            </div>
            <div className="absolute top-[32.5px] left-[0.5px] rounded-[51px] bg-orange w-[34px] h-[3px]" />
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-[35px] font-poppins">
        <div onClick={()=> {
            router.push("/");
        }} className={` ${router.pathname === "/" ? "text-orange font-semibold" : "text-gray-400 font-medium"} self-stretch scale-95 hover:scale-100 duration-300 cursor-pointer flex flex-row items-center justify-center gap-[15px]`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <div className="relative inline-block">Home</div>
        </div>
        <div onClick={() => {
            router.push("/profile");
        }} className={`${router.pathname === "/profile" ? "text-orange font-semibold" : "text-gray-400 font-medium"} self-stretch scale-95 hover:scale-100 duration-300 cursor-pointer flex flex-row items-center justify-center gap-[15px] text-gray-400`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <div className="relative inline-block">Profile</div>
        </div>
      </div>
      <button onClick={() => {
              auth.signOut(auth).then(() => {
                console.log("Sign-out successful.");
              }).catch((error) => {
                console.log("Sign-out Error.");
              });
            }} className="cursor-pointer scale-95 hover:scale-100 duration-300 [border:none] p-[0] bg-red-500 relative rounded-[7px] w-3/6 flex items-center justify-center h-[45px] shrink-0">
        <div className="absolute text-2xl font-semibold font-poppins text-white text-left flex justify-center items-center">
          Log out
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
