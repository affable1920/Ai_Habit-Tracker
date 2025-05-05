import React, { useContext } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import Form from "./common/Form";
import InputAdd from "./common/InputAdd";
import loadingStore from "../stores/loadingStore";
import AuthContext from "../context/AuthContext";

const RegisterForm = () => {
  const { setLoading } = loadingStore();
  const { register: userRegister } = useContext(AuthContext);

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
      await userRegister(data);
      reset();

      navigate("/");
      toast.success("Account created successfully !");
    } catch (ex) {
      const { msg } = ex[0] || "Error creating account !";
      toast.error(msg.toUpperCase());
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
