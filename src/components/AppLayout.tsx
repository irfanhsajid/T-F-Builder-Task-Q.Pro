import { NavLink, Outlet } from "react-router-dom";
import { CheckSquare, PenTool, Eye } from "lucide-react";

const navItems = [
  { to: "/todos", label: "Todos", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: PenTool },
  { to: "/form-preview", label: "Form Preview", icon: Eye },
];

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <span className="text-lg font-bold text-foreground tracking-tight">
            Q Pro - Assessment
          </span>
          <div className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
