import React from "react";
import AuthProvider from "./AuthProvider";
import MoviesProvider from "./MoviesProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";
import TvProvider from "./TvProvider";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MoviesProvider>
          <TvProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
          </TvProvider>
        </MoviesProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}