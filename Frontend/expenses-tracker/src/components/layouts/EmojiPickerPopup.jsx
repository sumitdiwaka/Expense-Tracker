import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6 relative'>
            <div 
                className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                    {icon ? (
                        <span className='text-3xl'>{icon}</span>
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className=''>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>
            
            {isOpen && (
                <div className='absolute left-0 top-16 z-50 shadow-lg rounded-lg overflow-hidden'>
                    <div className='relative'>
                        <button 
                            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-10 cursor-pointer'
                            onClick={() => setIsOpen(false)}
                        >
                            <LuX /> 
                        </button>
                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                                onSelect(emojiData.emoji);
                                setIsOpen(false);
                            }}
                            width={350}
                            height={400}
                            searchPlaceholder="Search"
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;