import React, { useContext, useState } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import authService from "../services/authService";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { LoadinStateContext } from "./Providers/AppProviders";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { loading, dispatchLoading } = useContext(LoadinStateContext);

  const navigate = useNavigate();

  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    dispatchLoading(true);
    try {
      await authService.login(data);
      navigate("/");

      toast.success("Successfully logged in.");
    } catch (err) {
      setError(err?.message);
    } finally {
      dispatchLoading(false);
    }
  };

  const googleSignIn = async () => {
    dispatchLoading(true);

    try {
      authService.loginWithGoogle();
      navigate("/");

      toast.success("Successfully logged in.");
    } catch (error) {
      setError(err?.message);
    } finally {
      dispatchLoading(false);
    }
  };

  return (
    <Form label="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputAdd
          name="email"
          register={register}
          errors={errors}
          label="Email"
          teritiary={true}
        />
        <InputAdd
          name="password"
          register={register}
          errors={errors}
          label="Password"
          type="password"
          teritiary={true}
        />
        {error && (
          <div className="text-danger__darker dark:text-danger text-xs italic tracking-widest text-center font-medium">
            {error}
          </div>
        )}
        <button className="btn btn__primary w-full mt-2">Login</button>
      </form>
      <button className="btn btn__white w-full mt-4" onClick={googleSignIn}>
        <Link className="text-xs flex items-center justify-center gap-3">
          Sign in with <FcGoogle />
        </Link>
      </button>
    </Form>
  );
};

export default LoginForm;
