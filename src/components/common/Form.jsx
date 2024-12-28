import React from "react";

const Form = ({ children, label }) => {
  return (
    <div className=" m-4 flex flex-col justify-center items-center gap-4 min-h-screen">
      <div className="shadow-xl rounded-md max-w-md md:p-12 w-full p-8 py-12">
        <h1 className="text-2xl font-bold text-center tracking-wide ">
          {label}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Form;
