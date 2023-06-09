import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchEmoji = () => {

  const [emojis, setEmojis] = useState([])
  const [emojiInput, setEmojiInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const content = (
    <div>
      <p>Copied</p>
    </div>
  );
  const handleChange = (e) => {
    const sample = e.target.value
    setEmojiInput(sample)
  }
  const handleClick = () => {
    setSearchQuery(emojiInput)
    setEmojiInput('')
  }

  useEffect(()=>{
    const fetchData = async () =>{
      if(searchQuery === ""){
        setEmojis([])
      }else{
        const fetchApi = await fetch(`https://emoji-api.com/emojis?search=${searchQuery}&access_key=6d59e42299c7abd98d2334ea89d4b69c8caba754`)
        const EmojiData = await fetchApi.json()
        setEmojis(EmojiData)
      }
      
    }
    fetchData()
  } , [searchQuery])
  return (
    <div className='pickerSelection'>
      <h1>Search Emoji</h1>
      <div className='h_find'>
        
            <input onChange={(e) => handleChange(e)} placeholder='Search Emoji' value={emojiInput} />
            <button
              onClick={() => handleClick()}
            ><FontAwesomeIcon icon={faSearch} />
            </button>

      </div>

      <br />
      
        <div>
        {
          emojis == null ? (<h1>Emoji Not found</h1>) : emojis.map((item) => (
            <>
            <Popover content={content}  className='emojiSpan' trigger='click'>
              <span onClick={()=> navigator.clipboard.writeText(item.character)}>
                {item.character}
                </span> &nbsp;
            </Popover>
            </>
          ))
        }
        
        </div>
    </div>
  )

}