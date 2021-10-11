import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { notes } from './notes';


function Violin() {
  return (
    <div className='flexbox'>
    {notes.map( (eachNote) => {
      // console.log(eachNote);
      // const {key, note, audio} = eachNote
      return <MusicNotes key={eachNote.key} eachNote={eachNote} /> 
    })}
    </div>
    );
  }
  
  
  const MusicNotes = (props) => {
    const {keycode, note, audio} = props.eachNote;
    // console.log(props.eachNote);
    
    const playAudio = (e) => {
      // console.log(audio);
      // console.log(inputRef.current.getAttribute('kbkey'));
      // console.log(e.key);

      if (inputRef.current.getAttribute('kbkey') === e.key){
        let audioToPlay = new Audio(audio);
        audioToPlay.currentTime = 2;
        audioToPlay.play();
      }
    }

    const inputRef = useRef();

    useEffect( ()=> {
      document.addEventListener('keypress', playAudio)
      return () => window.removeEventListener('keypress', playAudio)
    }, )

    return (
      <div ref={inputRef} kbkey={keycode} className='musicNote' onClick={playAudio}> Note {note.toUpperCase()} 
        <p> Press {note}  to play</p>
  </div>
  )
} 


ReactDom.render(<Violin />, document.getElementById('root'));