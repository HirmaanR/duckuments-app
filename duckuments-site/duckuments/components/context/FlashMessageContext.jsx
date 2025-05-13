"use client"

import { createContext, useContext, useState } from "react";

const FlashMessageContext = createContext();

export function FlashMessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000); // auto clear after 5s
  };

  return (
    <FlashMessageContext.Provider value={{ message, showMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
}

export function useFlashMessage() {
  return useContext(FlashMessageContext);
}
