import styled from '@emotion/styled';
import { colors, shadows } from '@/lib/styles/theme';

export const StyledWhiteboard = styled.div<{ padding?: string; gap?: string }>`
  position: relative;
  width: 100%;
  background-color: ${colors.white};
  padding: ${(props) => props.padding || '16px'};
  box-shadow: ${shadows.inset};
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || '0'};
`;
