import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";

export const capitalize = (str) => {
  if (typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Habitdetails = () => {
  const { modal, dispatch } = useContext(ModalContext);
  let habit = {};

  const unwanted = ["id", "category", "status", "archived"];
  if (modal.props) habit = modal.props.habit;

  const properties = Object.entries(habit).filter(([key, value]) => {
    if (!unwanted.includes(key)) return value ? [key, value] : [key, "N/A"];
  });

  return (
    <div className="flex flex-col gap-3">
      {properties.map(([key, value]) => (
        <div
          className="flex justify-between gap-3 items-center italic tracking-wider"
          key={key}
        >
          <span className="leading-4 btn btn__primary">{capitalize(key)}</span>
          <span className={`leading-4 ${value && "btn btn__primary"}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Habitdetails;
