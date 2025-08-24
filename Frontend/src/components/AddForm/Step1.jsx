import Input from "../Input";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <Input name="title" register={register} errors={formState.errors} />
      <Input
        large
        optional
        name="description"
        register={register}
        errors={formState.errors}
      />
    </div>
  );
};

export default Step1;
