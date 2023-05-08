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
    console.log({ sample })
    setEmojiInput(sample)
  }
  const handleClick = () => {
    setSearchQuery(emojiInput)
    setEmojiInput('')
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchApi = await fetch(`https://emojifinder.com/*/ajax.php?action=search&query=${searchQuery}`)
      const EmojiData = await fetchApi.json()
      console.log({ EmojiData })
      setEmojis(EmojiData.results)
    }
    fetchData()
  }, [searchQuery])

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
      {
        emojis ? emojis.map((item) => (
          <>
          <Popover content={content} trigger='click'>
            <span className='emojiSpan' onClick={()=> navigator.clipboard.writeText(String.fromCodePoint(parseInt(item.Code, 16)))}>{String.fromCodePoint(parseInt(item.Code, 16))}</span> &nbsp;
          </Popover>
          </>
        )) : null
      }

    </div>
  )

}