'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader/index';
import MemorialBtn from '@/components/ui/MemorialBtn';
import { getBowCount, submitBow, getBowChiefs, BowChief } from '@/lib/api/bow';
import { getMemorial, MemorialData } from '@/lib/api/memorialGet';
import { getCharacter, CharacterData } from '@/lib/api/character';
import Cookies from 'js-cookie';
import { TableImage as TableImageAsset } from '@/assets';
import * as _ from './styles';

export default function BowPageClient({ memorialId }: { memorialId: number }) {
  const router = useRouter();

  const [bowCount, setBowCount] = useState<number>(0);
  const [chiefs, setChiefs] = useState<BowChief[]>([]);
  const [memorialData, setMemorialData] = useState<MemorialData | null>(null);
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = Cookies.get('userId');
    setCurrentUserId(userId || null);

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch bow count
        const bowCountRes = await getBowCount(memorialId);
        setBowCount(bowCountRes.data);

        // Fetch memorial data
        const memorialRes = await getMemorial(memorialId);
        setMemorialData(memorialRes.data);

        // Fetch character data
        if (memorialRes.data.characterId) {
          const characterRes = await getCharacter(memorialRes.data.characterId);
          setCharacter(characterRes.data);
        }

        // Fetch chiefs
        const chiefsRes = await getBowChiefs(memorialId);
        setChiefs(chiefsRes);
      } catch (error) {
        console.error('Failed to fetch bow page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memorialId]);

  const handleBow = async () => {
    const token = Cookies.get('access_token');

    if (!token) {
      alert('게스트는 절을 할 수 없습니다.\n로그인 후 사용 가능합니다.');
      router.push('/login');
      return;
    }

    try {
      await submitBow(memorialId);
      setBowCount((prev) => prev + 1);

      // Refresh chiefs list
      const chiefsRes = await getBowChiefs(memorialId);
      setChiefs(chiefsRes);

      alert('절을 올렸습니다.');
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        alert('절을 하지 못했습니다.\n절을 한 번 한 후 24시간이 지나야 다시 할 수 있습니다.');
      } else {
        alert('절을 하는 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
      }
    }
  };

  if (isLoading || !character) {
    return (
      <_.Container>
        <_.WindowContainer>
          <_.ContentWrapper>
            <WindowHeader />
            <_.MainContent>
              <_.ContentInner>
                <div style={{ textAlign: 'center', padding: '20px' }}>불러오는 중...</div>
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
              <_.BowCountSection>
                <p>절 하고 간 사람</p>
                <p>{bowCount}명</p>
              </_.BowCountSection>

              <_.AltarSection>
                <_.AltarImagesWrapper>
                  <_.TableImage
                    src={TableImageAsset.src}
                    alt="table"
                  />
                  <_.CharacterFrame>
                    <_.CharacterImageBorder>
                      <_.CharacterImage
                        src={character.imageUrl}
                        alt={character.name}
                      />
                    </_.CharacterImageBorder>
                  </_.CharacterFrame>
                  <_.FlowerDecoration
                    src="http://localhost:3845/assets/c7f5df363da0ee4283decb5df2ac795da9233e87.png"
                    alt="flowers"
                  />
                  <_.BowButtonWrapper>
                    <MemorialBtn
                      name="절"
                      onClick={handleBow}
                      type="submit"
                      active={true}
                    />
                  </_.BowButtonWrapper>
                </_.AltarImagesWrapper>
              </_.AltarSection>

              <_.MournersSection>
                <_.MournersTitle>조문객 명단</_.MournersTitle>
                <_.MournersList>
                  <_.MournersInner>
                    {chiefs.slice(0, 3).map((chief, index) => (
                      <_.MournerItem key={chief.userId}>
                        <_.MournerRankAndAvatar>
                          <_.MournerRank>#{index + 1}</_.MournerRank>
                          <_.MournerAvatar imgUrl={chief.profileImageUrl} />
                        </_.MournerRankAndAvatar>
                        <_.MournerInfo>
                          <_.MournerNameSection>
                            <_.MournerName>{chief.name}</_.MournerName>
                            <_.MournerBadge>(상주)</_.MournerBadge>
                          </_.MournerNameSection>
                          <_.MournerCount>{chief.bowCount}회</_.MournerCount>
                        </_.MournerInfo>
                      </_.MournerItem>
                    ))}
                  </_.MournersInner>
                </_.MournersList>

                {chiefs.length > 3 && currentUserId && (
                  <_.MournersList>
                    <_.MournersInner>
                      {chiefs
                        .slice(3)
                        .filter((chief) => chief.userId === currentUserId)
                        .map((chief) => {
                          const actualRank = chiefs.findIndex((c) => c.userId === chief.userId) + 1;
                          return (
                            <_.MournerItem key={chief.userId}>
                              <_.MournerRankAndAvatar>
                                <_.MournerRank>#{actualRank}</_.MournerRank>
                                <_.MournerAvatar imgUrl={chief.profileImageUrl} />
                              </_.MournerRankAndAvatar>
                              <_.MournerInfo>
                                <_.MournerNameSection>
                                  <_.MournerName>{chief.name}</_.MournerName>
                                </_.MournerNameSection>
                                <_.MournerCount>{chief.bowCount}회</_.MournerCount>
                              </_.MournerInfo>
                            </_.MournerItem>
                          );
                        })}
                    </_.MournersInner>
                  </_.MournersList>
                )}
              </_.MournersSection>
            </_.ContentInner>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
