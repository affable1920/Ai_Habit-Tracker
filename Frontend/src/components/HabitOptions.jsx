import React from "react";
import Button from "./Button";
import { SlOptionsVertical } from "react-icons/sl";

const HabitOptions = () => {
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setShowOptions(!showOptions)}>
        <SlOptionsVertical />
      </Button>
    </div>
  );
};

export default HabitOptions;
