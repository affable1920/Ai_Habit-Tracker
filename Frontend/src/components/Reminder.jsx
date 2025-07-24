import { useContext } from "react";
import Input from "./common/Input";
import { useForm } from "react-hook-form";
import Select from "./common/Select";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ModalContext } from "./Providers/ModalProvider";
import useExtraStore from "./../stores/extraStore";

const Reminder = () => {
  const { modals, dispatch } = useContext(ModalContext);

  const extra = useExtraStore((s) => s.extra);
  const setValues = useExtraStore((s) => s.setValues);

  const schema = Joi.object({
    interval: Joi.number().optional().min(1).default(0),
    interval_time: Joi.string().optional(),
  });

  const form = useForm({ resolver: joiResolver(schema) });
  const {
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    setValues(data);
    dispatch({
      type: "CLOSE_MODAL",
      name: "reminderModal",
    });
  };

  const intervalTimes = ["Minutes", "Hours", "Days", "Weeks"];

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="italic text-md tracking-wider text-center bg-accent p-2 rounded-md shadow-lg">
          Repeat every ?
        </h4>
        <div className="flex flex-col gap-2">
          <Input
            name={"interval"}
            label="Interval"
            register={form.register}
            errors={errors}
            type="number"
          />
          <Select
            name="interval_time"
            label="Interval_Time"
            register={form.register}
            errors={errors}
            options={intervalTimes}
          />
        </div>
        <div className="self-center mt-5">
          <button className="btn btn__accent w-full">Set</button>
        </div>
      </form>
    </>
  );
};

export default Reminder;
