import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";
import loadingStore from "../stores/loadingStore";
import authService from "../services/authService";

const RegisterForm = () => {
  const { setLoading } = loadingStore();

  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    username: Joi.string().min(3).required().label("Username"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.register(data);
      reset();

      window.location = "/";
      toast.success("Account created successfully !");
    } catch (ex) {
      toast.error(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          <button className="btn btn__primary w-full mt-2">Register</button>
          <button
            className="mt-3 btn btn__white w-full cp"
            onClick={() => navigate("/login")}
          >
            Already have an account ?
          </button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
