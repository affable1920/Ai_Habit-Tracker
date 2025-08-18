import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import Input from "./Input";
import loadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";

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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerFn(data);
      form.reset();

      navigate("/");
      toast.success("Successfully registered !");
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ">
      <div className="padding-box" />
      <div className="">
        <h1>Welcome</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input name="email" register={form.register} errors={errors} />
          <Input
            name="password"
            type="password"
            register={form.register}
            errors={errors}
          />
          <Input name="username" register={form.register} errors={errors} />
          <div className="flex  gap-4">
            <button className="button button-accent">Register</button>
            <button
              className="button button-primary"
              onClick={() => navigate("/login")}
            >
              Already have an account ?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
