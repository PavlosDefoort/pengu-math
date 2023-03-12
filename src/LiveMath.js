import "mathlive";
import { useCallback, useState, useLayoutEffect, useRef } from "react";
import React from "react";
import "@cortex-js/compute-engine";
import { ComputeEngine } from "@cortex-js/compute-engine";

const MathLiveKeyboard = ({ mathData, setMathData, setModal, onSubmit }) => {
  const [value, setValue] = useState(mathData);
  const ref = useRef();
  const id = Math.random().toString(36).substring(2, 8);
  const ce = new ComputeEngine();

  const handleInput = useCallback(
    (event) => {
      const someValue = ce.parse(event.target.value).N().valueOf();
      setValue(someValue);
      setMathData(someValue); // update the mathData state
    },
    [ce, setMathData]
  );

  const handleSubmit = useCallback(() => {
    setMathData(value);
    setModal(false);
    onSubmit(value);
  }, [setMathData, setModal, onSubmit, value]);

  useLayoutEffect(() => {
    const options = {
      virtualKeyboardMode: "manual",
      virtualKeyboardLayout: "dvorak",
      virtualKeyboardContainer: document.getElementById("modal")
        ? document.getElementById("modal")
        : document.body,
    };
    const mathField = document.getElementById(id);
    if (mathField) {
      mathField.setOptions(options);
    }
  }, [id]);

  const Keyboard = (props) => {
    const handleSubmit = useCallback(() => {
      props.onSubmit(value);
      setModal(false);
    }, [props.onSubmit, value]);

    // ...
  };

  return (
    <div>
      <div className="p-3">
        <math-field
          ref={ref}
          onInput={handleInput}
          id={id}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "Enter") {
              handleSubmit();
            }
          }}
        ></math-field>
      </div>
    </div>
  );
};

export default React.memo(MathLiveKeyboard);
