import React from "react";
import InputAdd from "./common/InputAdd";
import { useForm } from "react-hook-form";

const Reminder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-col items-center px-2">
          <InputAdd
            name={"reminderTimes"}
            label="Just Say When"
            register={register}
            errors={errors}
            optional
            type="datetime-local"
          />
          <InputAdd
            name="recurring"
            label="Recurring ?"
            register={register}
            errors={errors}
            optional
            type="checkbox"
          />
        </div>
        <div className="self-center">
          <button className="btn btn__accent w-20">Set</button>
        </div>
      </div>
    </form>
  );
};

export default Reminder;
