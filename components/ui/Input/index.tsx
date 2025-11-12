'use client';

import * as _ from './Input.styles';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
}

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  required = false,
  maxLength,
}: InputProps) {
  return (
    <_.InputWrapper>
      {label && <_.Label>{label}</_.Label>}
      <_.StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        maxLength={maxLength}
      />
    </_.InputWrapper>
  );
}
