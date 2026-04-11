import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { TodoListContainer } from "@/features/todos";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodoListContainer />} />
      <Route path="/form-builder" element={<div className="text-muted-foreground">Form builder coming soon</div>} />
      <Route path="/form-preview" element={<div className="text-muted-foreground">Form preview coming soon</div>} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
