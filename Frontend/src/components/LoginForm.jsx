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
      console.log(ex);
      let msg = "msg" in ex ? ex.msg : "Failed to log in !";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper form={form} header="Login" submitFn={onLogin}>
      <section className="form-content">
        <div className="flex flex-col gap-6">
          <Input name="email" register={form.register} errors={errors} />
          <Input
            name="password"
            type="password"
            errors={errors}
            register={form.register}
          />
          <Button className="py-2">Login</Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Link className="link" to="/register">
              New Joinee ?
            </Link>
            <Link className="link" to="/">
              Forgot password ?
            </Link>
          </div>

          <div className="flex justify-between text-sm">
            <div />
            <div>OR</div>
            <div />
          </div>

          <div className="flex justify-between">
            {[FcGoogle, FaGithub, SiOpenai, RiNotionFill].map((Platform) => (
              <Button>
                <Platform />
              </Button>
            ))}
          </div>
        </div>
      </section>
    </FormWrapper>
  );
};

export default LoginForm;
