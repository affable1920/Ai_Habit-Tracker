import React, { useState } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import authService from "../services/authService";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import loadingStore from "../stores/loadingStore";

const LoginForm = () => {
  const { setLoading } = loadingStore();
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
    try {
      await authService.login(data);

      window.location = "/";
      toast.success("Succesfully logged in !");
    } catch (ex) {
      toast.error(ex);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);

    try {
      await authService.login();

      navigate("/");
      toast.success("Successfully logged in.");
    } catch (error) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
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
        />
        <InputAdd
          name="password"
          register={register}
          errors={errors}
          label="Password"
          type="password"
        />
        <button className="btn btn__primary w-full mt-1 mb-2">Login</button>
      </form>
      <Link
        className="link text-[10px] italic tracking-widest text-center block"
        to="/register"
      >
        New Joinee ?
      </Link>
      <div className="flex italic text-xs justify-center items-center gap-2 mt-2 opacity-80">
        <div className="border-[1px] border-slate-200 dark:border-accent w-16"></div>
        <div>OR</div>
        <div className="border-[1px] border-slate-200 dark:border-accent w-16"></div>
      </div>
      <button
        className="btn btn__white w-full mt-2 flex items-center justify-center gap-3"
        onClick={googleSignIn}
      >
        Sign in with <FcGoogle />
      </button>
    </Form>
  );
};

export default LoginForm;
