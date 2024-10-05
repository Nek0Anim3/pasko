import {create} from 'zustand';

const useUpgradesStore = create((set) => ({
  upgrades: null,
  isLoading: true,
  setUpgrades: (upgrades) => set({ upgrades, isLoading: false }),
}));

export default useUpgradesStore