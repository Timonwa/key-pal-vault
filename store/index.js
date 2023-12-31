import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      // to is social login or not
      isSocialLogin: false,
      setIsSocialLogin: (state) => set({ isSocialLogin: state }),

      // to toggle side bar visibility
      openMenu: false,
      setOpenMenu: (state) => set({ openMenu: state }),

      // to set active page
      activePage: "Overview",
      setActivePage: (page) => set({ activePage: page }),

      // to save user account type for conditional rendering
      accountType: "Member",
      setAccountType: (type) => set({ accountType: type }),

      // to save user data
      userData: null,
      setUserData: (data) => set({ userData: data }),

      // to save user token
      userToken: null,
      setUserToken: (token) => set({ userToken: token }),

      // to save user's teams
      userTeams: null,
      setUserTeams: (teams) => set({ userTeams: teams }),

      // to get all members for admin
      allMembers: null,
      setAllMembers: (members) => set({ allMembers: members }),
    }),
    {
      name: "app-store", // required name of the item in the storage
      // getStorage: () => localStorage, // storage provider (localStorage by default)
    }
  )
);

export default useStore;
