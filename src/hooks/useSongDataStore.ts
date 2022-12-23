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
  input: {
    title: string;
    artist: string;
  };
  songData: Partial<SongData>;
  setSongData: (songData: Partial<SongData>) => void;
  clearSongData: () => void;
}

export const useSongDataStore = create<SongDataStore>((set) => ({
  input: {
    title: "",
    artist: "",
  },
  songData: {},
  setSongData: (songData) => set({ songData }),
  clearSongData: () => set({ input: { title: "", artist: "" }, songData: {} }),
}));
