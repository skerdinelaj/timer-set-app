import { useTimersConstext } from "../store/timers-context";
import Timer from "./Timer";

export default function Timers() {
  const {timers} = useTimersConstext()
  return <ul>
    {timers.map(timer=>(
      <li key={timer.id}>
        <Timer {...timer}/>
      </li>
    )
    )
    }
  </ul>;
}
