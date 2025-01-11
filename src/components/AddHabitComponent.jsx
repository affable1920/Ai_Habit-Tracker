import React, { useContext } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import useHabits from "../hooks/useHabits";
import AuthContext from "./../context/AuthContext";
import TooltipContext from "../context/TooltipContext";
import Tooltip from "../components/Tooltip";
import InputAdd from "./common/InputAdd";
import Select from "./common/Select";
import useAddHabit from "../hooks/useAddHabit";
import { MdNearbyError } from "react-icons/md";

const AddHabitComponent = () => {
  const { tooltip } = useContext(TooltipContext);
  const { mutate, error } = useAddHabit();

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    category: Joi.string().valid().optional().allow(""),
    target: Joi.string().optional().allow(""),
    frequency: Joi.string().valid().optional().allow(""),
    startDate: Joi.date().optional().allow(""),
    reminder: Joi.bool()
      .optional()
      .default("false")
      .allow("")
      .valid("yes", "no"),
    reminderTimes: Joi.when("reminder", {
      is: true,
      then: Joi.array().items(Joi.date().iso().min(1).required()),
      otherwise: Joi.forbidden(),
    }),
    priority: Joi.string().optional().allow(""),
    duration: Joi.string().optional().allow(""),
  }).messages({
    "string.empty": "{#label} cannot be empty !",
    "any.required": "{#label} is required !",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <>
      {error && (
        <div
          className="error flex items-center gap-5 text-red-800 bg-slate-50
        px-6 py-1 rounded-sm border-[1px] border-red-500"
        >
          <MdNearbyError className="icon__with__bg" />
          <span className="font-semibold tracking-wider text-sm">
            Error 404 - {error.message}
          </span>
        </div>
      )}
      <div className="grid md:grid-cols-2">
        <form className="m-8 mt-4 font-mono " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="headings__large text-center mb-6 md:mb-4">
            Habit Tracker
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
              />
              {tooltip?.input && tooltip.inputName === "target" && (
                <Tooltip tagline={tooltip?.input} />
              )}
            </div>
            <div className="flex w-full gap-5 items-center">
              <InputAdd
                name="reminder"
                label="Want a reminder ?"
                register={register}
                errors={errors}
                short
              />
              <InputAdd
                name="startDate"
                label="When to start ?"
                register={register}
                errors={errors}
                type="datetime-local"
              />
            </div>
          </div>
          <button className="btn btn__accent w-20">Add</button>
        </form>
      </div>
    </>
  );
};

export default AddHabitComponent;

// const habitData = {
//   userId: userId,
//   title: "Read a book",
//   description: "Read 20 pages every evening",
//   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//   startDate: "2025-01-10T18:00:00Z",
//   reminderTime: "18:00",
//   frequency: { type: "daily", days: [] },
//   priority: "medium",
//   streak: 0,
//   progress: [],
//   status: "active"
