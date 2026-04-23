import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { RouterProvider } from "react-router/dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import { authLoader, loggedInLoader } from "./loaders/auth";
import Createpage from "./pages/event-manager/Createpage";
import Discover from "./pages/discover/Discover";
import EventManager from "./pages/event-manager/EventManager";
import EventManagerMyEvents from "./pages/event-manager/EventManagerMyEvents";
import EventManagerStats from "./pages/event-manager/EventManagerStats";
import EventManagerTransactions from "./pages/event-manager/EventManagerTransactions";
import Events from "./pages/events/Events";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import MyEventDetail from "./pages/my-event/MyEventDetail";
import MyEventDetailAttendees from "./pages/my-event/MyEventDetailAttendees";
import MyEventDetailEdit from "./pages/my-event/MyEventDetailEdit";
import Privacy from "./pages/auth/Privacy";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Reviews from "./pages/event-manager/Reviews";
import Transaction from "./pages/transaction/Transaction";
import Userpage from "./pages/user-page/Userpage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen ">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discover", element: <Discover /> },
      { path: "/events/:id", element: <Events /> },
      {
        path: "/profile",
        element: <Userpage />,
        loader: authLoader(["USER", "ORGANIZER"]),
      },
      {
        path: "/transaction",
        element: <Transaction />,
        loader: authLoader(["USER"]),
      },
      {
        path: "/privacy",
        element: <Privacy />,
        loader: authLoader(["USER", "ORGANIZER"]),
      },
      {
        path: "/event-manager",
        element: <EventManager />,
        loader: authLoader(["ORGANIZER"]),
        children: [
          { path: "my-events", element: <EventManagerMyEvents /> },
          {
            path: "my-events/:id",
            element: <MyEventDetail />,
            children: [
              { path: "edit", element: <MyEventDetailEdit /> },
              { path: "attendees", element: <MyEventDetailAttendees /> },
            ],
          },
          {
            path: "transactions",
            element: <EventManagerTransactions />,
          },
          {
            path: "create-event",
            element: <Createpage />,
          },
          { path: "stats", element: <EventManagerStats /> },
          {
            path: "reviews",
            element: <Reviews />,
            loader: authLoader(["ORGANIZER"]),
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login />, loader: loggedInLoader },
  { path: "/register", element: <Register />, loader: loggedInLoader },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
