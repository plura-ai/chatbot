import { atom } from 'recoil'
import { ChatHistory } from '../../types'

export const allChats=atom<ChatHistory>({
    key:"allChat",
    default: []
})