import Button from './UI/Button.tsx';
import { useTimersConstext } from '../store/timers-context.tsx';

export default function Header() {
  const timerCtx = useTimersConstext()
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={()=>timerCtx.isRunnig ? timerCtx.stopTimer() : timerCtx.startTimer()}>{timerCtx.isRunnig ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
