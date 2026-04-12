import { ArrowLeft, Terminal } from "lucide-react";
import styles from "@/styles/FormBuilder.module.css";

export interface FormSubmitResultProps {
  data: Record<string, string | boolean>;
  onBackToBuilder: () => void;
}

const FormSubmitResult = ({ data, onBackToBuilder }: FormSubmitResultProps) => {
  const json = JSON.stringify(data, null, 2);

  return (
    <div className={styles.submitResult}>
      <div className={styles.submitResultHeader}>
        <h2 className={styles.submitResultTitle}>Submission received</h2>
        <p className={styles.submitResultHint}>
          <Terminal
            size={16}
            className={styles.submitResultHintIcon}
            aria-hidden
          />
          The full payload is printed in your browser’s developer console as
          well. Open DevTools to view the same output.
        </p>
      </div>

      <div className={styles.submitResultBody}>
        <span className={styles.submitResultLabel}>Submitted data</span>
        <pre className={styles.submitResultPre} tabIndex={0}>
          {json}
        </pre>
      </div>

      <div className={styles.submitResultActions}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onBackToBuilder}
        >
          <ArrowLeft size={16} /> Back to Form Builder
        </button>
      </div>
    </div>
  );
};

export default FormSubmitResult;
