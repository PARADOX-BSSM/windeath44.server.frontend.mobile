import styled from '@emotion/styled';
import { colors, shadows, fonts } from '@/lib/styles/theme';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  line-height: normal;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  background-color: ${colors.white};
  border: none;
  padding: 0 8px;
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  box-shadow: ${shadows.inset};
  outline: none;

  &::placeholder {
    color: #999;
  }
`;
