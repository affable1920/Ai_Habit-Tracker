import { useFormContext } from "react-hook-form";
import Select from "../Select";
import Button from "../Button";

import { FcLowPriority, FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcReadingEbook, FcRegisteredTrademark } from "react-icons/fc";
import useExtraStore from "../../stores/extraStore";

const Step2 = () => {
  const { register, formState } = useFormContext();

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
        errors={formState.errors}
        options={categories}
        optional
      />

      <div className="flex  gap-3">
        <h3 htmlFor="priority" className="label">
          Priority
        </h3>

        <div className="flex gap-8">
          {levels.map((level) => (
            <Button
              bg
              icon={level.el}
              onClick={() => setValues({ priority: level.val })}
            />
          ))}
        </div>
      </div>

      <Select
        name="frequency"
        register={register}
        errors={formState.errors}
        options={freqs}
        optional
      />
    </>
  );
};

export default Step2;
