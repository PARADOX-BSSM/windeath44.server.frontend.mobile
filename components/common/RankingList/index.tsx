'use client';

import * as _ from './RankingList.styles';

interface RankingItem {
  rank: number;
  name: string;
  count: number;
}

interface RankingListProps {
  items: RankingItem[];
}

export default function RankingList({ items }: RankingListProps) {
  return (
    <_.Container>
      <_.ItemsWrapper>
        {items.map((item, index) => (
          <_.RankItem key={item.rank} isFirst={index === 0}>
            <_.RankNumberWrapper>
              <_.RankNumber>#{item.rank}</_.RankNumber>
            </_.RankNumberWrapper>
            <_.ItemContent>
              <_.CharacterName>{item.name}</_.CharacterName>
              <_.BowCount>{item.count}회</_.BowCount>
            </_.ItemContent>
          </_.RankItem>
        ))}
      </_.ItemsWrapper>
    </_.Container>
  );
}
