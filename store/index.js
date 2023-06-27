import { create } from "zustand";

const useStore = create((set) => ({
  activePage: "Overview",
  setActivePage: (page) => set({ activePage: page }),
  accountType: "Member",
  setAccountType: (type) => set({ accountType: type }),
}));

export default useStore;
