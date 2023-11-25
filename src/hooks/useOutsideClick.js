import { useEffect, useRef } from "react";

export function useOutsidelick(close, bool = true) {
  // const { openName } = useContext(ModalContext);
  const ref = useRef();
  useEffect(
    function () {
      function handleToggleForm(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleToggleForm, bool);

      return () =>
        document.removeEventListener("click", handleToggleForm, bool);
    },
    [close, bool]
  );

  return { ref };
}
