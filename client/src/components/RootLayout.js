import React from "react";
import Header from "./header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/footer/Footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
