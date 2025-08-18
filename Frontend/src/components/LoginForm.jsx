import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "./Input";
import loadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";
import FormWrapper from "./FormWrapper";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const setLoading = loadingStore((s) => s.setLoading);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: ["gmail.com", "domain.com", "*"] })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const form = useForm({ resolver: joiResolver(schema) });
  const {
    formState: { errors },
  } = form;

  const onLogin = async (data) => {
    setLoading(true);
    try {
      await login(data);

      navigate("/");
      toast.success("Successfully logged in.");
    } catch (ex) {
      let msg = "msg" in ex ? ex.msg : "Failed to log in !";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper form={form} header="Login" submitFn={onLogin}>
      <div className="flex flex-col">
        <Input name="email" register={form.register} errors={errors} />
        <Input
          name="password"
          type="password"
          errors={errors}
          register={form.register}
        />
        <Button className="">Login</Button>
      </div>

      {/* <div className="flex gap-2">
        <div className="flex items-center justify-between">
          <Link className="link" to="/register">
            New Joinee ?
          </Link>
          <Link className="link" to="/">
            Forgot password ?
          </Link>
        </div>

        <div className="flex gap-6">
          <div className="flex italic text-xs font-semibold justify-center tracking-widest items-center gap-6 mt-2 opacity-80">
            <div className="ring-1 ring-slate-300/50 dark:ring-primary-light w-full"></div>
            <div>OR</div>
            <div className="ring-1 ring-slate-300/50 dark:ring-primary-light w-full"></div>
          </div>
          <div className="flex gap-8 justify-center">
            {[FcGoogle, FaGithub, SiOpenai, RiNotionFill].map((Platform) => (
              <Button>
                <Platform />
              </Button>
            ))}
          </div>
        </div>
      </div> */}
    </FormWrapper>
  );
};

export default LoginForm;
