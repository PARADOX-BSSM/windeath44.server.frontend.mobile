import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

export const ItemContainer = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid ${colors.lightprimary};
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #fef7fe;
  }
`;

export const ImageWrapper = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightprimary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 6px;
  flex: 1;
`;

export const CharacterName = styled.div`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: #9a5a95;
  line-height: normal;
`;

export const MetaInfo = styled.p`
  font-family: ${fonts.primary};
  font-size: 10px;
  line-height: normal;
  color: ${colors.stroke};

  .separator {
    color: #7c547b;
  }

  .genres {
    color: #ca91b9;
  }
`;
