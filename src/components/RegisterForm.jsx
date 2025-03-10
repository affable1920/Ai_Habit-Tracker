import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import authService from "../services/authService";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";
import { toast } from "sonner";
import { LoadinStateContext } from "./Providers/AppProviders";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const { loading, dispatchLoading } = useContext(LoadinStateContext);

  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    username: Joi.string().alphanum().min(3).required().label("Username"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatchLoading(true);
    try {
      authService.register(data);
      toast.success("Successfully Registered.");

      navigate("/");
    } catch (err) {
      setError(`${err?.name}: ${err?.code}`);
    } finally {
      dispatchLoading(false);
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
          {error && (
            <div className="mt-2 text-red-600 text-sm tracking-wide text-center">
              {error}
            </div>
          )}

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
