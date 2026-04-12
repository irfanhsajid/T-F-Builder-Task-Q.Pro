import { Link, NavLink, Outlet } from "react-router-dom";
import { CheckSquare, PenTool, Eye } from "lucide-react";
import layout from "@/styles/Layout.module.css";

const navItems = [
  { to: "/todos", label: "Todos", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: PenTool },
  { to: "/form-preview", label: "Form Preview", icon: Eye },
];

const AppLayout = () => {
  return (
    <div className={layout.shell}>
      <nav className={layout.nav}>
        <div className={layout.navInner}>
          <Link to="/todos">
            <span className={layout.brand}>Q Pro - Assessment</span>
          </Link>
          <div className={layout.navLinks}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? `${layout.navLink} ${layout.navLinkActive}`
                    : layout.navLink
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className={layout.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
