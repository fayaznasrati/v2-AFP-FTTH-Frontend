import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useOnlineStatus } from "../utils/networkListener";
import { useEffect } from "react";
import { toast } from "react-toastify";
import NetworkListnerToast from "../components/networkListener/NetworkListner";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      toast.error("You are offline. Please check your internet connection.");
    } else {
      toast.success("You are back online.");
    }
  }, [isOnline]);

  return (
    <div className="min-h-screen xl:flex">
      {!isOnline && <NetworkListnerToast />}

      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="mx-auto p-4 md:p-6 max-w-[var(--breakpoint-2xl)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  const isOnline = useOnlineStatus();
  return (
    <div className={`${!isOnline && "border-2 border-red-500"}`}>
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
