import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Save } from "lucide-react";
import { useFormBuilder } from "./hooks/useFormBuilder";
import FieldEditor from "./components/FieldEditor";

/**
 * Container component: manages form builder state via useFormBuilder hook.
 * Delegates field rendering to FieldEditor presentational component.
 */
const FormBuilderContainer = () => {
  const navigate = useNavigate();
  const { fields, addField, removeField, updateField, changeFieldType, save, needsOptions } = useFormBuilder();

  const handlePreview = () => {
    if (save()) navigate("/form-preview");
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Form Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => save()}>
            <Save size={16} className="mr-2" /> Save
          </Button>
          <Button onClick={handlePreview}>
            <Eye size={16} className="mr-2" /> Preview
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((field, idx) => (
          <FieldEditor
            key={field.id}
            field={field}
            index={idx}
            canRemove={fields.length > 1}
            needsOptions={needsOptions}
            onUpdate={updateField}
            onChangeType={changeFieldType}
            onRemove={removeField}
          />
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={addField}>
        <Plus size={16} className="mr-2" /> Add Field
      </Button>
    </div>
  );
};

export default FormBuilderContainer;
