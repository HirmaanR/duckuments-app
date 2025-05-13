import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider(props) {
  const { children } = props;
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
