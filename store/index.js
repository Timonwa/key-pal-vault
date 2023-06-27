import { create } from "zustand";

const useStore = create((set) => ({
  activePage: "",
  setActivePage: (page) => set({ activePage: page }),
  accountType: "",
  setAccountType: (type) => set({ accountType: type }),
}));

export default useStore;
