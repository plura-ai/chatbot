import { atom } from "recoil";

export const submitIconState=atom<boolean>({
    key:"submitIconState",
    default: false
})