import AuthAnouncement from "@/Component/AuthAnouncement";
import LoginForm from "@/Component/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen min-h-screen w-full AuthBg flex items-center justify-center">
      <div className="h-[96%] w-[96%] border-4 rounded-2xl border-white flex">
        <div className="w-[40%] h-full max-md:hidden">
          <AuthAnouncement />
        </div>
        <div className="w-[60%] max-md:w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
