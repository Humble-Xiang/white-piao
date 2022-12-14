import create from 'zustand';

import { Episode, EpisodeSource, Favorite } from '../modals';

type VideoInfo = {
  title: string;
  seriesUrl: string;
  type?: string;
  actors?: string;
  intro?: string;
  image?: string;
  sourceId: number;
  sourceName: string;
};

export type HistoryStatus = {
  seek: number;
  currEpisodeSource: number;
  currEpisode: number;
};

interface PlayerState {
  streamUrl: string | null;
  videoInfo: VideoInfo;
  historyStatus: HistoryStatus;
  favorite: Favorite | null;
  episodes: Episode[];
  episodeSources: EpisodeSource[];
  init: () => void;
  setStreamUrl: (v: string | null) => void;
  setVideoInfo: (v: VideoInfo) => void;
  setHistoryStatus: (v: HistoryStatus) => void;
  setFavorite: (v: Favorite | null) => void;
  setEpisodes: (v: Episode[]) => void;
  setEpisodeSources: (v: EpisodeSource[]) => void;
}

const initState = {
  streamUrl: null,
  videoInfo: {
    title: '',
    seriesUrl: '',
    sourceName: '',
    sourceId: 0,
  },
  historyStatus: {
    seek: 0,
    currEpisodeSource: 0,
    currEpisode: 0,
    lastWatchTime: new Date().toISOString(),
  },
  favorite: null,
  episodes: [],
  episodeSources: [],
};

export const usePlayer = create<PlayerState>()(set => ({
  ...initState,
  init: () => set(() => ({ ...initState })),
  setStreamUrl: v => set(() => ({ streamUrl: v })),
  setVideoInfo: v => set(() => ({ videoInfo: v })),
  setHistoryStatus: v =>
    set(() => {
      return { historyStatus: v };
    }),
  setFavorite: v => set(() => ({ favorite: v })),
  setEpisodes: v => set(() => ({ episodes: v })),
  setEpisodeSources: v => set(() => ({ episodeSources: v })),
}));
