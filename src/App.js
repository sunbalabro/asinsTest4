import logo from './logo.svg';
import './App.css';
import { SearchEmoji } from './Component/SearchEmoji';
import { useState } from 'react';

function App() {
  const [selectedEmoji , setSelectedEmoji] = useState('')
  const handleEmojiSelect = (emoji) =>{
      setSelectedEmoji(emoji)
  }
  return (
    <div className="App">
      <SearchEmoji onEmojiSelect={handleEmojiSelect} />
      <span>{selectedEmoji}</span>
    </div>
  );
}

export default App;
