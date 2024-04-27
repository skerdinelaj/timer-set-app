import { useEffect, useState } from 'react';
import { Timer as TimerProps, useTimersConstext } from '../store/timers-context.tsx';
import Container from './UI/Container.tsx';

export default function Timer({ name, duration }: TimerProps) {
  //this state will manage the remaining time
  const [remainingTime, setRemainingTime] = useState(duration * 1000)
  const {isRunnig} = useTimersConstext()
//if we dont use useEffect it will end up in a infinite loop setInterval will recreate every 50miliseconds
  useEffect(
    () => {
      //setInterval is a js function that expects a functio as a first param and second param is how many miliseconds will need to rerender the function
      const timer = setInterval(() => {
        if (isRunnig) {
          setRemainingTime(prevTime => {
            if (prevTime<= 0) {
              return 0
            }
            return prevTime - 50})
        }
        return remainingTime
      }, 50)
      return ()=>clearInterval(timer)
    }, [isRunnig]
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
