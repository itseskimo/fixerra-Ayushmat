import React from 'react'

const FileSystem = ({visibleItems,setVisibleItems,displayedItems,subDisplayedItems}) => {
  return (
    <>
        
        {
          visibleItems.length === 0 &&
          <>
            {displayedItems.map((item,idx) => {
              if (item.format === 'folder') {
                return <span key={idx} className='bg-yellow-100 w-[200px] h-[200px] p-5 cursor-pointer' onClick={() => setVisibleItems(item.items)}>{item.title}</span>
              }
              return <span key={idx} className='bg-gray-200 w-[200px] h-[200px] p-5 cursor-pointer'>{item.title}</span>
            }
            )}
          </>
        }

        {subDisplayedItems?.map((ele,idx) => <span key={idx} className={`${visibleItems.length ? 'block' : 'hidden'} bg-gray-200 w-[200px] h-[200px] p-5 cursor-pointer`}>{ele.title}</span>)}

    </>
  )
}

export default FileSystem