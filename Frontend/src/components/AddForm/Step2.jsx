import Select from "../common/Select";
import { useFormContext } from "react-hook-form";
import IconComponent from "./../IconComponent";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
  FcReadingEbook,
  FcRegisteredTrademark,
} from "react-icons/fc";
import useExtraStore from "../../stores/extraStore";

const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const categories = [
    "Productivity",
    "Fitness",
    "Work",
    "Study",
    "Skill",
    "Health",
  ];

  const levels = [
    { el: FcLowPriority, val: 1 },
    { el: FcReadingEbook, val: 2 },
    { el: FcMediumPriority, val: 3 },
    { el: FcRegisteredTrademark, val: 4 },
    { el: FcHighPriority, val: 5 },
  ];
  const freqs = ["Daily", "Weekly", "Custom"];
  const setValues = useExtraStore((s) => s.setValues);

  return (
    <>
      <Select
        name="category"
        register={register}
        errors={errors}
        options={categories}
        optional
      />

      <div className="flex flex-col items-center gap-4">
        <h3 htmlFor="priority" className="label">
          Priority
        </h3>

        <div className="flex gap-8 justify-between">
          {levels.map((level) => (
            <IconComponent
              bg
              Icon={level.el}
              pClass="p-2"
              fn={() => setValues({ priority: level.val })}
            />
          ))}
        </div>
      </div>

      <Select
        name="frequency"
        register={register}
        errors={errors}
        options={freqs}
        optional
      />
    </>
  );
};

export default Step2;
