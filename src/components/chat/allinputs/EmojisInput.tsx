
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
export default function EmojisInput({setContent}:{
    setContent:(content:any) => void
}) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [pickerWidth, setPickerWidth] = useState<number>(250);
    
    const handleEmojiClick = (emoji: any) => {
        setContent((prev:any) => {
            return {...prev,text:prev.text + emoji.emoji}
        })
    };
    useEffect(() => {
        const updatePickerWidth = () => {

            const screenWidth = window.innerWidth;
            const newWidth =Math.min(Math.max(250,screenWidth / 4),350); 
            setPickerWidth(newWidth);
        };

        updatePickerWidth();
        window.addEventListener("resize", updatePickerWidth);

       
        return () => {
            window.removeEventListener("resize", updatePickerWidth);
        };
    }, []);
    useEffect(() => {
        function handleOutsideClick(event: any) {
            const overlay = document.querySelector(".background");
            if (overlay && !overlay.contains(event.target)) {
              
              setShowPicker(false)
            }
          }
      
          document.body.addEventListener("click", handleOutsideClick);
      
          return () => {
            document.body.removeEventListener("click", handleOutsideClick);
          };
    },[showPicker])
    return (
        <div className="relative"> 
            <FaSmile className="text-blue-400 text-2xl cursor-pointer hover:opacity-60 transition-all duration-200" onClick={() => setShowPicker(prev => !prev)}/>
            {showPicker && (
                <div className="absolute -top-[29rem] md:-left-[12rem] -left-[11rem] max-[300px]:-left-[11rem] background">
                    <EmojiPicker lazyLoadEmojis width={pickerWidth} onEmojiClick={handleEmojiClick} />
                </div>
            )}
            
        </div>
    )
}