import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "../ui-kit/NavBar";
import MenuLayout from '../ui-kit/MenuLayout'

import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";
import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from "../sc-authen/AuthenLayout";
import LoginPage from "../sc-login/LoginPage"
import SchedulePage from "../sc-schedule/SchedulePage"
import TeacherPage from "../sc-teacher/TeacherPage"
import ConfirmationPage from "../confirmation";
import ConfirmationDetailPage from "../confirmation/details";

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RoutesWrapper>
        
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route element={<MenuLayout />}>
          <Route path="/" element={<div></div>} />
          <Route path="/schedule" element={<SchedulePage/>} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/confirmation/:confirmationId" element={<ConfirmationDetailPage/>} />

        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </RoutesWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}
