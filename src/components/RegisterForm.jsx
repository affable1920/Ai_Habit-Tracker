import React, { useState } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import authService from "../services/authService";
import Form from "./common/Form";
import Input from "./common/Input";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [error, setError] = useState("");

  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    username: Joi.string().alphanum().min(3).required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      authService.register(data);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Form label="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" label="Email" register={register} errors={errors} />
        <Input
          name="username"
          label="Username"
          register={register}
          errors={errors}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
        />
        {error && <div className="mt-3 text-red-600">{error}</div>}
        <button className="btn btn__accent">Register</button>
      </form>
      <Link
        to="/login"
        className="text-sm mt-2 text-center text-color__accent focus:outline-none focus:underline"
        href="#"
      >
        Already a User ?
      </Link>
    </Form>
  );
};

export default RegisterForm;
