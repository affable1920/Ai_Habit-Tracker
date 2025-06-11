import React, { useContext } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import Form from "./common/Form";
import Input from "./common/Input";
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
      if (typeof ex != "string") ex = "Error creating account !";
      toast.error(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper__full">
      <div className="pad__box" />
      <div className="mid__box p-8">
        <h2 className="heading__md">Welcome</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" register={register} errors={errors} />
          <Input
            name="password"
            type="password"
            register={register}
            errors={errors}
          />
          <Input name="username" register={register} errors={errors} />
          <div className="flex flex-col gap-4">
            <button className="btn btn__accent">Register</button>
            <button
              className="btn btn__primary"
              onClick={() => navigate("/login")}
            >
              Already have an account ?
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
