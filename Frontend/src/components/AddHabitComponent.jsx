import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FormProvider } from "react-hook-form";

import Button from "./Button";
import Spinner from "./Spinner";
import habitSchema from "../schemas/habitSchema";

import useHabitStore from "../stores/habitStore";
import useExtraStore from "../stores/extraStore";
import useModalStore from "../stores/modalStore";

import { toast } from "sonner";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import FormWrapper from "./FormWrapper";

const Step1 = React.lazy(() => import("./AddForm/Step1"));
const Step2 = React.lazy(() => import("./AddForm/Step2"));

const AddHabitComponent = () => {
  const steps = [Step1, Step2];
  const [step, setStep] = React.useState(0);

  const firstStep = step === 0;
  const lastStep = step === steps.length - 1;

  const extra = useExtraStore((s) => s.extra);
  const addHabit = useHabitStore((s) => s.addHabit);

  const openModal = useModalStore((s) => s.openModal);

  const form = useForm({ resolver: joiResolver(habitSchema) });
  let freq = form.watch("frequency");

  React.useEffect(() => {
    const userSetfreq = !!String(freq);

    if (!userSetfreq) return;
    const freqCustom = freq?.toLowerCase() == "custom";

    if (userSetfreq && freqCustom) {
      openModal("REMINDER");
    }
  }, [freq]);

  const handleBack = React.useCallback(() =>
    setStep((st) => (st === firstStep ? 0 : st - 1))
  );

  const handleNext = React.useCallback(
    async (formData) => {
      if (lastStep) {
        if (extra) formData = { ...formData, ...extra };
        try {
          await addHabit(formData);
          toast.success("Habit Added Successfully !");

          form.reset();
          setStep(1);
        } catch (ex) {
          console.log(ex);
          const msg = ex?.msg ?? "Failed to add Habit !";
          toast.error(msg);
        }
      } else setStep((st) => st + 1);
    },
    [step]
  );

  const CurrentStep = steps[step];

  return (
    <FormWrapper header="Start Tracking !" submitFn={handleNext} form={form}>
      <React.Suspense fallback={<Spinner />}>
        <CurrentStep />
      </React.Suspense>

      <div
        className={`flex items-center ${
          firstStep ? "justify-end" : "justify-between"
        }`}
      >
        {!firstStep && (
          <Button onClick={handleBack}>
            <MdArrowBack />
          </Button>
        )}
        <Button>
          {lastStep ? "Submit" : "Next"}
          <MdArrowForward />
        </Button>
      </div>
    </FormWrapper>
  );
};

export default AddHabitComponent;
