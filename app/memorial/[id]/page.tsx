'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader/index';
import { getMemorial, MemorialData } from '@/lib/api/memorialGet';
import { getCharacter, CharacterData } from '@/lib/api/character';
import { getAnimation } from '@/lib/api/animation';
import {
  getMemorialComments,
  MemorialComment,
  writeMemorialComment,
  updateMemorialComment,
  deleteMemorialComment,
  likeMemorialComment,
} from '@/lib/api/memorialComments';
import { getUsers, UserData, getCurrentUser } from '@/lib/api/user';
import { parseMemorialContent, extractTableOfContents } from '@/lib/utils/parseMemorialContent';
import { MemorialRibbon } from '@/assets';
import * as _ from './styles';

export default function MemorialPage() {
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
  const [userProfiles, setUserProfiles] = useState<Map<string, UserData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

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
        const commentData = commentsResponse.data.data;
        setComments(commentData);
        setHasNextComment(commentsResponse.data.hasNext);

        // Collect all unique userIds from comments and their children
        const userIds = new Set<string>();
        commentData.forEach((comment) => {
          userIds.add(comment.userId);
          comment.children?.forEach((child) => {
            userIds.add(child.userId);
          });
        });

        // Fetch user profiles for all userIds
        if (userIds.size > 0) {
          try {
            const users = await getUsers(Array.from(userIds));
            const profileMap = new Map<string, UserData>();
            users.forEach((user) => {
              profileMap.set(user.userId, user);
            });
            setUserProfiles(profileMap);
          } catch (err) {
            console.error('Failed to fetch user profiles:', err);
          }
        }

        // Get current user info (optional - for edit/delete permissions)
        try {
          const { getAccessToken } = await import('@/lib/api/auth');
          const token = getAccessToken();
          if (token) {
            const currentUser = await getCurrentUser();
            setCurrentUserId(currentUser.userId);
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
      const newComments = commentsResponse.data.data;
      setComments((prev) => [...prev, ...newComments]);
      setHasNextComment(commentsResponse.data.hasNext);

      // Fetch user profiles for new comments
      const newUserIds = new Set<string>();
      newComments.forEach((comment) => {
        if (!userProfiles.has(comment.userId)) {
          newUserIds.add(comment.userId);
        }
        comment.children?.forEach((child) => {
          if (!userProfiles.has(child.userId)) {
            newUserIds.add(child.userId);
          }
        });
      });

      if (newUserIds.size > 0) {
        try {
          const users = await getUsers(Array.from(newUserIds));
          setUserProfiles((prev) => {
            const newMap = new Map(prev);
            users.forEach((user) => {
              newMap.set(user.userId, user);
            });
            return newMap;
          });
        } catch (err) {
          console.error('Failed to fetch user profiles:', err);
        }
      }
    } catch (err) {
      console.error('Error loading more comments:', err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    // 이전 상태 저장 (롤백용)
    const previousComments = [...comments];
    const previousContent = commentContent;

    // 임시 댓글 생성 (낙관적 업데이트)
    const tempComment: MemorialComment = {
      commentId: -Date.now(), // 임시 음수 ID
      memorialId: Number(memorialId),
      userId: currentUserId || 'unknown',
      content: previousContent,
      likes: 0,
      isLiked: false,
      parentId: null,
      createdAt: new Date().toISOString(),
      children: [],
    };

    // 즉시 댓글 추가 (낙관적 업데이트)
    setComments((prev) => [...prev, tempComment]);
    setCommentContent('');

    try {
      await writeMemorialComment({
        memorialId: Number(memorialId),
        content: previousContent,
      });

      // 댓글 작성 성공 후 댓글 목록 새로고침
      const commentsResponse = await getMemorialComments({
        memorialId: Number(memorialId),
        size: 10,
      });
      setComments(commentsResponse.data.data);
      setHasNextComment(commentsResponse.data.hasNext);
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setComments(previousComments);
      setCommentContent(previousContent);
      console.error('댓글 작성 중 오류:', err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const handleReplySubmit = async (parentCommentId: number) => {
    if (!replyContent.trim()) return;

    // 이전 상태 저장 (롤백용)
    const previousComments = [...comments];
    const previousReplyContent = replyContent;

    // 임시 답글 생성 (낙관적 업데이트)
    const tempReply: MemorialComment = {
      commentId: -Date.now(), // 임시 음수 ID
      memorialId: Number(memorialId),
      userId: currentUserId || 'unknown',
      content: previousReplyContent,
      likes: 0,
      isLiked: false,
      parentId: parentCommentId,
      createdAt: new Date().toISOString(),
      children: [],
    };

    // 즉시 답글 추가 (낙관적 업데이트)
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.commentId === parentCommentId) {
          return {
            ...comment,
            children: [...comment.children, tempReply],
          };
        }
        return comment;
      }),
    );
    setReplyContent('');
    setReplyingTo(null);

    try {
      await writeMemorialComment({
        memorialId: Number(memorialId),
        content: previousReplyContent,
        parentCommentId,
      });

      // 답글 작성 성공 후 댓글 목록 새로고침
      const commentsResponse = await getMemorialComments({
        memorialId: Number(memorialId),
        size: 10,
      });
      setComments(commentsResponse.data.data);
      setHasNextComment(commentsResponse.data.hasNext);
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setComments(previousComments);
      setReplyContent(previousReplyContent);
      setReplyingTo(parentCommentId);
      console.error('답글 작성 중 오류:', err);
      alert('답글 작성 중 오류가 발생했습니다.');
    }
  };

  const handleEditSubmit = async (commentId: number) => {
    if (!editContent.trim()) return;

    // 이전 상태 저장 (롤백용)
    const previousComments = [...comments];
    const previousEditContent = editContent;

    // 재귀적으로 댓글 업데이트 함수
    const updateCommentRecursive = (comments: MemorialComment[]): MemorialComment[] => {
      return comments.map((comment) => {
        if (comment.commentId === commentId) {
          return { ...comment, content: previousEditContent };
        }
        if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: updateCommentRecursive(comment.children),
          };
        }
        return comment;
      });
    };

    // 즉시 수정 (낙관적 업데이트)
    setComments((prev) => updateCommentRecursive(prev));
    setEditContent('');
    setEditingCommentId(null);

    try {
      await updateMemorialComment({
        commentId,
        content: previousEditContent,
      });
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setComments(previousComments);
      console.error('댓글 수정 중 오류:', err);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteSubmit = async (commentId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    // 이전 상태 저장 (롤백용)
    const previousComments = [...comments];

    // 재귀적으로 댓글 삭제 함수
    const deleteCommentRecursive = (comments: MemorialComment[]): MemorialComment[] => {
      // 최상위 레벨에서 삭제
      const filtered = comments.filter((comment) => comment.commentId !== commentId);

      // children에서 재귀적으로 삭제
      return filtered.map((comment) => {
        if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: deleteCommentRecursive(comment.children),
          };
        }
        return comment;
      });
    };

    // 즉시 삭제 (낙관적 업데이트)
    setComments((prev) => deleteCommentRecursive(prev));

    try {
      await deleteMemorialComment({ commentId });
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setComments(previousComments);
      console.error('댓글 삭제 중 오류:', err);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleLikeToggle = async (commentId: number, isLiked: boolean) => {
    // 이전 상태 저장 (롤백용)
    const previousComments = [...comments];

    // 재귀적으로 좋아요 토글 함수
    const toggleLikeRecursive = (comments: MemorialComment[]): MemorialComment[] => {
      return comments.map((comment) => {
        if (comment.commentId === commentId) {
          return {
            ...comment,
            isLiked: !isLiked,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: toggleLikeRecursive(comment.children),
          };
        }
        return comment;
      });
    };

    // 즉시 토글 (낙관적 업데이트)
    setComments((prev) => toggleLikeRecursive(prev));

    try {
      await likeMemorialComment({ commentId, isLiked });
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setComments(previousComments);
      console.error('좋아요 토글 중 오류:', err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
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

                  {/* <_.BowButton onClick={handleBowClick}>절 하러가기</_.BowButton> */}

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
                          const userProfile = userProfiles.get(comment.userId);
                          const isEditing = editingCommentId === comment.commentId;
                          const isReplying = replyingTo === comment.commentId;

                          return (
                            <div key={comment.commentId}>
                              <_.CommentItem>
                                <_.ProfileImg imgUrl={userProfile?.profile || ''} />
                                <_.TextBox>
                                  <_.NickNameContainer>
                                    <_.NickName>{userProfile?.name}</_.NickName>
                                    <_.CommentUser>@{comment.userId}</_.CommentUser>
                                  </_.NickNameContainer>
                                  {isEditing ? (
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        width: '100%',
                                      }}
                                    >
                                      <_.CommentInput
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        maxLength={250}
                                        placeholder="댓글을 수정하세요."
                                      />
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <_.EditButton
                                          onClick={() => handleEditSubmit(comment.commentId)}
                                        >
                                          저장
                                        </_.EditButton>
                                        <_.DeleteButton
                                          onClick={() => {
                                            setEditingCommentId(null);
                                            setEditContent('');
                                          }}
                                        >
                                          취소
                                        </_.DeleteButton>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <_.CommentText>{comment.content}</_.CommentText>
                                      <_.ActionButtonGroup>
                                        <div
                                          style={{
                                            display: 'flex',
                                            gap: '8px',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <_.LikeButton
                                            $isLiked={comment.isLiked}
                                            onClick={() =>
                                              handleLikeToggle(comment.commentId, comment.isLiked)
                                            }
                                          >
                                            {comment.isLiked ? '♥' : '♡'} {comment.likes}
                                          </_.LikeButton>
                                          <_.ReplyButton
                                            onClick={() => {
                                              setReplyingTo(comment.commentId);
                                              setReplyContent('');
                                            }}
                                          >
                                            답글 입력
                                          </_.ReplyButton>
                                        </div>
                                        {isOwner && (
                                          <div style={{ display: 'flex', gap: '8px' }}>
                                            <_.EditButton
                                              onClick={() => {
                                                setEditingCommentId(comment.commentId);
                                                setEditContent(comment.content);
                                              }}
                                            >
                                              수정
                                            </_.EditButton>
                                            <_.DeleteButton
                                              onClick={() => handleDeleteSubmit(comment.commentId)}
                                            >
                                              삭제
                                            </_.DeleteButton>
                                          </div>
                                        )}
                                      </_.ActionButtonGroup>
                                    </>
                                  )}
                                </_.TextBox>
                              </_.CommentItem>

                              {/* 답글 입력 UI */}
                              {isReplying && (
                                <_.CommentItem $isReply>
                                  <_.ProfileImg imgUrl="" />
                                  <_.TextBox>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        width: '100%',
                                      }}
                                    >
                                      <_.CommentInput
                                        type="text"
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        maxLength={250}
                                        placeholder="답글을 입력하세요."
                                      />
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <_.EditButton
                                          onClick={() => handleReplySubmit(comment.commentId)}
                                        >
                                          작성
                                        </_.EditButton>
                                        <_.DeleteButton
                                          onClick={() => {
                                            setReplyingTo(null);
                                            setReplyContent('');
                                          }}
                                        >
                                          취소
                                        </_.DeleteButton>
                                      </div>
                                    </div>
                                  </_.TextBox>
                                </_.CommentItem>
                              )}

                              {/* 답글 목록 */}
                              {comment.children?.map((child) => {
                                const isChildOwner = currentUserId === child.userId;
                                const childUserProfile = userProfiles.get(child.userId);
                                const isChildEditing = editingCommentId === child.commentId;

                                return (
                                  <_.CommentItem
                                    key={child.commentId}
                                    $isReply
                                  >
                                    <_.ProfileImg imgUrl={childUserProfile?.profile || ''} />
                                    <_.TextBox>
                                      <_.NickNameContainer>
                                        <_.NickName>{childUserProfile?.name}</_.NickName>
                                        <_.CommentUser>@{child.userId}</_.CommentUser>
                                      </_.NickNameContainer>
                                      {isChildEditing ? (
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            width: '100%',
                                          }}
                                        >
                                          <_.CommentInput
                                            type="text"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            maxLength={250}
                                            placeholder="답글을 수정하세요."
                                          />
                                          <div style={{ display: 'flex', gap: '8px' }}>
                                            <_.EditButton
                                              onClick={() => handleEditSubmit(child.commentId)}
                                            >
                                              저장
                                            </_.EditButton>
                                            <_.DeleteButton
                                              onClick={() => {
                                                setEditingCommentId(null);
                                                setEditContent('');
                                              }}
                                            >
                                              취소
                                            </_.DeleteButton>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <_.CommentText>{child.content}</_.CommentText>
                                          {isChildOwner && (
                                            <_.ActionButtonGroup>
                                              <div style={{ display: 'flex', gap: '8px' }}>
                                                <_.EditButton
                                                  onClick={() => {
                                                    setEditingCommentId(child.commentId);
                                                    setEditContent(child.content);
                                                  }}
                                                >
                                                  수정
                                                </_.EditButton>
                                                <_.DeleteButton
                                                  onClick={() =>
                                                    handleDeleteSubmit(child.commentId)
                                                  }
                                                >
                                                  삭제
                                                </_.DeleteButton>
                                              </div>
                                            </_.ActionButtonGroup>
                                          )}
                                        </>
                                      )}
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
