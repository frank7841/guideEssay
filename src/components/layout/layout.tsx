import React, { Fragment } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
export default function Layout(props: any) {
  return (
    <Fragment>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}
