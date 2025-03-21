import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import {LuImage, LuX} from 'react-icons/lu'

function EmojiPickerPopup({icon, onSelect}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className=''>
      <div className='' onClick={()=> setIsOpen(true)}>
        <div className=''>
            {icon? (
                <img src={icon} alt="Icon"  className=''/>
            ) : (
                <LuImage />
            ) }
        </div>
        <p className=''>{icon? 'Change Icon':'Pick Icon'}</p>
      </div>
      {
        isOpen && (
            <div className=''>
                <button 
                 className=''
                 onClick={()=> setIsOpen(false)}
                >
                    <LuX/>
                </button>
                <EmojiPicker
                 open={isOpen}
                 onEmojiClick={(emoji)=>onSelect(emoji?.imageUrl || '')}
                />
            </div>
        )
      }
    </div>
  )
}

export default EmojiPickerPopup
