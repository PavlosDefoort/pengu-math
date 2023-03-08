import { useEffect, useRef } from "react";

export default function DesmosCalculator() {
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (calculatorRef.current) {
      const calculator = window.Desmos.GraphingCalculator(
        calculatorRef.current
      );
      // Use the calculator object here...
    }
  }, []);

  return <div ref={calculatorRef} />;
}
