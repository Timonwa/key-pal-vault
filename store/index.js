import { create } from "zustand";

const useStore = create((set) => ({
  // to toggle side bar visibility
  openMenu: false,
  setOpenMenu: (state) => set({ openMenu: state }),
  // to set active page
  activePage: "Overview",
  setActivePage: (page) => set({ activePage: page }),
  // to save user acciunt type for conditional rendering
  accountType: "Member", //TODO set to ""
  setAccountType: (type) => set({ accountType: type }),
  // to save user data
  userData: null,
  setUserData: (data) => set({ userData: data }),
  // to save user token
  userToken: null,
  setUserToken: (token) => set({ userToken: token }),
}));

export default useStore;
