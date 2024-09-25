import {create} from 'zustand';

const useUserStore = create((set) => ({
  userData: null,
  photoUrl: null,
  isLoading: true,
  setUser: (userData, photoUrl) => set({ userData, photoUrl, isLoading: false }),
  updateUserData: (userData) => set({ userData }),
}));

export default useUserStore