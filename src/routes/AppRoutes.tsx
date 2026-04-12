import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "@/components/shared/AppLayout";
import { TodoListPageContainer } from "@/components/features/todos";
import {
  FormBuilderPageContainer,
  FormPreviewPageContainer,
} from "@/components/features/form-builder";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodoListPageContainer />} />
      <Route path="/form-builder" element={<FormBuilderPageContainer />} />
      <Route path="/form-preview" element={<FormPreviewPageContainer />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
