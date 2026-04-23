import { Outlet } from "react-router";
import EventManagerSidebar from "../../components/event-manager/EventManagerSidebar";

export default function EventManager() {
  return (
    <div className="w-full flex min-h-screen">
      <EventManagerSidebar />
      <div className="flex-1 flex overflow-y-auto bg-neutral-100">
        <Outlet />
      </div>
    </div>
  );
}
