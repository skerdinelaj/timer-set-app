import { Timer as TimerProps } from '../store/timers-context.tsx';
import Container from './UI/Container.tsx';

// type TimerProps = {
//   timer: Timer
// }

export default function Timer({ name, duration}: TimerProps) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
