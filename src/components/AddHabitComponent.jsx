import React, { useContext, useEffect } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import InputAdd from "./common/InputAdd";
import Select from "./common/Select";
import useMutateHabit from "../hooks/useMutateHabit";
import { useLocation } from "react-router-dom";
import { ModalContext } from "./Providers/ModalProvider";

const AddHabitComponent = () => {
  const { mutate } = useMutateHabit();
  const { state } = useLocation();

  const { dispatch } = useContext(ModalContext);
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),

    category: Joi.string()
      .valid("Health", "Productivity", "Fitness", "Study", "Other")
      .optional()
      .allow("")
      .default(""),

    frequency: Joi.string()
      .valid("Daily", "Weekly", "Bi-Weekly", "Custom")
      .optional()
      .allow("")
      .default(""),

    priority: Joi.string()
      .valid("Must Do", "High", "Medium", "Low")
      .optional()
      .allow("")
      .default(""),

    target: Joi.string().trim().optional().allow(""),
    reminder: Joi.boolean()
      .truthy("YES")
      .falsy("NO")
      .default(false)
      .optional()
      .allow(""),

    reminderTimes: Joi.date()
      .min("now")
      .when("reminder", { is: true, then: Joi.optional() }),

    startDate: Joi.date()
      .min("now")
      .optional()
      .allow("")
      .default("")
      .messages({ "date.min": "Start date cannot be in the past, IDIOT!" }),
  }).messages({
    "string.empty": "{#label} cannot be empty !",
    "any.required": "{#label} is required !",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const reminder = watch("reminder");
  useEffect(() => {
    if (state) {
      const { rec = {} } = state;

      if (state.type === "update") reset(state.habit);
      else if (state.type === "rec")
        reset({
          title: rec?.title || rec?.alignmentWithCurrentGoals,
          description: rec?.benefits,
        });
    }
    if (reminder)
      dispatch({ type: "OPEN_MODAL", modalToShow: "reminderModal" });
  }, [state, reminder]);

  const onSubmit = async (data) => {
    mutate({ action: "add", newHabit: data });
  };

  return (
    <>
      <div
        className="grid p-10 place-items-center shadow-md justify-self-center m-8 rounded-md border-[2px]
      border-slate-200 dark:border-color__secondary__lighter dark:shadow-black"
      >
        <form
          className="font-mono text-xs flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="headings__large text-center mb-10 -mt-3">
            Track what you want_
          </h1>
          <div className="flex flex-col gap-6">
            <InputAdd
              name="title"
              label="Habit Title"
              register={register}
              errors={errors}
            />
            <InputAdd
              name="description"
              label="Describe your habit"
              register={register}
              errors={errors}
              large={true}
            />
            <div className="flex">
              <Select
                name="category"
                label="Category"
                register={register}
                errors={errors}
                options={["Fitness", "Productivity", "Health", "Consistency"]}
                optional
              />
              <Select
                name="frequency"
                label="Frequency"
                register={register}
                errors={errors}
                options={["Daily", "Weekly", "Monthly", "Custom"]}
                optional
              />
              <Select
                name="priority"
                label="Priority"
                register={register}
                errors={errors}
                options={["Low", "Medium", "High", "Must DO !"]}
                optional
              />
            </div>
            <div className="tooltip__container">
              <InputAdd
                name="target"
                label="Target"
                register={register}
                errors={errors}
                placeholder="Days to track this habit !"
                type="number"
                optional
              />
            </div>
            <div className="flex w-full gap-5 items-center">
              <Select
                name="reminder"
                label="Want a reminder ?"
                register={register}
                errors={errors}
                options={["YES", "NO"]}
                optional
              />
              <InputAdd
                name="startDate"
                label="When to start ?"
                register={register}
                errors={errors}
                type="datetime-local"
                optional
              />
            </div>
          </div>
          <button className="btn btn__accent w-48 mt-4">Add</button>
        </form>
      </div>
    </>
  );
};

export default AddHabitComponent;
