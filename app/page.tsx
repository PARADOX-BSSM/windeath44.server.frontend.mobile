'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import WindowHeader from '@/components/layout/WindowHeader/index';
import MemorialBtn from '@/components/ui/MemorialBtn';
import Whiteboard from '@/components/ui/Whiteboard/index';
import RankingList from '@/components/common/RankingList/index';
import { getAccessToken, logOut } from '@/lib/api/auth';
import * as _ from './styles';

const todayRankings = [
  { rank: 1, name: '힘멜', count: 1234 },
  { rank: 2, name: '손오공', count: 196 },
  { rank: 3, name: '이타치', count: 169 },
];

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkLoginStatus = () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener('focus', checkLoginStatus);

    return () => {
      window.removeEventListener('focus', checkLoginStatus);
    };
  }, []);

  const handleSearch = () => {
    router.push('/search');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleProfile = () => {
    // router.push('/profile');
    alert('준비 중인 기능입니다.');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
      alert('로그아웃되었습니다.');
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <_.Container>
      <_.WindowContainer>
        <_.ContentWrapper>
          <WindowHeader />
          <_.MainContent>
            <_.InnerContent>
              <_.TitleSection>
                <_.MainTitle>최애의 사인</_.MainTitle>
                <_.Version>ver b0.0.1</_.Version>
              </_.TitleSection>

              <_.ScrollableSection>
                <Whiteboard padding="16px">
                  <_.DescriptionText>
                    <p>최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.</p>
                    <p>아래의 버튼을 눌러 계속 진행할 수 있습니다.</p>
                  </_.DescriptionText>
                </Whiteboard>

                <_.ButtonGroup>
                  <MemorialBtn
                    name="추모관 검색"
                    onClick={handleSearch}
                    type="submit"
                    active={true}
                    width="100%"
                  />
                  {!mounted ? (
                    <>
                      <MemorialBtn
                        name="회원가입"
                        onClick={handleSignUp}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                      <MemorialBtn
                        name="로그인"
                        onClick={handleLogin}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                    </>
                  ) : isLoggedIn ? (
                    <>
                      <MemorialBtn
                        name="내 컴퓨터"
                        onClick={handleProfile}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                      <MemorialBtn
                        name="로그아웃"
                        onClick={handleLogout}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                    </>
                  ) : (
                    <>
                      <MemorialBtn
                        name="회원가입"
                        onClick={handleSignUp}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                      <MemorialBtn
                        name="로그인"
                        onClick={handleLogin}
                        type="submit"
                        active={true}
                        width="100%"
                      />
                    </>
                  )}
                </_.ButtonGroup>
                <_.ActionsSection>
                  <_.TodaySection>
                    <_.SectionTitle>오늘의 추모관</_.SectionTitle>
                    <Whiteboard padding="2px">
                      {/* <RankingList items={todayRankings} /> */}
                      <_.TodayText>준비 중인 기능입니다.</_.TodayText>
                    </Whiteboard>
                  </_.TodaySection>
                </_.ActionsSection>
              </_.ScrollableSection>
            </_.InnerContent>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
