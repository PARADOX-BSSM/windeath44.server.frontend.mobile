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

export const ContentInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 15px 16px 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
`;

export const SearchSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

export const ResultSection = styled.div`
  flex: 1;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

export const FilterBox = styled.div`
  width: 100%;
  background-color: ${colors.lightprimary};
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow:
    inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};
`;

export const ResultsContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: #ffeefd;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
`;

export const ResultsList = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const PageButton = styled.button<{ selected?: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${colors.lightprimary};
  border: none;
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.selected
      ? `inset -1px -1px 0px 0px ${colors.black}, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px ${colors.darkprimary}, inset 2px 2px 0px 0px ${colors.secondary}`
      : `inset -1px -1px 0px 0px #ffffff, inset 1px 1px 0px 0px ${colors.black}, inset -2px -2px 0px 0px ${colors.secondary}, inset 2px 2px 0px 0px ${colors.darkprimary}`};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageDots = styled.span`
  font-family: ${fonts.primary};
  font-size: 16.5px;
  color: #7c547b;
`;

export const Statusbar = styled.div`
  width: 100%;
  height: auto;
  background-color: ${colors.darkprimary};
  padding: 2px 4.5px;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow:
    inset -1.5px -1.5px 0px 0px #ffffff,
    inset 1.5px 1.5px 0px 0px #808080;
`;

export const StatusContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5px;
`;

export const StatusIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const StatusText = styled.p`
  font-family: ${fonts.primary};
  font-size: 16.5px;
  line-height: 15px;
  color: ${colors.black};
`;

export const DragIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 19.5px;
  height: 19.5px;

  img {
    width: 100%;
    height: 100%;
  }
`;
