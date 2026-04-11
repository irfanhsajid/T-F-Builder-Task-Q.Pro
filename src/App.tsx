import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./App.css";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner richColors position="top-right" />
    <div className="min-h-screen p-8 text-muted-foreground">App shell</div>
  </TooltipProvider>
);

export default App;
