import React from "react";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  height: auto;
  min-height: 100%;
  // padding-bottom = footer의 높이랑 같음.
  padding-bottom: 4rem;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
