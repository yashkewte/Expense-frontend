import React from 'react'
import {getInitials} from '../../utils/helper'

function CharAvatar({fullName, width, height, style}) {
  return (
    <div className={`${width || 'w-12'} ${height || h-12} ${style || ''} flex items-center justify-center rounded-full text-900 font-medium bg-gray-100`}>
      {getInitials(fullName || '')}
    </div>
  )
}

export default CharAvatar
