import Input from "../common/Input";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <Input name="title" register={register} errors={formState.errors} />
      <Input
        name="description"
        register={register}
        errors={formState.errors}
        large
        optional
      />
    </>
  );
};

export default Step1;
