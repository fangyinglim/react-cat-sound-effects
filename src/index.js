import React, { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { notes } from './notes';

function SoundEffects() {

  return (
    <div className='flexbox'>
    {notes.map( (eachNote) => {
      return <SoundEffect key={eachNote.key} eachNote={eachNote} /> 
    })}
    </div>
    );
  }
  
  
  const SoundEffect = (props) => {
    const {keycode, sound, audio} = props.eachNote;

    
    
    const playAudio = (e) => {
      if (inputRef.current.getAttribute('kbkey') === e.key){
        inputRef.current.className += ' playing'
        let audiosrc = audioRef.current.getAttribute('src');
        let audioToPlay = new Audio(audiosrc);
        audioToPlay.play();
        
      }
    }

    const handleTransition = (e) => {
        inputRef.current.className = 'sound';
    }

    const inputRef = useRef();
    const audioRef = useRef();

    //play audio if selected key is down
    useEffect( ()=> {
      document.addEventListener('keydown', playAudio)
      return () => window.removeEventListener('keydown', playAudio) //cleanup
    })
 
    return (
      <div onTransitionEnd={handleTransition}  ref={inputRef} kbkey={keycode} className='sound'> 
        <h1> {keycode.toUpperCase()}</h1>
        <p> {sound}</p>
        <audio>
           <source ref={audioRef} src={audio} type="audio/wav"></source>
        </audio>
  </div>
  )
} 


ReactDom.render(<SoundEffects />, document.getElementById('root'));