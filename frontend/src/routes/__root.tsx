import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ToastContainer } from "react-toastify";
import type { ReactNode } from "react";


const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="flex h-screen flex-col">
    <Navbar/>
    <div className="flex-1">
      {children}
    </div>
    <ToastContainer />
    <TanStackRouterDevtools />
  </div>
);

const RootComponent = () => {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
});