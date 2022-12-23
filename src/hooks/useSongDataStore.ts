import create from "zustand";

interface SongData {
  youtubeId: string;
  itunesId: number;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  releaseDate: string;
  genre: string;
}

interface SongDataStore {
  songData: Partial<SongData>;
  setSongData: (songData: Partial<SongData>) => void;
  clearSongData: () => void;
}

export const useSongDataStore = create<SongDataStore>((set) => ({
  songData: {},
  setSongData: (songData) => set({ songData }),
  clearSongData: () => set({ songData: {} }),
}));
