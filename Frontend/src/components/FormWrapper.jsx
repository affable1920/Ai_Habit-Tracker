import React from "react";
import Button from "./Button";
import { BiReset } from "react-icons/bi";
import { FormProvider } from "react-hook-form";

// className="bg-blue-100 flex flex-col app-shadow rounded-md p-4 gap-6 py-8"
const FormWrapper = React.memo(({ form, children, header, submitFn }) => {
  return (
    <FormProvider {...form}>
      <div className="p-12" />
      <section
        className="flex flex-col gap-8 p-4 py-6 max-w-sm md:max-w-md mx-auto 
      rounded-sm app-shadow ring-2 ring-slate-200 dark:ring-3 dark:ring-primary-light"
      >
        <h1 className="text-center">{header}</h1>
        <form onSubmit={form.handleSubmit(submitFn)}>{children}</form>
      </section>
    </FormProvider>
  );
});

export default FormWrapper;

/* / 
          <Button className="self-end">
            <BiReset />
          </Button>
/*/
