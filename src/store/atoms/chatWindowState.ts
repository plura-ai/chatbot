import { atom } from "recoil";

export const chatWindowState=atom<boolean>({
    key:"chatWindowState",
    default: false
})