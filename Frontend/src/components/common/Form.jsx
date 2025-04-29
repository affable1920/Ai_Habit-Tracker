import React from "react";

const Form = ({ children, label }) => {
  return (
    <div className="flex flex-col justify-start items-center p-24 gap-4 min-h-screen">
      <div
        className="shadow-xl  rounded-md 
      dark:border-color__secondary__lighter dark:shadow-black border-2 border-slate-100
       dark:border-accent__darker p-8"
      >
        <h1 className="text-2xl font-bold text-center tracking-wide mb-6 -mt-3">
          {label}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Form;
