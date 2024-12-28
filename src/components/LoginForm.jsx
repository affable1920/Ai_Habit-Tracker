import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Form from "./common/Form";
import Input from "./common/Input";
import { Link } from "react-router-dom";
import authService from "../services/authService";

const LoginForm = () => {
  const [error, setError] = useState("");
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = (data) => {
    try {
      authService.login(data);
    } catch (err) {
      setError(err);
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
        />
        {error && <div className="mt-3 text-red-600">{error}</div>}
        <button className="btn btn__accent">Login</button>
      </form>
      <Link className="text-color__accent text-sm" to="">
        Forgot Password
      </Link>
    </Form>
  );
};

export default LoginForm;
