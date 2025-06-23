import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const useRouteVisibility = () => {
  const location = useLocation();
  const [shouldShowNav, setShouldShowNav] = useState(true);
  const [shouldShowFooter, setShouldShowFooter] = useState(true);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const noNavRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
      "/users",
      "/dashboard/admin",
      "/dashboard/admin/users",
      "/dashboard/admin/estates",
      "/dashboard/admin/admins",
      "/dashboard/admin/emergencies",
      "/dashboard/admin/notifications",
    ];

    const noFooterRoutes = [
      "/login",
      "/register",
      "/dashboard/admin",
      "/dashboard/user",
      "/forgot-password",
      "/reset-password",
      "/dashboard/admin",
      "/dashboard/admin/users",
      "/dashboard/admin/estates",
      "/dashboard/admin/admins",
      "/dashboard/admin/emergencies",
      "/dashboard/admin/messages",
      "/dashboard/admin/notifications",
    ];

    const knownRoutes = [
      "/",
      "/about",
      "/services",
      "/contact",
      "/register",
      "/login",
      "/events",
      "/list",
      "/public-event/:slug",
      "/forgot-password",
      "/reset-password",
      "/public-event/payment/:eventId",
      "/success",
      "/payments/:clanId",
      "/verify",
      "/dashboard/user",
      "/free-event/payment/:eventId",
      "/clan/detail/:clanSlug",
      "/dashboard/admin",
      "/dashboard/admin/users",
      "/dashboard/admin/event",
    ];

    const isNoNavRoute = noNavRoutes.includes(location.pathname);
    const isNoFooterRoute = noFooterRoutes.includes(location.pathname);
    const isKnownRoute = knownRoutes.includes(location.pathname);

    setShouldShowNav(!isNoNavRoute);
    setShouldShowFooter(!isNoFooterRoute);

    setIs404(!isKnownRoute);
  }, [location]);

  return { shouldShowNav, shouldShowFooter, is404 };
};
