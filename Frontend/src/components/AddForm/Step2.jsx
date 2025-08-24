import { useFormContext } from "react-hook-form";
import Select from "../Select";
import Button from "../Button";

import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority, FcHighPriority } from "react-icons/fc";
import { FcReadingEbook, FcRegisteredTrademark } from "react-icons/fc";

const categories = [
  "Productivity",
  "Fitness",
  "Work",
  "Study",
  "Skill",
  "Health",
];

const levels = [
  { icon: FcLowPriority, val: 1 },
  { icon: FcReadingEbook, val: 2 },
  { icon: FcMediumPriority, val: 3 },
  { icon: FcRegisteredTrademark, val: 4 },
  { icon: FcHighPriority, val: 5 },
];
const freqs = ["Daily", "Weekly", "Custom"];

const Step2 = () => {
  const { register, formState, setValue, watch } = useFormContext();
  let watcher = watch("priority");

  const setPriority = (val) => {
    if (watcher && watcher === val) setPriority("priotit", 0);
    else setValue("priority", val);
  };

  return (
    <div className="flex flex-col gap-6">
      <Select
        name="category"
        register={register}
        errors={formState.errors}
        options={categories}
        optional
      />

      <div className="flex flex-col gap-4">
        <h3 htmlFor="priority" className="label">
          How important is this habit to you ?
        </h3>

        <div className="flex justify-between">
          {levels.map(({ icon: Icon, val }) => (
            <Button type="button" onClick={() => setPriority(val)}>
              <Icon />
            </Button>
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
    </div>
  );
};

export default Step2;
