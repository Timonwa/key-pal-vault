import { create } from "zustand";

const useStore = create((set) => ({
  openMenu: false,
  setOpenMenu: (state) => set({ openMenu: state }),
  activePage: "Overview",
  setActivePage: (page) => set({ activePage: page }),
  accountType: "Member", //TODO set to ""
  setAccountType: (type) => set({ accountType: type }),
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export default useStore;
