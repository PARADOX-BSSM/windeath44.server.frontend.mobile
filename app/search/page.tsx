'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader/index';
import Input from '@/components/ui/Input/index';
import Dropdown from '@/components/ui/Dropdown/index';
import SearchResultItem from '@/components/common/SearchResultItem/index';
import * as _ from './styles';
import {
  fetchIntegratedCharactersOffset,
  fetchAnimesPage,
  Character,
  AnimeItem,
} from '@/lib/api/anime';
import { fetchMemorials, MemorialItem } from '@/lib/api/memorial';
import { FolderIcon, SearchPointDown } from '@/assets';
import Whiteboard from '@/components/ui/Whiteboard';
import MemorialBtn from '@/components/ui/MemorialBtn';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setDebouncedValue(value);
      setIsFirstRender(false);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isFirstRender]);

  return debouncedValue;
};

export default function SearchPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [ani, setAni] = useState('');
  const [fillDeath, setFillDeath] = useState('모두');

  const debouncedName = useDebounce(name, 500);
  const debouncedAni = useDebounce(ani, 500);

  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [size] = useState(5);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [memorials, setMemorials] = useState<MemorialItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animesResp, setAnimesResp] = useState<any>(null);

  const deathReason = [
    '모두',
    '자연사(自然死)',
    '병사(病死)',
    '자살(自殺)',
    '타살(他殺)',
    '돌연사(突然死)',
    '불명사(不明死)',
  ];

  const animeOptions = ['없음']; // Will be populated from API if needed

  // Parameter normalization
  const deathParam = useMemo(() => (fillDeath === '모두' ? undefined : fillDeath), [fillDeath]);
  const nameParam = useMemo(
    () => (debouncedName.trim() ? debouncedName.trim() : undefined),
    [debouncedName],
  );
  const aniParam = useMemo(
    () => (debouncedAni !== '없음' && debouncedAni.trim() ? debouncedAni.trim() : undefined),
    [debouncedAni],
  );

  // Fetch animes when ani parameter changes
  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!aniParam) {
        setAnimesResp(null);
        return;
      }
      try {
        const resp = await fetchAnimesPage({ size: size, animeName: aniParam });
        if (!aborted) setAnimesResp(resp);
      } catch (e) {
        console.error('Failed to fetch animes:', e);
      }
    };
    run();

    return () => {
      aborted = true;
    };
  }, [aniParam, size]);

  const animeIdParam = useMemo<string[] | undefined>(() => {
    if (!aniParam) return undefined;
    const values = (animesResp?.data?.data as AnimeItem[] | undefined) ?? [];
    if (!values.length) return [];
    const ids = values.map((v) => v?.animeId).filter((id): id is number => typeof id === 'number');
    return ids.length ? ids.map(String) : [];
  }, [animesResp, aniParam]);

  // Fetch characters
  useEffect(() => {
    let aborted = false;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const integrated = await fetchIntegratedCharactersOffset({
          name: nameParam,
          animeId: animeIdParam,
          deathReason: deathParam,
          size: size,
          page: pageNumber - 1,
          memorialState: 'MEMORIALIZING',
        });

        if (!aborted) {
          const values = integrated?.data?.values || [];
          const total = integrated?.data?.total || 0;
          setCharacters(values);
          setMaxPage(total ? Math.ceil(total / size) : 1);

          // Fetch memorials for these characters
          const characterIds = values
            .map((c) => c?.characterId)
            .filter((id): id is number => typeof id === 'number');

          if (characterIds.length > 0) {
            const memorialsResp = await fetchMemorials({
              orderBy: 'recently-updated',
              page: 1,
              characters: characterIds,
            });
            if (!aborted) {
              setMemorials(memorialsResp?.data?.values || []);
            }
          } else {
            setMemorials([]);
          }
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        if (!aborted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      aborted = true;
    };
  }, [nameParam, animeIdParam, deathParam, pageNumber, size]);

  // Filter characters that have memorials
  const charactersWithMemorials = useMemo(() => {
    return characters.filter((character) => {
      const relatedMemorials = memorials.filter(
        (memorial) => memorial.characterId === character.characterId,
      );
      return relatedMemorials.length > 0;
    });
  }, [characters, memorials]);

  const handleCharacterClick = (character: Character) => {
    const relatedMemorials = memorials.filter(
      (memorial) => memorial.characterId === character.characterId,
    );
    if (relatedMemorials.length > 0) {
      router.push(`/memorial/${relatedMemorials[0].memorialId}`);
    }
  };

  return (
    <_.Container>
      <_.WindowContainer>
        <_.ContentWrapper>
          <WindowHeader />
          <_.MainContent>
            <_.ContentInner>
              <_.SearchSection>
                <_.FilterBox>
                  <Input
                    label="이름"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="애니메이션"
                    type="text"
                    value={ani}
                    onChange={(e) => setAni(e.target.value)}
                  />
                  <Dropdown
                    label="사인"
                    value={fillDeath}
                    options={deathReason}
                    onChange={setFillDeath}
                  />
                </_.FilterBox>
              </_.SearchSection>

              <_.ResultSection>
                <Whiteboard padding="2px">
                  <_.ResultsList>
                    {isLoading ? (
                      <div style={{ padding: '20px', textAlign: 'center' }}>불러오는 중...</div>
                    ) : (
                      charactersWithMemorials.map((character) => (
                        <SearchResultItem
                          key={character.characterId}
                          imageUrl={character.imageUrl || ''}
                          name={character.name}
                          animeName={character.animeName || ''}
                          genres={character.genres || []}
                          onClick={() => handleCharacterClick(character)}
                        />
                      ))
                    )}
                  </_.ResultsList>
                </Whiteboard>
                <_.PaginationWrapper>
                  <MemorialBtn
                    name={`1`}
                    selected={false}
                    type="menu"
                    onClick={() => {
                      setPageNumber(1);
                    }}
                    active={true}
                    width="32px"
                    height="32px"
                    fontSize="16px"
                  />
                  <_.PageDots>...</_.PageDots>
                  <MemorialBtn
                    name={`${pageNumber - 1}`}
                    selected={false}
                    type={pageNumber === 1 ? 'hidden' : 'menu'}
                    onClick={() => {
                      setPageNumber(pageNumber - 1);
                    }}
                    active={true}
                    width="32px"
                    height="32px"
                    fontSize="16px"
                  />
                  <MemorialBtn
                    name={`${pageNumber}`}
                    selected={true}
                    type="menu"
                    onClick={() => {
                      setPageNumber(pageNumber);
                    }}
                    active={true}
                    width="32px"
                    height="32px"
                    fontSize="16px"
                  />
                  <MemorialBtn
                    name={`${pageNumber + 1}`}
                    selected={false}
                    type={pageNumber === maxPage ? 'hidden' : 'menu'}
                    onClick={() => {
                      setPageNumber(pageNumber + 1);
                    }}
                    active={true}
                    width="32px"
                    height="32px"
                    fontSize="16px"
                  />
                  <_.PageDots>...</_.PageDots>
                  <MemorialBtn
                    name={`${maxPage}`}
                    selected={false}
                    type="menu"
                    onClick={() => {
                      setPageNumber(maxPage);
                    }}
                    active={true}
                    width="32px"
                    height="32px"
                    fontSize="16px"
                  />
                </_.PaginationWrapper>
              </_.ResultSection>
            </_.ContentInner>
            <_.Statusbar>
              <_.StatusContent>
                <_.StatusIcon>
                  <img
                    src={FolderIcon.src}
                    alt="folder"
                  />
                </_.StatusIcon>
                <_.StatusText>{charactersWithMemorials.length} 개체</_.StatusText>
              </_.StatusContent>
              <_.DragIcon>
                <img
                  src={SearchPointDown.src}
                  alt="drag"
                />
              </_.DragIcon>
            </_.Statusbar>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
