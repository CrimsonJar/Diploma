// components/MainContent.js

import React from "react";
import TopSales from "./TopSales";
import Catalog from "./Catalog";
import { useSelector } from "react-redux";

function MainContent() {
  const showTopSales = useSelector((state) => state.items.showTopSales);

  return (
    <>
      {showTopSales && <TopSales />}
      <Catalog />
    </>
  );
}

export default MainContent;
