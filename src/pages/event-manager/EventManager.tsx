import { Outlet } from "react-router";
import EventManagerSidebar from "../../components/event-manager/EventManagerSidebar";
import { useState } from "react";

export default function EventManager() {
  const [burger, setBurger] = useState(false);
  return (
    <div className="w-full flex min-h-screen">
      <EventManagerSidebar burger={burger} setBurger={setBurger} />
      <div className="flex-1 flex-col overflow-y-auto bg-neutral-100">
        <div className="px-9  pt-5">
          <button
            onClick={() => setBurger(true)}
            className="md:hidden px-2 py-1  bg-amber-300 w-fit rounded-full text-sm mb-2"
          >
            SIDE MENU
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
