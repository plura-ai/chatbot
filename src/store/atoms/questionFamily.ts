import { atomFamily } from 'recoil'
import { Question } from '../../types'

export const questionFamily=atomFamily<Question, string | number>({
    key:"questionFamily",
    default:(id)=>{
      return {
        id:id,
        question:"Ask whatever you want"
      }
    }
})