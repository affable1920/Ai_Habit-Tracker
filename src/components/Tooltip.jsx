import React, { useEffect, useState } from "react";
import tootlipStore from "../Tooltip/store";

const Tooltip = () => {
  const { message, visible, position } = tootlipStore();
  const [pos, setPos] = useState();

  useEffect(() => {
    if (position)
      setPos((p) =>
        position.x >= window.innerWidth ? { x: position?.x - 20 } : position
      );
  }, [position, pos]);

  if (!visible) return null;
  return (
    <div style={{ left: pos?.x, top: pos?.y }} className={`tooltip ${pos}`}>
      {message}
    </div>
  );
};

export default React.memo(Tooltip);
