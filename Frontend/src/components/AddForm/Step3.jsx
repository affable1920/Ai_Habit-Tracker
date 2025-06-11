import Select from "../common/Select";
import { useFormContext } from "react-hook-form";

const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Select
        name="reminder"
        register={register}
        errors={errors}
        options={["YES", "NO"]}
        optional
      />
      <InputAdd
        name="reminderTimes"
        register={register}
        errors={errors}
        type="datetime-local"
        optional
      />
    </>
  );
};

export default Step3;
