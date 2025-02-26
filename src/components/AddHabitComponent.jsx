import React, { useContext, useEffect, useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import TooltipContext from "../context/TooltipContext";
import Tooltip from "../components/Tooltip";
import InputAdd from "./common/InputAdd";
import Select from "./common/Select";
import useMutateHabit from "../hooks/useMutateHabit";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";

const AddHabitComponent = () => {
  const { tooltip } = useContext(TooltipContext);
  const { mutate, error } = useMutateHabit();

  const [isOpen, setIsOpen] = useState(false);
  const { state } = useLocation();

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    category: Joi.string().valid().optional().allow("").default(""),
    target: Joi.string().optional().allow("").default(""),
    frequency: Joi.string().valid().optional().allow("").default(""),
    startDate: Joi.date().optional().allow("").default(""),
    reminder: Joi.bool().optional(),
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
    reset,
    watch,
    setValue,
  } = useForm({ resolver: joiResolver(schema) });
  let reminder = watch("reminder");
  let showReminderInput = (reminder && reminder === "YES") || false;

  useEffect(() => {
    if (state) {
      const { rec = {} } = state;
      state.type === "rec"
        ? reset({
            title: rec?.alignmentWithCurrentGoals,
            description: rec?.benefits,
          })
        : reset(rec);
    }
  }, [state]);

  const onSubmit = async (data) => {
    mutate({ action: "add", newHabit: data });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        message={error?.message}
        onClose={() => setIsOpen(false)}
      />
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
              {tooltip?.input && tooltip.inputName === "target" && (
                <Tooltip tagline={tooltip?.input} />
              )}
            </div>
            <div className="flex w-full gap-5 items-center">
              {/* <Select
                name="reminder"
                label="Want a reminder ?"
                register={register}
                errors={errors}
                options={["YES", "NO"]}
                optional
              /> */}
              {showReminderInput && (
                <Modal
                  open={showReminderInput}
                  position={"bottom"}
                  small={true}
                  onClose={() => setValue("reminder", "NO")}
                >
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="flex gap-2">
                      <InputAdd
                        name={"reminderTimes"}
                        label="Just Say When"
                        register={register}
                        errors={errors}
                        optional
                        type="datetime-local"
                      />
                      <button
                        onClick={() => console.log("Time set")}
                        className="btn btn__secondary"
                      >
                        Set
                      </button>
                    </div>
                    <div className="flex">
                      <InputAdd
                        name="recurring"
                        label="Recurring ?"
                        register={register}
                        errors={errors}
                        optional
                        type="checkbox"
                      />
                    </div>
                  </div>
                </Modal>
              )}
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
          <button className="btn btn__accent w-20">Add</button>
        </form>
      </div>
    </>
  );
};

export default AddHabitComponent;
