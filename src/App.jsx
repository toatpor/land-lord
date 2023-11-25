import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Booking from "./pages/Booking";
import Users from "./pages/Users";
import CheckIn from "./pages/CheckIn";
import GlobalStyled from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import ProtectRoute from "./pages/ProtectRoute";
import { DarkModeProvider } from "../Context/darkModeContext";

//react query will get data and store in cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //set time from fresh data to be come stale
      //set 0 mean all data will always become stale and auto re-fetch
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyled />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cabin" element={<Cabins />} />
              <Route path="/bookings/:id" element={<Booking />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/checkin/:id" element={<CheckIn />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/account" element={<Account />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={13}
          containerStyle={{ marginTop: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              backgroundColor: "var(--color-grey-0)",
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
