import {create} from 'zustand';

const useLoadingStore = create((set) => ({
  isLoadingAnim: true,
  setLoading: (loading) => set({ isLoadingAnim: loading }),
}));

export default useLoadingStore