import React, { useState } from "react";
import { Link } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import authService from "../services/authService";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      setError(`${err?.name}: ${err?.code}`);
    }
  };

  return (
    <Form label="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputAdd
          name="email"
          label="Email"
          register={register}
          errors={errors}
        />
        <InputAdd
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
        />
        <InputAdd
          name="username"
          label="Username"
          register={register}
          errors={errors}
        />
        {error && (
          <div className="mt-2 text-red-600 text-sm tracking-wide text-center">
            {error}
          </div>
        )}

        <button className="btn btn__primary w-full">Register</button>
        <Link to="/login" className="form__link">
          Already a User ?
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
