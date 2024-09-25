import {create} from 'zustand';

const useUserStore = create((set) => ({
  userData: null,
  photoUrl: null,
  isLoading: true,
  setUser: (userData, photoUrl) => set({ userData, photoUrl, isLoading: false }),
}));

export default useUserStore