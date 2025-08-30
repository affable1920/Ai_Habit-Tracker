import React from "react";
import {
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

interface FromWrapperProps {
  header: String;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  submitFn: SubmitHandler<any>;
}

const FormWrapper = React.memo(
  ({ form, children, header, submitFn }: FromWrapperProps) => {
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
  }
);

export default FormWrapper;
