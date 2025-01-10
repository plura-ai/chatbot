import { useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import 'highlight.js/styles/github-dark.css';
import { v4 as uuidv4 } from 'uuid';
import { questionFamily } from '../../store/atoms/questionFamily';
import { allChats } from '../../store/atoms/allChats';
import { submitIconState } from '../../store/atoms/submitIconState';
import '../../index.css'
import { ChatHistory } from '@/types';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { CircleFadingArrowUp, Paperclip } from 'lucide-react';
import { IconMicrophone } from '@tabler/icons-react';

export default function Input() {
  const inputElement = useRef<HTMLTextAreaElement>(null)
  const submitBtn = useRef(null);
  const id = useRef(uuidv4());
  const setQuestion = useSetRecoilState(questionFamily(id.current))
  const [chatHistory, setChatHistory] = useRecoilState<ChatHistory>(allChats);
  const [disabled, setDisabled] = useRecoilState(submitIconState);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (inputElement.current) {
      setDisabled(inputElement.current.value.trim().length === 0);
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      if (!disabled && inputElement.current) {
        setQuestion(q => ({ ...q, question: inputElement.current!.value }))
        setChatHistory([...chatHistory, { question: id.current, answer: null }])
        id.current = uuidv4();
        inputElement.current.value = "";
        setDisabled(true)
      }
    }
  }

  function handleSubmit() {
    if (!disabled) {
      setQuestion(q => ({ ...q, question: inputElement.current!.value }))
      setChatHistory(history => [...history, { question: id.current, answer: null }])
      id.current = uuidv4();
      if (inputElement.current) {
        inputElement.current.value = "";
      }
      setDisabled(true)
    }
  }

  return (
    <div className='bg-secondary/30 rounded-2xl w-full flex flex-col border border-border/60  dark:border-border relative mt-2 '>
      <Textarea ref={inputElement} onKeyUp={handleKeyDown} placeholder='Ask your query and press Enter'
        className='h-24 resize-none outline-none ring-0 no-scrollbar overflow-y-scroll focus-visible:ring-0 focus-visible:ring-neutral-900 
      focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-600 text-white text-md'/>
      <Button
        ref={submitBtn}
        onClick={handleSubmit}
        variant={"default"}
        size={"icon"}
        className={`absolute right-2 top-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${disabled && `opacity-20 cursor-not-allowed`}`}
        title="Send"
      >
          <CircleFadingArrowUp />
      </Button >
      <InputOptions />
    </div>
  )
}

function InputOptions() {
  return (
    <div className='bg-secondary/30 rounded-2xl flex flex-grow items-center backdrop-blur-lg supports-[backdrop-filter]:bg-transparent dark:border-border px-4 py-2 h-10 gap-2 '>
      <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs 
        font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
        bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-7 px-2 cursor-pointer'>
        <Paperclip />
        Media
      </div>
      <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs 
        font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
        bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-7 px-2 cursor-pointer'>
        <IconMicrophone />
        Audio
      </div>
    </div>
  )
}