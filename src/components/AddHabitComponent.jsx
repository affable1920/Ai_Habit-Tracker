import React, { useContext } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import TooltipContext from "../context/TooltipContext";
import Tooltip from "../components/Tooltip";
import InputAdd from "./common/InputAdd";
import Select from "./common/Select";
import useMutateHabit from "../hooks/useMutateHabit";
import Alert from "./Alert";

const AddHabitComponent = () => {
  const { tooltip } = useContext(TooltipContext);
  const { mutate, error, isSuccess } = useMutateHabit();

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    category: Joi.string().valid().optional().allow("").default(""),
    target: Joi.string().optional().allow("").default(""),
    frequency: Joi.string().valid().optional().allow("").default(""),
    startDate: Joi.date().optional().allow("").default(""),
    reminder: Joi.bool()
      .optional()
      .default("false")
      .allow("")
      .valid("yes", "no")
      .default(""),
    reminderTimes: Joi.when("reminder", {
      is: true,
      then: Joi.array().items(Joi.date().iso().min(1).required()),
      otherwise: Joi.forbidden(),
    }),
    priority: Joi.string().optional().allow("").default(""),
    duration: Joi.string().optional().allow("").default(""),
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
    mutate({ action: "add", newHabit: data });
  };

  return (
    <>
      {(error || isSuccess) && (
        <Alert
          ifSuccessfull={isSuccess}
          errorMessage={error?.message ? error?.message : "Operation Failed !"}
        />
      )}
      <div className="grid md:grid-cols-2 p-10">
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
        <section></section>
      </div>
    </>
  );
};

export default AddHabitComponent;
