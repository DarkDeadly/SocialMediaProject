import AuthAnouncement from "@/Component/AuthAnouncement";
import RegisterForm from "@/Component/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <div className="h-screen min-h-screen w-full AuthBg flex items-center justify-center">
      <div className="h-[96%] w-[96%] border-4 rounded-2xl border-white flex">
        <div className="w-[40%] max-md:hidden">
          <AuthAnouncement />
        </div>
        <div className="w-[60%] max-md:w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
