import Image from "next/image";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      router.push("/");
    })
    .catch(alert);
  };

  
  useEffect (() => {
    auth.currentUser && router.push("/");
  }, [auth.currentUser]);



  return (
    <div className="relative bg-white max-w-8xl mx-auto w-full overflow-hidden flex flex-row items-center justify-center">
      <div className="bg-gray-100 hidden lg:flex w-1/2 h-screen max-h-screen flex-col box-border items-center justify-center">
        <Image
        onClick={() => {
          auth.signOut(auth).then(() => {
            console.log("Sign-out successful.");
          }).catch((error) => {
            console.log("Sign-out Error.");
          });
        }}
          className="relative w-[574px] h-[399px] shrink-0 overflow-hidden"
          alt=""
          src="/undraw-secure-login-pdn4-2-1.svg"
          width={574}
          height={399}
        />
      </div>
      <div className="max-h-screen w-full lg:w-1/2 h-screen flex flex-row p-[212px_147px] box-border items-center justify-center lg:justify-between">
        <form className="relative w-[300px] sm:w-[426px] h-[430px] shrink-0 flex flex-col items-center">
          <div className="absolute top-[0px] w-[98px] h-[54px]">
            <div className="absolute top-[0px] left-[0px] text-[36px] font-semibold font-poppins text-orange text-left inline-block">
              Login
            </div>
            <div className="absolute top-[43px] left-[3px] rounded-[46px] bg-gray-400 w-[38px] h-[3px]" />
          </div>
          <input
            placeholder="Enter your email"
            className="[border:2px_solid_rgba(26,_26,_26,_0.2)] bg-gray-100 absolute top-[128px] left-[0px] rounded-[7px] box-border w-full flex flex-row p-[18px_32px] items-center justify-start"
            type="text"
          />
          <input
            className="[border:2px_solid_rgba(26,_26,_26,_0.2)] bg-gray-100 absolute top-[212px] left-[0px] rounded-[7px] box-border w-full flex flex-row p-[18px_32px] items-center justify-start"
            type="text"
            placeholder="Enter your Password"
          />
          <button
            className="[border:none] cursor-not-allowed p-[16px_32px] bg-orange absolute top-[296px] left-[0px] rounded-[7px] w-full flex flex-row box-border items-center justify-center"
            disabled
          >
            <div className="relative text-2xl font-semibold font-poppins text-gray-100 text-left inline-block">
              Coming soon
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="cursor-pointer scale-100 hover:scale-105 duration-300  [border:2px_solid_rgba(26,_26,_26,_0.2)] p-[9px_89px] bg-white absolute top-[380px] left-[0px] rounded-[7px] box-border w-full flex flex-row items-center justify-center gap-[22px]"
          >
            <Image
              className="relative w-[32px] h-[32px] shrink-0 overflow-hidden"
              alt=""
              src="/google--g--logo-1.svg"
              width={32}
              height={32}
            />
            <div className="relative text-2xl font-semibold font-poppins text-gray-400 text-left inline-block">
              Google
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
