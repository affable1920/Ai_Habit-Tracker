const Form = ({ children, label }) => {
  return (
    <div className="flex flex-col justify-start items-center p-24 gap-4">
      <div
        className="shadow-xl rounded-md dark:border-color__secondary__lighter dark:shadow-black ring-2 ring-light
       dark:ring-secondary-lighter/50 p-10 py-12 w-full md:max-w-[400px] h-full"
      >
        <h1 className="text-2xl font-bold text-center tracking-wide mb-6 -mt-3">
          {label && label}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Form;
