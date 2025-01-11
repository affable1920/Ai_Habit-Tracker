import React from "react";

const Form = ({ children, label }) => {
  return (
    <div
      className="flex flex-col justify-start items-center p-24 gap-4 min-h-screen 
    bg-gradient-to-r from-color__from to-color__to"
    >
      <div
        className="shadow-xl rounded-md ring-1 ring-slate-200
       max-w-md md:p-12 w-full px-10 py-10 pt-4"
      >
        <h1 className="text-2xl font-bold text-center tracking-wide ">
          {label}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Form;
