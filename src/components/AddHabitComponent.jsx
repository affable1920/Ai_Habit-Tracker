import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { step1, step2, step3 } from "./../schemas/habitSchema";
import Spinner from "./Spinner";
import useIntersection from "../hooks/useIntersection";

const Step1 = React.lazy(() => import("./AddForm/Step1"));
const Step2 = React.lazy(() => import("./AddForm/Step2"));
const Step3 = React.lazy(() => import("./AddForm/Step3"));

const AddHabitComponent = () => {
  const [step, setStep] = useState(1);

  const steps = [Step1, Step2, Step3];
  const StepComponent = steps[step - 1];

  const form = useForm();
  const {
    formState: { errors },
  } = form;

  const handleNext = () => {
    setStep((step) => (step === steps.length ? step : step + 1));
  };

  const handleBack = () => {
    setStep((step) => (step === 1 ? step : step - 1));
  };

  const { elementRef, visible } = useIntersection({ threshold: 0.4 });

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
          <form>
            <React.Suspense fallback={<Spinner />}>
              <StepComponent register={form.register} errors={errors} />
            </React.Suspense>
            <div className={`flex justify-end mt-4`}>
              <button type="submit" className="btn btn__accent">
                Submit
              </button>
            </div>
          </form>
          <div className={`mt-8 flex`}>
            <button onClick={handleBack} className="btn btn__accent">
              {"<"}
            </button>
            <button onClick={handleNext} className="btn btn__accent">
              {">"}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AddHabitComponent;
