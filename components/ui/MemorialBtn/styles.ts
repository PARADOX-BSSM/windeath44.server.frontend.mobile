import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

export const Btn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.black};
  border: none;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  cursor: pointer;
`;

export const SelectedBtn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px #fff inset, 1px 1px 0px 0px ${colors.black} inset,
    -2px -2px 0px 0px ${colors.secondary} inset, 2px 2px 0px 0px ${colors.darkprimary} inset;
  color: ${colors.black};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;

export const SubmitDefault = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.darkprimary};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;

export const SubmitActive = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.black};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
  display: flex;
`;

export const HiddenBtn = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '64px'};
  height: ${({ height }) => height || '64px'};
`;
