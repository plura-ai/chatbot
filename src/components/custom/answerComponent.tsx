import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from 'uuid';
import { allChats } from '../../store/atoms/allChats';
import { chatBotAttributes as chatBotAttributesAtom } from "../../store/atoms/attributesData";
import { useState } from 'react';
import { ChatBotAttr } from '@/types';
import { Clipboard } from 'lucide-react';
import { Button } from '../ui/button';


type ChatProp = {
  questionId: string
}

export default function Chat(props: ChatProp) {
  const chatBotAttributes: ChatBotAttr | null = useRecoilValue(chatBotAttributesAtom) || null;
  const botIcon = chatBotAttributes?.botIcon || "https://www.plura.pro/_next/image?url=%2Fimages%2Fplura-logo.png&w=64&q=75";
  const answerId = useRef(uuidv4());
  const [currentAnswer] = useState({ contents: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aliquid illum omnis quis nostrum repellat! Earum aliquam oremque porro iusto enim quasi officiis itaque eos quis.", state: "loaded" });
  const [chatHistory, setChatHistory] = useRecoilState(allChats);
  useEffect(() => {
    const updatedAnswerId = chatHistory.map(chat =>
      chat.question === props.questionId
        ? { ...chat, answer: answerId.current }
        : chat
    );
    setChatHistory(updatedAnswerId);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(currentAnswer.contents);
  }

  if (currentAnswer.state === 'loading') {
    return (
      <div className="bg-secondary p-2 flex rounded-xl flex-col space-y-3 border border-[#333]/80">
        <div className="w-10 aspect-square bg-primary/30 rounded-xl animate-pulse" />
        <div className="flex flex-col w-full">
          <p className="px-2 animate-pulse bg-primary/30 h-16 rounded-lg" />
        </div>
      </div>
    );
  }

  if (currentAnswer.state === 'hasError') {
    return (
      <div className="flex justify-center">
        <div className="rounded-md text-xs bg-secondary text-secondary-foreground px-4 py-2 m-4">
          Some Error Occurred While Generating Response
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-col space-y-1.5 border border-[#333]/80 rounded-md p-2 bg-secondary/30 backdrop-blur-lg relative">
      <div className='flex w-full justify-end'>
        <div className="flex flex-col w-full overflow-x-auto">
          <div className="text-sm text-left text-secondary-foreground font-sans">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {currentAnswer.contents}
            </ReactMarkdown>
          </div>
        </div>
        <span className="w-10">
          <img
            className="rounded-xl w-full aspect-square object-cover"
            src={botIcon}
            alt="Bot Icon"
          />
        </span>
      </div>
      <div className="flex justify-end mt-2 absolute bottom-0 right-0">
        <Button
          onClick={handleCopy}
          variant={'ghost'} className="text-muted-foreground hover:text-primary selection-none p-2 h-6"
        >
          <Clipboard className='!w-3'/>
          <span className='text-xs'>Copy</span>
        </Button>
      </div>
    </div>
  );
}