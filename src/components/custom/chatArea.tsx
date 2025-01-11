import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { allChats } from '../../store/atoms/allChats';

import Chat from './answerComponent';
import QuestionComponent from './questions';
import { ChatBotAttr } from '@/types';
import { chatBotAttributes } from '../../store/atoms/attributesData';

function scrollToBottom(element: HTMLElement) {
  element.scrollTop = element.scrollHeight
}

export default function ChatArea() {
  const [chatHistory] = useRecoilState(allChats)
  const chatArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatArea.current) {
      scrollToBottom(chatArea.current)
    }
  }, [chatHistory])

  return (
    <div className='flex-grow h-max flex flex-col py-10 px-0 rounded-xl w-full overflow-x-hidden text-center z-[998] items-center scroll-smooth no-scrollbar overflow-y-scroll' ref={chatArea}>
      <HeroSection />
      <div style={{ width: "100%" }}>
        {chatHistory.map((history, index) => {
          return (<>
            <QuestionComponent key={index + history.question} id={history.question} question={history.question} />
            <Chat key={index} questionId={history.question} />
          </>)
        })}
      </div>
    </div>
  )
}

function HeroSection() {
  const chatBotAttributesData: ChatBotAttr | null = useRecoilValue(chatBotAttributes) || null;
  
  const title = chatBotAttributesData?.title || "PluraBot";
  const description = chatBotAttributesData?.description || "Agents and Micro-Services";
  const logo = chatBotAttributesData?.logoImg || "https://www.plura.pro/_next/image?url=%2Fimages%2Fplura-logo.png&w=64&q=75";


  return (
    <div className='mb-8 flex items-center justify-center flex-col gap-2 cursor-crosshair w-full'>
      <img className="w-14 aspect-square" alt='plura' src={logo}></img>
      <h2 className='text-3xl md:text-4xl font-semibold tracking-tighter drop-shadow-sm max-w-3xl select-none'>
        {title}
      </h2>
      <p className='text-center text-base font-semibold text-muted-foreground bg-clip-text max-w-xl select-none'>
        {description}
      </p>
    </div>
  )
}