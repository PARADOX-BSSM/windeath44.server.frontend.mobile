import styled from '@emotion/styled';
import { colors, fonts, shadows } from '@/lib/styles/theme';

export const Container = styled.div`
  width: 100%;
  background-color: ${colors.white};
  position: relative;
  box-shadow: ${shadows.inset};
  overflow: hidden;
`;

export const ItemsWrapper = styled.div`
  width: 100%;
  background-color: ${colors.gray};
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const RankItem = styled.div<{ isFirst?: boolean }>`
  width: 100%;
  background-color: ${colors.white};
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: ${(props) => (props.isFirst ? 'center' : 'flex-start')};
`;

export const RankNumberWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
`;

export const RankNumber = styled.p`
  font-family: 'Galmuri11Bold', ${fonts.primary};
  font-weight: bold;
  font-size: 18px;
  color: ${colors.stroke};
  margin: 0;
  line-height: normal;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

export const CharacterName = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.darkdark};
  white-space: nowrap;
  margin: 0;
  line-height: normal;
`;

export const BowCount = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  white-space: nowrap;
  margin: 0;
  line-height: normal;
`;
