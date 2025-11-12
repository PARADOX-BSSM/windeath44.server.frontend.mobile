import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 33.441px;
  background-color: ${colors.lightprimary};
  border: 2.572px solid ${colors.stroke};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.572px 7.717px;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoIcon = styled.div`
  width: 23.625px;
  height: 20.25px;
  position: relative;

  img {
    display: block;
    max-width: none;
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.p`
  font-family: ${fonts.title};
  font-size: 25.723px;
  color: ${colors.stroke};
  white-space: nowrap;
  line-height: normal;
  margin: 0;
`;

export const WindowButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 7.714px;
`;

export const WindowBtn = styled.button`
  width: 25.724px;
  height: 25.724px;
  border: 1px solid ${colors.stroke};
  background-color: transparent;
  position: relative;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
