import React, { useEffect, useState } from 'react';
import Button from './elements/Button';
import Tip from './elements/Tip';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState('text-muted');
  let visibility = '';

  useEffect(() => {
    let interval;
    if (running) {
      setColor('text-black');
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000);
      }, 1000);
    } else if (!running) {
      setColor('text-muted');

      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <>
      <div
        className={`flex gap-6 justify-center text-center p-3 mt-6 ${color}`}
      >
        <div>
          <p>hr</p>
          <h1>{('0' + Math.floor((time / 3600000) % 60)).slice(-2)}</h1>
        </div>
        <div>
          <p>min</p>
          <h1>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}</h1>
        </div>
        <div>
          <p>sec</p>
          <h1>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</h1>
        </div>
      </div>
      {running ? (
        <Button
          bg='danger'
          className='p-4 mt-6'
          onClick={() => setRunning(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
      ) : (
        <>
          <Button
            bg='solid'
            className='p-4 mt-6'
            onClick={() => setRunning(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
            </svg>
          </Button>
        </>
      )}
      <>
        {running === false && time > 0 ? <Tip></Tip> : ''}
      </>
    </>
  );
}
