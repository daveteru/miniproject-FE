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
      {
        path:"/",
        lazy: async () => {
          const { default: Home } = await import("./pages/Home/Home");
          return { Component: Home };
        },
      },
      {
        path: "/discover",
        lazy: async () => {
          const { default: Discover } =
            await import("./pages/Discover/Discover");
          return { Component: Discover };
        },
      },
      {
        path: "/events/:id",
        lazy: async () => {
          const { default: Events } = await import("./pages/Events/Events");
          return { Component: Events };
        },
      },
      {
        path: "/profile",
        lazy: async () => {
          const { default: Userpage } =
            await import("./pages/user-page/Userpage");
          return {
            Component: Userpage,
            loader: authLoader(["USER", "ORGANIZER"]),
          };
        },
      },
      {
        path: "/transaction",
        lazy: async () => {
          const { default: Transaction } =
            await import("./pages/Transaction/Transaction");
          return { Component: Transaction, loader: authLoader(["USER"]) };
        },
      },
      {
        path: "/privacy",
        lazy: async () => {
          const { default: Privacy } = await import("./pages/auth/Privacy");
          return {
            Component: Privacy,
            loader: authLoader(["USER", "ORGANIZER"]),
          };
        },
      },
      { path: "/*", element: <Err_404 /> },
      {
        path: "/event-manager",
        lazy: async () => {
          const { default: EventManager } =
            await import("./pages/event-manager/EventManager");
          return { Component: EventManager, loader: authLoader(["ORGANIZER"]) };
        },
        children: [
          {
            path: "my-events",
            lazy: async () => {
              const { default: EventManagerMyEvents } =
                await import("./pages/event-manager/EventManagerMyEvents");
              return { Component: EventManagerMyEvents };
            },
          },
          {
            path: "my-events/:id",
            lazy: async () => {
              const { default: MyEventDetail } =
                await import("./pages/my-event/MyEventDetail");
              return { Component: MyEventDetail };
            },
            children: [
              {
                path: "edit",
                lazy: async () => {
                  const { default: MyEventDetailEdit } =
                    await import("./pages/my-event/MyEventDetailEdit");
                  return { Component: MyEventDetailEdit };
                },
              },
              {
                path: "attendees",
                lazy: async () => {
                  const { default: MyEventDetailAttendees } =
                    await import("./pages/my-event/MyEventDetailAttendees");
                  return { Component: MyEventDetailAttendees };
                },
              },
            ],
          },
          {
            path: "transactions",
            lazy: async () => {
              const { default: EventManagerTransactions } =
                await import("./pages/event-manager/EventManagerTransactions");
              return { Component: EventManagerTransactions };
            },
          },
          {
            path: "create-event",
            lazy: async () => {
              const { default: Createpage } =
                await import("./pages/event-manager/Createpage");
              return { Component: Createpage };
            },
          },
          {
            path: "stats",
            lazy: async () => {
              const { default: EventManagerStats } =
                await import("./pages/event-manager/EventManagerStats");
              return { Component: EventManagerStats };
            },
          },
          {
            path: "reviews",
            lazy: async () => {
              const { default: Reviews } =
                await import("./pages/event-manager/Reviews");
              return { Component: Reviews, loader: authLoader(["ORGANIZER"]) };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: Login } = await import("./pages/auth/Login");
      return { Component: Login, loader: loggedInLoader };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: Register } = await import("./pages/auth/Register");
      return { Component: Register, loader: loggedInLoader };
    },
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const { default: ForgotPassword } =
        await import("./pages/auth/ForgotPassword");
      return { Component: ForgotPassword };
    },
  },
  {
    path: "/reset-password/:token",
    lazy: async () => {
      const { default: ResetPassword } =
        await import("./pages/auth/ResetPassword");
      return { Component: ResetPassword };
    },
  },
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
