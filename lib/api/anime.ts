import axios from 'axios';
import qs from 'qs';
import { anime } from './config';

export interface Character {
  characterId: number;
  name: string;
  imageUrl: string;
  animeId: number;
  animeName: string;
  genres: string[];
  deathReason: string;
  [key: string]: any;
}

export interface FetchIntegratedCharactersParams {
  name?: string;
  animeId?: (string | number)[];
  deathReason?: string;
  page?: number;
  size?: number;
  memorialState?: string;
}

export interface IntegratedCharactersResponse {
  data: {
    values: Character[];
    total: number;
  };
}

export interface AnimeItem {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

export interface AnimesResponse {
  message: string;
  data: {
    data: AnimeItem[];
    hasNext: boolean;
  };
}

export interface FetchAnimesParams {
  cursorId?: number | null;
  size?: number;
  animeName?: string;
}

const sanitize = (p: FetchIntegratedCharactersParams) => {
  const out: Record<string, any> = {};
  if (p.name && p.name.trim() !== '') out.name = p.name.trim();
  if (p.deathReason && p.deathReason.trim() !== '') out.deathReason = p.deathReason.trim();
  if (p.memorialState && p.memorialState.trim() !== '') out.memorialState = p.memorialState.trim();
  if (Array.isArray(p.animeId)) {
    const arr = p.animeId
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
    if (arr.length) out.animeId = arr;
  }
  if (typeof p.page === 'number') out.page = p.page;
  if (typeof p.size === 'number') out.size = p.size;
  return out;
};

export const fetchIntegratedCharactersOffset = async (
  params: FetchIntegratedCharactersParams,
): Promise<IntegratedCharactersResponse> => {
  const clean = sanitize(params);
  const res = await axios.get(`${anime}/characters/search/integrated/offset`, {
    params: clean,
    paramsSerializer: (pp) => qs.stringify(pp, { arrayFormat: 'repeat', skipNulls: true }),
  });
  return res.data;
};

export const fetchAnimesPage = async ({
  cursorId = null,
  size = 10,
  animeName = '',
}: FetchAnimesParams): Promise<AnimesResponse> => {
  const url = new URL(anime);
  const params = new URLSearchParams();
  if (cursorId != null) params.set('cursorId', String(cursorId));
  params.set('size', String(size));
  if (animeName && animeName.trim()) params.set('animeName', animeName);
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch animes: ${res.status}`);
  }
  return (await res.json()) as AnimesResponse;
};

export const fetchAnimeById = async (animeId: number): Promise<AnimeItem> => {
  const res = await axios.get(`${anime}/${animeId}`);
  return res.data.data;
};
