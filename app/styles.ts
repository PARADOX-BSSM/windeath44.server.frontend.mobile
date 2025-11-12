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
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MainTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 32px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

export const Version = styled.p`
  font-family: ${fonts.primary};
  font-size: 18px;
  color: ${colors.black};
  margin: 0;
  width: fit-content;
  line-height: normal;
`;

export const ScrollableSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
  justify-content: center;
`;

export const DescriptionText = styled.div`
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  line-height: normal;
  width: 100%;

  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActionsSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  justify-content: center;
`;

export const TodaySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TodayText = styled.p`
  font-family: ${fonts.primary};
  font-size: 20px;
  text-align: center;
  color: ${colors.black};
  margin: 0;
  padding: 24px;
  line-height: normal;
`;

export const SectionTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 20px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;
