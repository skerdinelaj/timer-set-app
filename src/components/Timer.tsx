import { useEffect, useRef, useState } from 'react';
import { Timer as TimerProps } from '../store/timers-context.tsx';
import Container from './UI/Container.tsx';

export default function Timer({ name, duration }: TimerProps) {
  //this ref will hold the timer id
  const interval = useRef<number | null>(null)
  //this state will manage the remaining time
  const [remainingTime, setRemainingTime] = useState(duration * 1000)

  if (remainingTime <=0 && interval.current) {
    clearInterval(interval.current)
  }
//if we dont use useEffect it will end up in a infinite loop setInterval will recreate every 50miliseconds
  useEffect(
    () => {
      //setInterval is a js function that expects a functionaas a first param and second param is how many miliseconds will need to rerender the function
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 50)
      }, 50)
      interval.current = timer
      return ()=>clearInterval(timer)
    }, []
  )

  //is time in seconds and has 2 decimal after the dot
  const timeLeft = (remainingTime / 1000).toFixed(2)

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTime} /></p>
      <p>{timeLeft}</p>
    </Container>
  );
}
