'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import { getMemorial, MemorialData } from '@/lib/api/memorialGet';
import { getCharacter, CharacterData } from '@/lib/api/character';
import { getAnimation } from '@/lib/api/animation';
import { getMemorialComments, MemorialComment } from '@/lib/api/memorialComments';
import { parseMemorialContent, extractTableOfContents } from '@/lib/utils/parseMemorialContent';
import { MemorialRibbon } from '@/assets';
import * as _ from './styles';

export default function MemorialPage() {
  const router = useRouter();
  const params = useParams();
  const memorialId = params?.id as string;

  const [memorialData, setMemorialData] = useState<MemorialData | null>(null);
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [animeName, setAnimeName] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<string[]>([]);
  const [comments, setComments] = useState<MemorialComment[]>([]);
  const [hasNextComment, setHasNextComment] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!memorialId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch memorial data
        const memorialResponse = await getMemorial(Number(memorialId));
        setMemorialData(memorialResponse.data);

        // Extract table of contents from memorial content
        const toc = extractTableOfContents(memorialResponse.data.content);
        setTableOfContents(toc);

        // Fetch character data
        const characterResponse = await getCharacter(memorialResponse.data.characterId);
        setCharacterData(characterResponse.data);

        // Fetch anime name
        const animeResponse = await getAnimation(characterResponse.data.animeId);
        setAnimeName(animeResponse.data.name);

        // Fetch comments
        const commentsResponse = await getMemorialComments({
          memorialId: Number(memorialId),
          size: 10,
        });
        setComments(commentsResponse.data.data);
        setHasNextComment(commentsResponse.data.hasNext);

        // Get current user info (optional - for edit/delete permissions)
        try {
          const { getAccessToken } = await import('@/lib/api/auth');
          const token = getAccessToken();
          if (token) {
            // TODO: Implement getCurrentUser API call
            // For now, set to null
            setCurrentUserId(null);
          }
        } catch (err) {
          console.log('User not logged in');
        }
      } catch (err) {
        console.error('Error fetching memorial data:', err);
        setError('추모관 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memorialId]);

  const handleLoadMoreComments = async () => {
    if (comments.length === 0) return;
    const lastCommentId = comments[comments.length - 1].commentId;

    try {
      const commentsResponse = await getMemorialComments({
        memorialId: Number(memorialId),
        cursorId: lastCommentId,
        size: 10,
      });
      setComments((prev) => [...prev, ...commentsResponse.data.data]);
      setHasNextComment(commentsResponse.data.hasNext);
    } catch (err) {
      console.error('Error loading more comments:', err);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    // TODO: Implement comment submission
    console.log('Submit comment:', commentContent);
    setCommentContent('');
  };

  const handleBowClick = () => {
    router.push(`/bow/${memorialId}`);
  };

  if (isLoading) {
    return (
      <_.Container>
        <_.WindowContainer>
          <_.ContentWrapper>
            <WindowHeader />
            <_.MainContent>
              <_.ContentInner>
                <_.ScrollableArea>
                  <_.LoadingContainer>불러오는 중...</_.LoadingContainer>
                </_.ScrollableArea>
              </_.ContentInner>
            </_.MainContent>
          </_.ContentWrapper>
        </_.WindowContainer>
      </_.Container>
    );
  }

  if (error || !memorialData || !characterData) {
    return (
      <_.Container>
        <_.WindowContainer>
          <_.ContentWrapper>
            <WindowHeader />
            <_.MainContent>
              <_.ContentInner>
                <_.ScrollableArea>
                  <_.LoadingContainer>{error || '추모관을 찾을 수 없습니다.'}</_.LoadingContainer>
                </_.ScrollableArea>
              </_.ContentInner>
            </_.MainContent>
          </_.ContentWrapper>
        </_.WindowContainer>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.WindowContainer>
        <_.ContentWrapper>
          <WindowHeader />
          <_.MainContent>
            <_.ContentInner>
              <_.ScrollableArea>
                <_.ScrollContent>
                  <_.Section>
                    <_.Header>
                      <_.TextContainer>
                        <_.Title>{characterData.name}</_.Title>
                        <_.Subtitle>최근 수정: {memorialData.updatedAt}</_.Subtitle>
                      </_.TextContainer>
                    </_.Header>

                    <_.ContentContainer>
                      <_.ProfileSection>
                        <_.PictureContainer>
                          <_.Ribbon
                            src={MemorialRibbon.src}
                            alt="ribbon"
                          />
                          <_.Picture imgUrl={characterData.imageUrl} />
                          <_.CharacterName>{characterData.name}</_.CharacterName>
                        </_.PictureContainer>

                        <_.InformationTable>
                          <_.TableRow>
                            <_.TableLabel>나이</_.TableLabel>
                            <_.TableValue>향년 {characterData.age}세</_.TableValue>
                          </_.TableRow>
                          <_.TableRow>
                            <_.TableLabel>사망 날짜</_.TableLabel>
                            <_.TableValue>{characterData.deathOfDay}</_.TableValue>
                          </_.TableRow>
                          <_.TableRow>
                            <_.TableLabel>사인</_.TableLabel>
                            <_.TableValue>{characterData.deathReason}</_.TableValue>
                          </_.TableRow>
                          <_.TableRow>
                            <_.TableLabel>상세 사인</_.TableLabel>
                            <_.TableValue>{characterData.causeOfDeathDetails || '-'}</_.TableValue>
                          </_.TableRow>
                          <_.TableRow>
                            <_.TableLabel>애니메이션</_.TableLabel>
                            <_.TableValue>{animeName}</_.TableValue>
                          </_.TableRow>
                        </_.InformationTable>
                      </_.ProfileSection>

                      <_.QuoteSection>
                        <_.Quote>{characterData.saying}</_.Quote>
                        <_.IndexContainer>
                          <_.IndexTitle>목차</_.IndexTitle>
                          <_.IndexList>
                            {tableOfContents.map((item, idx) => (
                              <_.IndexItem key={idx}>
                                <span className="number">{idx + 1}.</span> {item}
                              </_.IndexItem>
                            ))}
                          </_.IndexList>
                        </_.IndexContainer>
                      </_.QuoteSection>
                    </_.ContentContainer>
                  </_.Section>

                  <_.BowButton onClick={handleBowClick}>절 하러가기</_.BowButton>

                  <_.CommentSection>
                    <_.SectionTitle>추모글</_.SectionTitle>
                    <_.CommentsContainer>
                      <_.CommentsInner>
                        <_.CommentInputContainer>
                          <_.CommentForm onSubmit={handleCommentSubmit}>
                            <_.CommentInput
                              type="text"
                              value={commentContent}
                              onChange={(e) => setCommentContent(e.target.value)}
                              placeholder="추모글을 입력하세요."
                              maxLength={250}
                            />
                            <_.CharCount>{commentContent.length}/250</_.CharCount>
                          </_.CommentForm>
                        </_.CommentInputContainer>

                        {comments.map((comment) => {
                          const isOwner = currentUserId === comment.userId;
                          return (
                            <div key={comment.commentId}>
                              <_.CommentItem>
                                <_.ProfileImg imgUrl={comment.profileImageUrl} />
                                <_.TextBox>
                                  <_.NickNameContainer>
                                    <_.CommentUser>@{comment.userId}</_.CommentUser>
                                  </_.NickNameContainer>
                                  <_.CommentText>{comment.content}</_.CommentText>
                                  <_.ActionButtonGroup>
                                    <div
                                      style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                                    >
                                      <_.LikeButton $isLiked={comment.isLiked}>
                                        {comment.isLiked ? '♥' : '♡'} {comment.likes}
                                      </_.LikeButton>
                                      <_.ReplyButton>답글 입력</_.ReplyButton>
                                    </div>
                                    {isOwner && (
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <_.EditButton>수정</_.EditButton>
                                        <_.DeleteButton>삭제</_.DeleteButton>
                                      </div>
                                    )}
                                  </_.ActionButtonGroup>
                                </_.TextBox>
                              </_.CommentItem>
                              {comment.children?.map((child) => {
                                const isChildOwner = currentUserId === child.userId;
                                return (
                                  <_.CommentItem
                                    key={child.commentId}
                                    $isReply
                                  >
                                    <_.ProfileImg imgUrl={child.profileImageUrl} />
                                    <_.TextBox>
                                      <_.NickNameContainer>
                                        <_.CommentUser>@{child.userId}</_.CommentUser>
                                      </_.NickNameContainer>
                                      <_.CommentText>{child.content}</_.CommentText>
                                      <_.ActionButtonGroup>
                                        <_.LikeButton $isLiked={child.isLiked}>
                                          {child.isLiked ? '♥' : '♡'} {child.likes}
                                        </_.LikeButton>
                                        {isChildOwner && (
                                          <div style={{ display: 'flex', gap: '8px' }}>
                                            <_.EditButton>수정</_.EditButton>
                                            <_.DeleteButton>삭제</_.DeleteButton>
                                          </div>
                                        )}
                                      </_.ActionButtonGroup>
                                    </_.TextBox>
                                  </_.CommentItem>
                                );
                              })}
                            </div>
                          );
                        })}

                        {hasNextComment && (
                          <_.LoadMoreButton onClick={handleLoadMoreComments}>
                            더보기
                          </_.LoadMoreButton>
                        )}
                      </_.CommentsInner>
                    </_.CommentsContainer>
                  </_.CommentSection>

                  <_.ArticleSection>
                    <_.ArticleContent>
                      {parseMemorialContent(memorialData.content)}
                    </_.ArticleContent>
                  </_.ArticleSection>
                </_.ScrollContent>
              </_.ScrollableArea>
            </_.ContentInner>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
