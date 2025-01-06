import React, { useState } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import authService from "../services/authService";
import Form from "./common/Form";
import Input from "./common/Input";

const LoginForm = () => {
  const [error, setError] = useState("");
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
      navigate("/");
    } catch (err) {
      setError(`${err?.name}: ${err?.code}`);
    }
  };

  return (
    <Form label="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" register={register} errors={errors} label="Email" />
        <Input
          name="password"
          register={register}
          errors={errors}
          label="Password"
          type="password"
        />
        {error && (
          <div className="mt-2 text-red-600 text-sm tracking-wide text-center">
            {error}
          </div>
        )}
        <button className="btn btn__primary w-full">Login</button>
      </form>
      <Link className="form__link" to="">
        Forgot Password
      </Link>
    </Form>
  );
};

export default LoginForm;
