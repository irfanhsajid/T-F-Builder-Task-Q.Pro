import { useNavigate } from "react-router-dom";
import { Plus, Eye, Save } from "lucide-react";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import FieldEditor from "@/components/features/form-builder/FieldEditor";
import styles from "@/styles/FormBuilder.module.css";

const FormBuilderPageContainer = () => {
  const navigate = useNavigate();
  const {
    fields,
    addField,
    removeField,
    updateField,
    changeFieldType,
    save,
    needsOptions,
  } = useFormBuilder();

  const handlePreview = () => {
    if (save()) navigate("/form-preview");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Form Builder</h1>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => save()}
          >
            <Save size={16} /> Save Form
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePreview}
          >
            <Eye size={16} />
            Save & Preview
          </button>
        </div>
      </div>

      <div className={styles.fieldList}>
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

      <button
        type="button"
        className={`${styles.btn} ${styles.btnOutline} ${styles.addFieldBtn}`}
        onClick={addField}
      >
        <Plus size={16} /> Add Another Field
      </button>
    </div>
  );
};

export default FormBuilderPageContainer;
