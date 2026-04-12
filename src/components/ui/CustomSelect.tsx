"use client";

import { useState, useRef, useEffect, useId, KeyboardEvent } from "react";
import styles from "../../styles/CustomSelect.module.css";
import { Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface CustomSelectProps {
  options: (SelectOption | SelectGroup)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
}

function isGroup(item: SelectOption | SelectGroup): item is SelectGroup {
  return "options" in item;
}

function flatOptions(options: (SelectOption | SelectGroup)[]): SelectOption[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

export default function CustomSelect({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Select an option…",
  disabled = false,
  label,
  hint,
  error,
  className,
}: CustomSelectProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const value = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allFlat = flatOptions(options);
  const selectedOption = allFlat.find((o) => o.value === value);

  /* ── close on outside click ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ── scroll active item into view ── */
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  /* ── sync activeIndex when opening ── */
  function handleOpen() {
    if (disabled) return;
    const idx = allFlat.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    /* Blur so :focus doesn’t keep the “active” ring like a text field would after leaving */
    triggerRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const enabledFlat = allFlat.filter((o) => !o.disabled);

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev + 1;
          while (next < allFlat.length && allFlat[next].disabled) next++;
          return next < allFlat.length ? next : prev;
        });
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && allFlat[next].disabled) next--;
          return next >= 0 ? next : prev;
        });
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (activeIndex >= 0 && !allFlat[activeIndex].disabled) {
          selectOption(allFlat[activeIndex]);
        }
        break;
      }
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(
          enabledFlat.length ? allFlat.indexOf(enabledFlat[0]) : -1,
        );
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(
          enabledFlat.length
            ? allFlat.indexOf(enabledFlat[enabledFlat.length - 1])
            : -1,
        );
        break;
    }
  }

  /* ── render ── */
  let flatIndex = -1; // tracks absolute index across groups

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.field}>
        <button
          id={id}
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined
          }
          aria-invalid={!!error}
          disabled={disabled}
          className={[
            styles.trigger,
            open && styles.triggerOpen,
            error && styles.triggerError,
            !selectedOption && styles.triggerPlaceholder,
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => (open ? setOpen(false) : handleOpen())}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.triggerText}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <ul
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-label={label}
            className={styles.listbox}
          >
            {options.map((item, groupIdx) => {
              if (isGroup(item)) {
                return (
                  <li key={groupIdx} role="none">
                    <div className={styles.groupLabel}>{item.label}</div>
                    <ul role="group" aria-label={item.label}>
                      {item.options.map((opt) => {
                        flatIndex++;
                        const idx = flatIndex;
                        return (
                          <OptionItem
                            key={opt.value}
                            id={`${id}-opt-${idx}`}
                            option={opt}
                            selected={opt.value === value}
                            active={activeIndex === idx}
                            dataIndex={idx}
                            onSelect={selectOption}
                            onHover={() => setActiveIndex(idx)}
                          />
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              flatIndex++;
              const idx = flatIndex;
              return (
                <OptionItem
                  key={item.value}
                  id={`${id}-opt-${idx}`}
                  option={item}
                  selected={item.value === value}
                  active={activeIndex === idx}
                  dataIndex={idx}
                  onSelect={selectOption}
                  onHover={() => setActiveIndex(idx)}
                />
              );
            })}
          </ul>
        )}
      </div>

      {(hint || error) && (
        <p
          className={[styles.hint, error && styles.hintError]
            .filter(Boolean)
            .join(" ")}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

/* ─── sub-components ─────────────────────────────────────────── */

function OptionItem({
  id,
  option,
  selected,
  active,
  dataIndex,
  onSelect,
  onHover,
}: {
  id: string;
  option: SelectOption;
  selected: boolean;
  active: boolean;
  dataIndex: number;
  onSelect: (o: SelectOption) => void;
  onHover: () => void;
}) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      data-index={dataIndex}
      className={[
        styles.option,
        selected && styles.optionSelected,
        active && styles.optionActive,
        option.disabled && styles.optionDisabled,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseDown={(e) => {
        e.preventDefault(); // keep focus on trigger
        onSelect(option);
      }}
      onMouseEnter={!option.disabled ? onHover : undefined}
    >
      {option.label}
      <CheckIcon visible={selected} />
    </li>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={[styles.chevron, open && styles.chevronOpen]
        .filter(Boolean)
        .join(" ")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <Check
      className={styles.checkIcon}
      size={16}
      style={{ opacity: visible ? 1 : 0, marginLeft: "auto" }}
    />
  );
}
