import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "highlight.js/styles/github-dark.css";
import { questionFamily } from "../../store/atoms/questionFamily";
import { chatBotAttributes as chatBotAttributesAtom } from "../../store/atoms/attributesData";
import { Question, ChatBotAttr } from "@/types";
import { Pencil, X } from 'lucide-react';
import { Button } from "../ui/button";
import { Save } from 'lucide-react';

export default function QuestionComponent(props: Question) {
  const chatBotAttributes: ChatBotAttr | null = useRecoilValue(chatBotAttributesAtom) || null;
  const userIcon = chatBotAttributes?.userIcon || "https://www.plura.pro/_next/image?url=%2Fimages%2Fplura-logo.png&w=64&q=75";
  const [currentQuestion, setQuestion] = useRecoilState(questionFamily(props.id));
  const [editing, setEditing] = useState(false);
  const questionArea = useRef<HTMLParagraphElement | null>(null);
  const originalQuestion = useRef<string | null>(null); // This should hold a string

  function handleEdit() {
    if (questionArea.current) {
      questionArea.current.contentEditable = "true";
      setEditing(true);
      originalQuestion.current = questionArea.current.innerText;
      questionArea.current.focus();
    }
  }

  function handleSubmit() {
    if (questionArea.current) {
      questionArea.current.contentEditable = "false";
      setEditing(false);
      setQuestion(q => ({ ...q, question: questionArea.current!.innerText }));
    }
  }

  function handleCancel() {
    if (questionArea.current) {
      questionArea.current.contentEditable = "false";
      setEditing(false);
      questionArea.current.innerText = originalQuestion.current || "";
    }
  }

  return (
    <div className='py-5 flex flex-col flex-grow bg-transparent w-full'>
      <div className='flex gap-2 items-center max-w-full relative'>
        <span className="min-w-10">
          <img
            className="rounded-xl w-10 aspect-square object-cover"
            src={userIcon}>
          </img>
        </span>
        <p className={`m-0 text-left px-2 font-sans text-sm font-semibold text-foreground ${editing && 'bg-secondary p-3 rounded-md flex-grow border focus:outline-none'}`}
          ref={questionArea}>
          {currentQuestion.question}
        </p>
        {!editing &&
          <Button
            onClick={handleEdit}
            variant={"default"} className="text-muted-foreground hover:text-primary bg-secondary hover:bg-secondary selection-none p-2 h-6 absolute right-2 -bottom-2"
          >
            <Pencil className='!w-3' />
          </Button>
        }
      </div>
      {editing && (
        <div className='flex items-center justify-end gap-2 mt-3'>
          <Button
            onClick={handleSubmit}
            variant={'default'} className="text-muted-foreground bg-secondary hover:bg-secondary hover:text-primary selection-none p-2 h-7"
          >
            <Save  className='!w-3' />
            <span className='text-xs'>Save</span>
          </Button>
          <Button
            onClick={handleCancel}
            variant={'default'} className="text-muted-foreground bg-secondary hover:bg-secondary hover:text-primary selection-none p-2 h-7"
          >
            <X  className='!w-3' />
            <span className='text-xs'>Cancel</span>
          </Button>
        </div>
      )}
    </div>
  )
}