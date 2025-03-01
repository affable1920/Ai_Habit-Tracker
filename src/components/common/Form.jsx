import React from "react";

const Form = ({ children, label }) => {
  return (
    <div
      className="flex flex-col justify-start items-center p-24 gap-4 min-h-screen 
    bg-gradient-to-r from-color__from to-color__to"
    >
      <div
        className="shadow-xl border-[2px] border-slate-200 rounded-md 
      dark:border-color__secondary__lighter dark:shadow-black/80 p-8"
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
