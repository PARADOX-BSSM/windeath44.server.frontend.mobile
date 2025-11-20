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
  overflow: hidden;
`;

export const ContentInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 6px;
  display: flex;
  overflow: hidden;
`;

export const ScrollableArea = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  box-shadow:
    inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
  display: flex;
  overflow: hidden;
`;

export const ScrollContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 16px;
  min-height: 0;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.secondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.lightprimary};
    box-shadow:
      inset -1px -1px 0px 0px ${colors.black},
      inset 1px 1px 0px 0px #ffffff,
      inset -2px -2px 0px 0px ${colors.darkprimary},
      inset 2px 2px 0px 0px ${colors.secondary};
  }

  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    height: 27px;
    background: ${colors.lightprimary};
    display: block;
  }
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const Title = styled.h1`
  font-family: ${fonts.primary};
  font-size: 32px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

export const Subtitle = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;
`;

export const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

export const Ribbon = styled.img`
  position: absolute;
  top: 0;
  width: 194px;
  z-index: 1;
  pointer-events: none;
`;

export const Picture = styled.div<{ imgUrl?: string }>`
  width: 194px;
  height: 237.229px;
  border: 18px solid ${colors.black};
  background: ${colors.white};
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const CharacterName = styled.p`
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  text-align: center;
  margin: 0;
  line-height: normal;
`;

export const InformationTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.stroke};
  gap: -1px;
`;

export const TableRow = styled.div`
  width: 100%;
  display: flex;
  gap: -1px;
  margin-bottom: -1px;
`;

export const TableLabel = styled.div`
  width: 100px;
  padding: 4px;
  background-color: ${colors.lightprimary};
  border: 1px solid ${colors.stroke};
  font-family: ${fonts.primary};
  font-size: 14px;
  color: #fd51a7;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  flex-shrink: 0;
`;

export const TableValue = styled.div`
  flex: 1;
  padding: 4px;
  border: 1px solid ${colors.stroke};
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
`;

export const QuoteSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Quote = styled.h2`
  position: relative;
  height: fit-content;
  align-self: stretch;
  color: #4a4a4a;
  font-family: 'Galmuri11', serif;
  font-size: 28px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.5;
  background-color: #f0f0f0;
  padding: 30px 40px;
  border-left: 5px solid #e774dd;
  border-radius: 5px;
  margin: 10px 0;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 5px;
    font-size: 40px;
    color: #e774dd;
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -10px;
    font-size: 40px;
    color: #e774dd;
  }
`;

export const IndexContainer = styled.div`
  border: 1px solid ${colors.stroke};
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const IndexTitle = styled.p`
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

export const IndexList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px;
`;

export const IndexItem = styled.p`
  font-family: ${fonts.primary};
  font-size: 20px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;

  span.number {
    color: ${colors.stroke};
  }
`;

export const BowButton = styled.button`
  width: 260px;
  height: 60px;
  background-color: ${colors.lightprimary};
  border: none;
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  box-shadow:
    inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:active {
    box-shadow:
      inset 1px 1px 0px 0px ${colors.black},
      inset -1px -1px 0px 0px #ffffff,
      inset 2px 2px 0px 0px ${colors.darkprimary},
      inset -2px -2px 0px 0px ${colors.secondary};
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
`;

export const CommentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionTitle = styled.p`
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

export const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

export const CommentsInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(0, 0, 0, 0.2);
  padding: 1px 0;
`;

export const CommentInputContainer = styled.div`
  width: 100%;
  background: #ffebfd;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentForm = styled.form`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const CommentInput = styled.input`
  flex: 1;
  font-family: ${fonts.primary};
  font-size: 12px;
  background: transparent;
  border: none;
  outline: none;
  color: ${colors.black};

  &::placeholder {
    color: ${colors.darkprimary};
  }
`;

export const CharCount = styled.span`
  font-family: ${fonts.primary};
  font-size: 10px;
  color: ${colors.darkprimary};
  white-space: nowrap;
`;

export const CommentItem = styled.div<{ $isReply?: boolean }>`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: #fff;
  ${(props) =>
    props.$isReply &&
    `
        padding-left: 58px;
        background: #f9f9f9;
    `}
`;

export const ProfileImg = styled.div<{ imgUrl?: string }>`
  width: 48px;
  height: 48px;
  background-image: ${(props) => (props.imgUrl ? `url(${props.imgUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.imgUrl ? 'transparent' : colors.lightprimary)};
  border: ${(props) => (props.imgUrl ? 'none' : `1px solid ${colors.stroke}`)};
  flex-shrink: 0;
`;

export const TextBox = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const NickNameContainer = styled.div`
  display: flex;
  padding: 6px 0px;
  align-items: flex-end;
  gap: 8px;
`;

export const NickName = styled.p`
  color: #9a5a95;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const CommentUser = styled.p`
  color: var(--DarkPrimary, #dcafdd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const CommentText = styled.p`
  color: var(--Black, #2e2e2e);
  font-family: ${fonts.primary};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  width: 100%;
  margin: 0;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 4px;
  justify-content: space-between;
  width: 100%;
`;

export const LikeButton = styled.button<{ $isLiked?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.$isLiked ? 'var(--off, #fd51a7)' : 'var(--Stroke, #e774dd)')};
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 4px 0 0 0;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: ${colors.white};
  border: none;
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.stroke};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ArticleSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ArticleContent = styled.div`
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: ${fonts.primary};
  font-size: 20px;
  color: ${colors.black};
  line-height: 1.6;

  p {
    margin: 0;
  }

  h2 {
    margin: 32px 0 16px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
