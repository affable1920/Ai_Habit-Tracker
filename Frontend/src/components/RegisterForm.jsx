import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import Form from "./common/Form";
import Input from "./common/Input";
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
    <div className="wrapper__full">
      <div className="pad__box" />
      <div className="mid__box p-8">
        <h2 className="heading__md">Welcome</h2>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Input name="email" register={form.register} errors={errors} />
          <Input
            name="password"
            type="password"
            register={form.register}
            errors={errors}
          />
          <Input name="username" register={form.register} errors={errors} />
          <div className="flex flex-col gap-4">
            <button className="btn btn__accent">Register</button>
            <button
              className="btn btn__primary"
              onClick={() => navigate("/login")}
            >
              Already have an account ?
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
