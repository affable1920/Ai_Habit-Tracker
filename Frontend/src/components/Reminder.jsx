import Input from "./common/Input";
import { useForm } from "react-hook-form";
import Select from "./common/Select";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import useExtraStore from "./../stores/extraStore";
import useModalStore from "../stores/modalStore";

const Reminder = () => {
  const closeModal = useModalStore((s) => s.closeModal);

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
    closeModal();
  };

  const intervalTimes = ["Minutes", "Hours", "Days", "Weeks"];

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="italic text-md tracking-wider text-center bg-accent p-2 rounded-md shadow-lg">
          Repeat every ?
        </h4>
        <div className="flex  gap-2">
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
          <button className="button button-accent w-full">Set</button>
        </div>
      </form>
    </>
  );
};

export default Reminder;
