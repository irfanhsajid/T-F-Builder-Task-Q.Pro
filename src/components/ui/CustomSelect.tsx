"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import styles from "../../styles/CustomSelect.module.css";

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
  placement?: "auto" | "below" | "above";
}

const isGroup = (item: SelectOption | SelectGroup): item is SelectGroup =>
  "options" in item;
const flatOptions = (options: (SelectOption | SelectGroup)[]): SelectOption[] =>
  options.flatMap((o) => (isGroup(o) ? o.options : [o]));

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
  placement = "below",
}: CustomSelectProps) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const value = isControlled ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [autoPlacement, setAutoPlacement] = useState<"below" | "above">(
    "below",
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allFlat = flatOptions(options);
  const selectedOption = allFlat.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || placement !== "auto" || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const estHeight = Math.min(260, allFlat.length * 36 + 16);
    const spaceBelow = window.innerHeight - rect.bottom - 18;
    const spaceAbove = rect.top - 18;
    setAutoPlacement(
      spaceBelow >= estHeight || spaceBelow >= spaceAbove ? "below" : "above",
    );
  }, [open, placement, allFlat.length]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const handleOpen = () => {
    if (disabled) return;
    const idx = allFlat.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const selectOption = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const enabledFlat = allFlat.filter((o) => !o.disabled);

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev + 1;
          while (next < allFlat.length && allFlat[next].disabled) next++;
          return next < allFlat.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && allFlat[next].disabled) next--;
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0 && !allFlat[activeIndex].disabled)
          selectOption(allFlat[activeIndex]);
        break;
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
  };

  const effectivePlacement =
    placement === "above"
      ? "above"
      : placement === "below"
        ? "below"
        : autoPlacement;
  let flatIndex = -1;

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
          aria-controls={`${id}-listbox`}
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
          <ChevronDown
            className={[styles.chevron, open && styles.chevronOpen]
              .filter(Boolean)
              .join(" ")}
            size={16}
            aria-hidden
          />
        </button>

        {open && (
          <ul
            id={`${id}-listbox`}
            ref={listRef}
            role="listbox"
            aria-label={label}
            className={[
              styles.listbox,
              effectivePlacement === "above" && styles.listboxAbove,
            ]
              .filter(Boolean)
              .join(" ")}
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
// select option item component
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
        e.preventDefault();
        onSelect(option);
      }}
      onMouseEnter={!option.disabled ? onHover : undefined}
    >
      {option.label}
      <Check
        className={styles.checkIcon}
        size={16}
        style={{ opacity: selected ? 1 : 0, marginLeft: "auto" }}
      />
    </li>
  );
}
