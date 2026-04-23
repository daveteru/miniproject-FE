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
import Createpage from "./pages/Create-event/Createpage";
import Discover from "./pages/Discover/Discover";
import EventManager from "./pages/EventManager";
import EventManagerMyEvents from "./pages/EventManagerMyEvents";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import MyEventDetail from "./pages/MyEventDetail";
import MyEventDetailAttendees from "./pages/MyEventDetailAttendees";
import MyEventDetailEdit from "./pages/MyEventDetailEdit";
import MyEventDetailStats from "./pages/MyEventDetailStats";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Reviews from "./pages/Reviews/Reviews";
import Transaction from "./pages/Transaction/Transaction";
import Userpage from "./pages/Userpage/Userpage";
import EventManagerTransactions from "./pages/EventManagerTransactions";
import Events from "./pages/Events/Events";
import Err_404 from "./pages/Err_404";

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
        { path: "/*", element: <Err_404/>},
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
              { path: "stats", element: <MyEventDetailStats /> },
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
