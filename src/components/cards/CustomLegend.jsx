import React from 'react'
import {LiaRupeeSignSolid} from 'react-icons/lia'

function CustomLegend({payload}) {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
      {
        payload.map((entry, index)=>(
            <div
              className='flex items-center space-x-2'
              key={`legend-${index}`}
            >
                <div className='w-2.5 h-2.5 rounded-full'
                 style={{backgroundColor:entry.color}}
                >

                </div>
                <div className='flex flex-wrap items-center justify-center text-sx text-gray-700 font-medium'>
                    {entry.payload.name} = ₹ {entry.payload.value}
                </div>
            </div>
            
        ))
      }
    </div>
  )
}

export default CustomLegend
