import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Spinner from "./Spinner";
import useIntersection from "../hooks/useIntersection";
import habitsSchema from "../schemas/habitSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";

const Step1 = React.lazy(() => import("./AddForm/Step1"));
const Step2 = React.lazy(() => import("./AddForm/Step2"));
const Step3 = React.lazy(() => import("./AddForm/Step3"));

const AddHabitComponent = () => {
  const [step, setStep] = useState(1);

  const steps = [Step1, Step2, Step3];
  const StepComponent = steps[step - 1];

  const form = useForm({ resolver: joiResolver(habitsSchema) });
  const { formState } = form;

  const handleNext = (formData) => {
    if (step < steps.length) setStep(step + 1);
    else axios.post("http://localhost:8000/habits", formData);
  };

  const { elementRef, visible } = useIntersection({ threshold: 0.4 });

  const firstStep = step === 1;
  const lastStep = step === steps.length;

  const handleBack = () => {
    setStep((step) => (step === firstStep ? step : step - 1));
  };

  return (
    <section>
      <section className="p-24 flex flex-col justify-start items-center">
        <div
          ref={elementRef}
          className={`form__control duration-500 ${
            !visible
              ? "opacity-0 pointer-events-none scale-75"
              : "opacity-100 pointer-events-auto scale-100"
          }`}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleNext)}>
              <React.Suspense fallback={<Spinner />}>
                <StepComponent />
              </React.Suspense>
              <div
                className={`flex mt-4 ${
                  firstStep ? "justify-end" : "justify-between"
                }`}
              >
                {!firstStep && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn__accent"
                  >
                    {"<"}
                  </button>
                )}
                <button className="btn btn__accent">
                  {lastStep ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </section>
  );
};

export default AddHabitComponent;
