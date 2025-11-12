'use client';

import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import MemorialBtn from '@/components/ui/MemorialBtn';
import Whiteboard from '@/components/ui/Whiteboard';
import RankingList from '@/components/common/RankingList';
import * as _ from './styles';

const todayRankings = [
  { rank: 1, name: '힘멜', count: 1234 },
  { rank: 2, name: '손오공', count: 196 },
  { rank: 3, name: '이타치', count: 169 },
];

export default function Home() {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/search');
  };

  // const handleFavorites = () => {
  //   console.log('즐겨찾기');
  // };

  const handleLogin = () => {
    router.push('/login');
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
                <_.Version>ver beta m0.0.1</_.Version>
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
                  <MemorialBtn
                    name="로그인"
                    onClick={handleLogin}
                    type="submit"
                    active={true}
                    width="100%"
                  />
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
