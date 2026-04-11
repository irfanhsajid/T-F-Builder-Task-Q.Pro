import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import layout from "@/styles/Layout.module.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={layout.notFound}>
      <div className={layout.notFoundInner}>
        <h1 className={layout.notFoundTitle}>404</h1>
        <p className={layout.notFoundText}>Oops! Page not found</p>
        <a href="/" className={layout.notFoundLink}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
