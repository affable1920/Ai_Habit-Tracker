import Joi from "joi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import FormWrapper from "./FormWrapper.js";
import Input from "./Interactives/Input.js";
import Button from "./Interactives/Button.js";
import useAuthStore from "../stores/authStore.js";
import loadingStore from "../stores/loadingStore.js";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { SiOpenai, SiNotion } from "react-icons/si";

import type { User } from "../types/genericTypes.js";
const platforms = [FaGoogle, FaGithub, SiOpenai, SiNotion];

const RegisterForm = () => {
  const navigate = useNavigate();

  const setLoading = loadingStore((s) => s.setLoading);
  const { register: registerFn } = useAuthStore((s) => s);

  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    username: Joi.string().min(3).required().label("Username"),
  });

  const form = useForm({ resolver: joiResolver(schema) });
  const {
    formState: { errors },
  } = form;

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      await registerFn(data);
      form.reset();

      navigate("/");
      toast.success("Successfully registered !");
    } catch (ex: any) {
      console.log(ex);
      const msg = ex?.msg ?? "Unable to regsiter!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper header="Sign Up !" form={form} submitFn={onSubmit}>
      <section className="form-content">
        <div className="flex flex-col gap-6">
          <Input name="email" register={form.register} errors={errors} />
          <Input
            name="password"
            type="password"
            errors={errors}
            register={form.register}
          />
          <Input name="username" register={form.register} errors={errors} />
        </div>

        <div className="flex flex-col gap-2">
          <Button className="py-2" type="submit">
            Register
          </Button>
          <Link className="self-center link text-sm" to="/login">
            Already have an account ?
          </Link>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between text-sm">
            <div />
            <div>OR</div>
            <div />
          </div>

          <div className="flex justify-between">
            {platforms.map((Platform) => (
              <Button>
                <Platform />
              </Button>
            ))}
          </div>
        </section>
      </section>
    </FormWrapper>
  );
};

export default RegisterForm;
