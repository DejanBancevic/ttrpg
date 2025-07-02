import React from 'react'

const HoverInfo = () => {
    return (
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-2
         bg-blackButtonBackground border border-gray rounded opacity-0
         group-hover:opacity-100 transition-opacity pointer-events-none'>
           
            <h1 className='text-white text-center'>
                Right click the spell level box to delete it.
            </h1>
        </div>
    )
}

export default HoverInfo