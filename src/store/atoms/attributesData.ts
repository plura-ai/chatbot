import { atom } from "recoil";
import { ChatBotAttr } from "../../types"
export const chatBotAttributes=atom<ChatBotAttr | null>({
    key: "chatBotAttributes",
    default:{
        authToken: ""
    }
    //default: {backendUrl:null,geminiApi:null,title:null,prompt:null,theme:null,botIcon:null,userIcon:null,stylizeTitle:null,description:null,cta:null}
})