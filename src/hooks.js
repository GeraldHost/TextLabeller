import { useState, useEffect } from "react";

export const useKeyPress = (targetKeys) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const [key, setKey] = useState(false);

  const downHandler = ({ key }) => {
    if (!!~targetKeys.indexOf(key)) {
      setKeyPressed(true);
      setKey(key);
    }
  };

  const upHandler = ({ key }) => {
    if (!!~targetKeys.indexOf(key)) {
      setKeyPressed(false);
      setKey(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return [keyPressed, key];
};
