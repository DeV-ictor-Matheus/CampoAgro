'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { INTERESSE_OPTIONS, interesseLabel, type InteresseValue } from '@/lib/leads/types';

type InterestPickerProps = {
  value: InteresseValue | '';
  onChange: (value: InteresseValue) => void;
};

export default function InterestPicker({ value, onChange }: InterestPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  function select(next: InteresseValue) {
    onChange(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="form-group form-interest">
      <span id={`${listboxId}-label`}>Qual o seu interesse?</span>
      <button
        type="button"
        className="form-interest-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listboxId}-label`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={value ? undefined : 'is-placeholder'}>
          {value ? interesseLabel(value) : 'Qual o seu interesse?'}
        </span>
        <span className="form-interest-chevron" aria-hidden />
      </button>

      {open ? (
        <div className="form-interest-menu" id={listboxId} role="listbox" aria-labelledby={`${listboxId}-label`}>
          {INTERESSE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={`form-interest-option${value === option.value ? ' is-selected' : ''}`}
              onClick={() => select(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
