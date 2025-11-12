import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WindowContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  border: 2.572px solid ${colors.primary};
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 8.572px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.lightprimary};
  border: 2.572px solid ${colors.stroke};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LogoSection = styled.div`
  background-color: white;
  width: 100%;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffeefd;
  border: 2px solid ${colors.secondary};
  flex-shrink: 0;
`;

export const FormSection = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

export const FormFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 8px;
`;
