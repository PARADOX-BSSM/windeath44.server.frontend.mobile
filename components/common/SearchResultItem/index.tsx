'use client';

import * as _ from './SearchResultItem.styles';

interface SearchResultItemProps {
  imageUrl: string;
  name: string;
  animeName: string;
  genres: string[];
  onClick?: () => void;
}

export default function SearchResultItem({
  imageUrl,
  name,
  animeName,
  genres,
  onClick,
}: SearchResultItemProps) {
  return (
    <_.ItemContainer onClick={onClick}>
      <_.ImageWrapper>
        <img src={imageUrl} alt={name} />
      </_.ImageWrapper>
      <_.InfoWrapper>
        <_.CharacterName>{name}</_.CharacterName>
        <_.MetaInfo>
          {animeName} <span className="separator">|</span>{' '}
          <span className="genres">{genres.join(', ')}</span>
        </_.MetaInfo>
      </_.InfoWrapper>
    </_.ItemContainer>
  );
}
