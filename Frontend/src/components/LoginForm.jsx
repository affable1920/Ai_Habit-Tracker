import { useContext } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "./common/Input";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import loadingStore from "../stores/loadingStore";
import { AuthContext } from "./Providers/AuthProvider";
import Form from "./common/Form";
import IconComponent from "./IconComponent";
import { FaGithub } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";

const LoginForm = () => {
  const { setLoading } = loadingStore();
  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: ["gmail.com", "domain.com", "*"] })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    // if (user) return;

    setLoading(true);
    try {
      await login(data);

      navigate("/");
      toast.success("Succesfully logged in !");
    } catch (err) {
      console.log(err);

      if (typeof err != "string") err = "Unable to login !";
      toast.error(err, { description: "Please try again ." });
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);

    try {
      await login();

      navigate("/");
      toast.success("Successfully logged in.");
    } catch (error) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper__full">
      <div className="pad__box" />
      <div className="mid__box p-8 flex flex-col gap-4">
        <h2 className="heading__md">Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" register={register} errors={errors} />
          <Input
            name="password"
            register={register}
            errors={errors}
            type="password"
          />
          <button className="btn btn__accent w-full mt-1 mb-2">Login</button>
        </Form>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Link className="link" to="/register">
              New Joinee ?
            </Link>
            <Link className="link" to="/">
              Forgot password ?
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex italic text-xs font-semibold justify-center tracking-widest items-center gap-6 mt-2 opacity-80">
              <div className="ring-1 ring-light-darker/50 dark:ring-secondary-lighter w-full"></div>
              <div>OR</div>
              <div className="ring-1 ring-light-darker/50 dark:ring-secondary-lighter w-full"></div>
            </div>
            <div className="flex gap-8 justify-center">
              <IconComponent bg Icon={FcGoogle} fn={googleSignIn} />
              <IconComponent bg Icon={FaGithub} />
              <IconComponent bg Icon={SiOpenai} />
              <IconComponent bg Icon={RiNotionFill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
