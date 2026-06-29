import type React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { ROUTES } from "./AppRouter.routes";

export const AppRouter = (): React.ReactElement => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN.ROUTE} element={<MainPage />} />
      </Routes>
    </>
  );
};
