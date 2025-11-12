'use client';

import { useState, useRef, useEffect } from 'react';
import { colors } from '@/lib/styles/theme';
import * as _ from './styles';
import { SearchPointDown } from '@/assets';
import { createPortal } from 'react-dom';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  // 클릭 시 드롭다운 위치 계산
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <_.DropdownWrapper ref={wrapperRef}>
      <_.Label>{label}:</_.Label>
      <_.BlackBorder>
        <_.WhiteInner onClick={() => setIsOpen(!isOpen)}>
          <_.OptionText>{value}</_.OptionText>
          <_.ArrowButtonWrapper type="button">
            <_.ArrowButton>
              <img
                src={SearchPointDown.src}
                alt="arrow"
              />
            </_.ArrowButton>
          </_.ArrowButtonWrapper>
        </_.WhiteInner>
      </_.BlackBorder>

      {isOpen &&
        createPortal(
          <_.OptionsContainer
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            <_.OptionsList>
              {options.map((option) => (
                <_.Option
                  key={option}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </_.Option>
              ))}
            </_.OptionsList>
          </_.OptionsContainer>,
          document.body,
        )}
    </_.DropdownWrapper>
  );
}
