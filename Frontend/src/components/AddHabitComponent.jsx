import React, { useContext, useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import useIntersection from "../hooks/useIntersection";
import habitSchema from "../schemas/habitSchema";
import { toast } from "sonner";
import Spinner from "./Spinner";
import useHabitStore from "./habitStore";
import useExtraStore from "../stores/extraStore";
import { ModalContext } from "./Providers/ModalProvider";
import { GrPowerReset } from "react-icons/gr";

const Step1 = React.lazy(() => import("./AddForm/Step1"));
const Step2 = React.lazy(() => import("./AddForm/Step2"));

const AddHabitComponent = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const [step, setStep] = useState(1);

  const steps = [Step1, Step2];
  const StepComponent = steps[step - 1];

  const { addHabit } = useHabitStore();
  const { extra } = useExtraStore();

  const form = useForm({ resolver: joiResolver(habitSchema) });
  const { elementRef, visible } = useIntersection({ threshold: 0.3 });

  const firstStep = step === 1;
  const lastStep = step === steps.length;

  let freq = form.watch("frequency");

  useEffect(() => {
    if (freq && typeof freq == "string" && freq.toLowerCase() == "custom")
      dispatch({ type: "OPEN_MODAL", name: "reminderModal" });
  }, [freq]);

  useEffect(
    () => {
      if (
        modal.props.modalName === "reminderModal" &&
        modal.props.action === "CLOSE"
      ) {
        form.setValue("frequency", null);
      }
    },
    modal.props ? [modal.props] : []
  );

  const handleBack = () =>
    setStep((step) => (step === firstStep ? step : step - 1));

  const handleNext = async (formData) => {
    if (step < steps.length) {
      setStep(step + 1);
      return;
    } else {
      if (extra) formData = { ...formData, ...extra };

      let { success, msg } = await addHabit(formData);

      if (typeof msg != "string")
        msg = success ? "Habit added successfully !" : "Error adding Habit !";

      if (!success) {
        toast.error(msg);
        return;
      }

      // form.reset();
      // setStep(1);
      toast.success(msg);
    }
  };

  return (
    <section>
      <section className="p-24 flex flex-col justify-start items-center">
        <div
          ref={elementRef}
          className={`form__control duration-500 ${
            !visible
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } relative`}
        >
          <GrPowerReset
            className="icon__with__bg cp absolute bottom-2 right-2"
            onClick={() => {
              form.reset();
              step != 1 && setStep(1);
            }}
          />
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
