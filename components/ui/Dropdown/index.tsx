'use client';

import { useState } from 'react';
import { colors } from '@/lib/styles/theme';
import * as _ from './Dropdown.styles';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <_.DropdownWrapper>
      <_.Label>{label}:</_.Label>
      <_.BlackBorder>
        <_.WhiteInner onClick={() => setIsOpen(!isOpen)}>
          <_.OptionText>{value}</_.OptionText>
          <_.ArrowButtonWrapper type="button">
            <_.ArrowButton>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOpen ? 'M4 11L9 6L14 11' : 'M4 7L9 12L14 7'}
                  stroke={colors.black}
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </_.ArrowButton>
          </_.ArrowButtonWrapper>
        </_.WhiteInner>
      </_.BlackBorder>
      {isOpen && (
        <_.OptionsContainer>
          <_.OptionsList>
            {options.map((option) => (
              <_.Option key={option} onClick={() => handleSelect(option)}>
                {option}
              </_.Option>
            ))}
          </_.OptionsList>
        </_.OptionsContainer>
      )}
    </_.DropdownWrapper>
  );
}
