import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Button from "./Button";
import FormWrapper from "./FormWrapper";
import habitSchema from "../schemas/habitSchema";

import useHabitStore from "../stores/habitStore";
import useExtraStore from "../stores/extraStore";
import useModalStore from "../stores/modalStore";

import { toast } from "sonner";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import Step1 from "./AddForm/Step1";
import Step2 from "./AddForm/Step2";

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
      if (!lastStep) setStep((st) => st + 1);
      else {
        if (extra) formData = { ...formData, ...extra };

        try {
          await addHabit(formData);
          form.reset();

          toast.success("Habit Added Successfully !");
        } catch (ex) {
          const msg = ex?.msg ?? "Failed to add Habit !";
          toast.error(msg);
        } finally {
          setStep(0);
        }
      }
    },
    [step]
  );

  const CurrentStep = steps[step];

  return (
    <FormWrapper header="Start Tracking !" submitFn={handleNext} form={form}>
      <motion.section className="flex flex-col gap-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <CurrentStep />
        </motion.div>

        <div
          className={`flex items-center ${
            firstStep ? "justify-end" : "justify-between"
          }`}
        >
          {!firstStep && (
            <Button onClick={handleBack} className="italic">
              <MdArrowBack />
            </Button>
          )}
          <Button className="italic px-2">
            {lastStep ? "Submit" : "Next"}
            <MdArrowForward />
          </Button>
        </div>
      </motion.section>
    </FormWrapper>
  );
};

export default AddHabitComponent;
