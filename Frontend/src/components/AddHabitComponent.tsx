import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Button from "./Interactives/Button.js";
import Spinner from "./Spinner.js";
import FormWrapper from "./FormWrapper.js";
import HabitSchema from "../schemas/HabitSchema.js";

import useHabitStore from "../stores/habitStore.js";
import useModalStore from "../stores/modalStore.js";

import { toast } from "sonner";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import Step1 from "./Step1.js";
import Step2 from "./Step2.js";
import useLoadingStore from "../stores/loadingStore.js";
import type { Habit } from "../types/genericTypes.js";

const AddHabitComponent = () => {
  const steps = [Step1, Step2];
  const [step, setStep] = React.useState(0);

  const firstStep = step === 0;
  const lastStep = step === steps.length - 1;

  const addHabit = useHabitStore((s) => s.addHabit);
  const openModal = useModalStore((s) => s.openModal);

  const loading = useLoadingStore((s) => s.loading);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const form = useForm<Habit>({ resolver: joiResolver(HabitSchema) });
  let freq = form.watch("frequency");

  React.useEffect(() => {
    if (freq && freq == "Custom") {
    }
  }, [freq]);

  const handleBack = React.useCallback(
    () => setStep((st) => (firstStep ? 0 : st - 1)),
    []
  );

  const handleNext = React.useCallback(
    async (formData: Habit) => {
      if (!lastStep) setStep((st) => st + 1);
      else {
        setLoading(true, { props: { type: "btn" } });
        try {
          await addHabit(formData);
          form.reset();

          toast.success("Habit Added Successfully !");
        } catch (ex: any) {
          const msg = ex?.msg ?? "Failed to add Habit !";
          toast.error(msg);
        } finally {
          setLoading(false);
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
          {CurrentStep && <CurrentStep />}
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
          <Button {...{ disabled: loading }} className="italic px-2">
            {loading ? "" : lastStep ? "Submit" : "Next"}
            {loading ? <Spinner /> : <MdArrowForward />}
          </Button>
        </div>
      </motion.section>
    </FormWrapper>
  );
};

export default AddHabitComponent;
