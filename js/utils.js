import _ from "lodash";
import { useEffect, useRef } from "react";

export function onDocumentReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

export function useInterval(fn, delay) {
  const fnRef = useRef(null);

  useEffect(() => {
    fnRef.current = fn;
    return () => (fnRef.current = null);
  }, [fn]);

  const hasFn = !_.isNil(fn);
  useEffect(() => {
    if (!hasFn) return;
    const wrappedFn = () => fnRef.current();
    const interval = setInterval(wrappedFn, delay);
    return () => clearInterval(interval);
  }, [hasFn, delay]);
}

const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState(
    colorSchemeQueryList.matches ? "dark" : "light"
  );

  useEffect(() => {
    const handleChange = (event) => {
      console.log(event);
      setColorScheme(event.matches ? "dark" : "light");
    };
    colorSchemeQueryList.addEventListener("change", handleChange);

    return () =>
      colorSchemeQueryList.removeEventListener("change", handleChange);
  }, []);

  return colorScheme;
}
