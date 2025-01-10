import { ChatBotAttr } from '@/types'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import ChatArea from './chatArea';
import Input from './inputArea';
import { chatBotAttributes } from '../../store/atoms/attributesData';
import { chatWindowState } from '../../store/atoms/chatWindowState';


export default function ChatBotContanier({
    prompt,
    userIcon,
    botIcon,
    chatBotWrapperStyle,
    chatWindowStyle,
    chatBotIconClassName,
    startOpen,
    authToken
}: ChatBotAttr) {
    const setAttributeData = useSetRecoilState(chatBotAttributes)
    const [open, setWindowOpen] = useRecoilState(chatWindowState)

    useEffect(() => {
        if (!document.getElementById("font-awesome-script")) {
            const script = document.createElement("script");
            script.src = "https://kit.fontawesome.com/b6fe51c8e7.js";
            script.id = "font-awesome-script";
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);
            setWindowOpen(startOpen ? true : false)
        }
    }, []);

    useEffect(() => {
        setAttributeData({ authToken, prompt, botIcon, userIcon })
    }, [authToken, prompt, botIcon, userIcon])

    return (
        <div className={`flex flex-col items-end justify-end !h-[690px] w-[420px] gap-2 font-sans antialiased ${!open && `h-min w-min `} ${chatBotWrapperStyle}`}>
            <div className={`font-sans bg-background rounded-2xl p-[0.6rem] box-border flex flex-col justify-end items-center
         w-full h-full min-w-[270px] min-h-[300px] antialiased text-lg relative backdrop-blur-sm border border-border/60 
          dark:border-border ${!open && ` w-0 h-0 hidden `} ${chatWindowStyle}}`}>
                <ChatArea />
                <Input />
            </div>
            {<div className={`cursor-pointer rounded-2xl w-[3.8rem] aspect-[1/1] bg-secondary/50 text-secondary-foreground bg-cover bg-center flex items-center justify-center text-2xl hover:grayscale-0 hover:rotate-2 ${chatBotIconClassName}`} onClick={() => setWindowOpen(!open)}>
                <span>
                    <img src="https://www.plura.pro/_next/image?url=%2Fimages%2Fplura-logo.png&w=64&q=75" alt="plura" className="w-8 h-8" />
                </span>
            </div>}
        </div>
    )
}
