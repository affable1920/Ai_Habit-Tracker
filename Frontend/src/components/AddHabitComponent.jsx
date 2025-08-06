import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import useIntersection from "../hooks/useIntersection";
import habitSchema from "../schemas/habitSchema";
import useHabitStore from "../stores/habitStore";
import useExtraStore from "../stores/extraStore";
import useModalStore from "../stores/modalStore";
import { MODALS } from "../../constants/MODALS";
import Form from "./common/Form";

const Step1 = React.lazy(() => import("./AddForm/Step1"));
const Step2 = React.lazy(() => import("./AddForm/Step2"));

const AddHabitComponent = () => {
  const { openModal, modalProps } = useModalStore();
  const [step, setStep] = useState(1);

  const steps = [Step1, Step2];

  const { addHabit } = useHabitStore();
  const { extra } = useExtraStore();

  const form = useForm({ resolver: joiResolver(habitSchema) });
  const { elementRef, visible } = useIntersection({ threshold: 0.3 });

  const firstStep = step === 1;
  const lastStep = step === steps.length;

  let freq = form.watch("frequency");

  useEffect(() => {
    if (freq && typeof freq == "string" && freq.toLowerCase() == "custom") {
      openModal(MODALS.REMINDER);
    }
  }, [freq]);

  useEffect(() => {
    // Add exception handling for this
    if (
      modalProps.modalName === "reminderModal" &&
      modalProps.action === "CLOSE"
    ) {
      form.setValue("frequency", null);
    }
  }, [modalProps]);

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

  const resetFn = () => {
    form.reset();
    if (step != 1) setStep(1);
  };

  const StepComponent = steps[step - 1];

  return (
    <div className="wrapper__full">
      <div className="pad__box"></div>
      <div className="mid__box p-6 flex flex-col gap-6">
        <h2 className="heading__md font-semibold">What's on your mind ?</h2>
        <FormProvider {...form}>
          <div className="form__content__wrapper">
            <Form onSubmit={form.handleSubmit(handleNext)}>
              <React.Suspense>
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
                    className="btn btn__accent btn__small"
                  >
                    {"<"}
                  </button>
                )}
                <button className="btn btn__accent btn__small">
                  {lastStep ? "Submit" : "Next"}
                </button>
              </div>
            </Form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddHabitComponent;
