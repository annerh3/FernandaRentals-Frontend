import { useState, useEffect } from "react";

export const useDarkMode = (defaultValue = true) => {
    // Busca el el local si esta o si no lo pone en falso
  const [darkMode, setDarkMode] = useState(() => {
    const localMode = localStorage.getItem("darkMode");

    // 
    return localMode !== null ? JSON.parse(localMode) : defaultValue;
  });

  // Guarda el estado en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

