import React from "react";
import { FormProvider } from "react-hook-form";

const FormWrapper = React.memo(({ form, children, header, submitFn }) => {
  return (
    <FormProvider {...form}>
      <div className="p-12" />
      <section className="form-wrapper">
        <h1 className="text-center">{header}</h1>
        <form onSubmit={form.handleSubmit(submitFn)}>
          {children && children}
        </form>
      </section>
    </FormProvider>
  );
});

export default FormWrapper;
