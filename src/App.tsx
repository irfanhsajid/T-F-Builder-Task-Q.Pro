import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes/AppRoutes";

import "./App.css";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner richColors position="top-right" />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
