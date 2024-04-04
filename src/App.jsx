import React from 'react'
import './App.css'
import { useState } from 'react'
import FileSystem from './component/FileSystem/FileSystem'
import { folder } from './config'
const App = () => {


  const [visibleItems, setVisibleItems] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [sortCriteria, setSortCriteria] = useState('timestamp'); // 'timestamp' or 'size'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Filter function to include search functionality
  const filterItems = (items, query) => {
    if (!query) {
      return items;
    }
    return items.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));
  };



  const sortItems = (items) => {
    return items.sort((a, b) => {
      if (sortCriteria === 'timestamp') {
        return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      } else if (sortCriteria === 'size') {
        const sizeA = parseInt(a.size);
        const sizeB = parseInt(b.size);
        return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA;
      }
    });
  };




  let displayedItems = searchInput ? filterItems(folder, searchInput) : visibleItems.length === 0 ? folder : visibleItems;
  displayedItems = sortItems(displayedItems);

  let subDisplayedItems = searchInput ? filterItems(visibleItems, searchInput) : visibleItems.length === 0 ? folder : visibleItems;
  subDisplayedItems = sortItems(subDisplayedItems);



  return (
    <div>
      {/* Header */}
      <div className='flex items-center'>
        <button onClick={() => setVisibleItems([])} className={`mx-6 px-5 py-2 bg-gray-900 text-white rounded-lg ${visibleItems.length ? 'block' : 'hidden'}`}>Back</button>
        <h2 className='text-5xl'>Welcome to Google Drive</h2>
      </div>

      {/* Navbar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="my-4 px-5 py-2  rounded-md border-solid border-[1px] border-black outline-none"
      />


      {/* Sorting controls */}
      <div>
        <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
          <option value="timestamp">Timestamp</option>
          <option value="size">Size</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort Order: {sortOrder.toUpperCase()}
        </button>
      </div>



      {/* MAIN VIEW */}
      <main className='grid grid-cols-4 gap-6 my-10'>
        <FileSystem setVisibleItems={setVisibleItems} visibleItems={visibleItems} folder={folder} displayedItems={displayedItems} subDisplayedItems={subDisplayedItems} />
      </main>

    </div>
  )
}

export default App
