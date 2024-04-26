import { ReactNode, createContext, useContext, useReducer, useState } from "react";

export type Timer = {
    name: string
    duration: number
    id?: number
}

type TimersState = {
    isRunnig: boolean
    timers: Timer[]
}

const initialState: TimersState = {
    isRunnig: false,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void
    startTimer: () => void
    stopTimer: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null)

// useTimersConstext is a costum hook that is just a regular function that start with 
//"use" is regonised by react as a hook function and must be called inside the component or in another hook
export function useTimersConstext() {
    const timersctx = useContext(TimersContext)
    if (timersctx === null) {
        throw new Error("Something went wrong, TimersContext shouldn't be null")
    }
    return timersctx
}


type TimersContextProviderProps = {
    children: ReactNode
}

//reducer (timersReducer) function takes two params state and action
//state is the old state before it was updated
//action is the message that you will send with the help of dispatch

type AddTimer = {
    type: "ADD_TIMER"
    payload: Timer
}

type StartTimer = {
    type: "START_TIMER"
}

type StopTimer = {
    type: "STOP_TIMER"
}

type Action = AddTimer | StartTimer | StopTimer;

function timersReducer(state: TimersState, action: Action): TimersState {
    if (action.type === "START_TIMER") {
        return {
            ...state,
            isRunnig: true
        }
    }else if (action.type === "STOP_TIMER") {
        return{
            ...state,
            isRunnig: false
        }
    }else if (action.type === "ADD_TIMER") {
        return {
            ...state,
            timers:[
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration,
                    id: Math.random()
                }
            ]
        }
    }
    return state

}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {
    
    //useReducer is like use state but for more complex state managment, 
    //initialstate is the state
    //refucer(timersReducer) is a function that is executed by react whenever we dispatch a new action and is responsible for generating a new state
    //use reducer returns an array with 2 elements 
    //the first element is the current state managed by useReducer
    //the second element is dispatch witch allows to trigger a state change
    //the idea of useReducer is that we can send messages that will lead to the generation of new state
    const [timersState, dispatch] = useReducer(timersReducer, initialState)
    
    //with useState
    //const [state, setState] = useState<TimersState>(initialState)
    
    const ctx: TimersContextValue = {
        // timers: state.timers,
        // isRunnig: state.isRunnig,

        timers: timersState.timers,
        isRunnig: timersState.isRunnig,
        addTimer(timerData) {
            // setState(prevState => ({
            //     ...prevState,
            //     timers: [
            //         ...prevState.timers,
            //         {
            //             name: timerData.name,
            //             duration: timerData.duration,
            //             id: Math.random()
            //         }
            //     ]
            // }))
            dispatch({type: "ADD_TIMER", payload: timerData})
        },
        startTimer() {
            // setState(prevState => (
            //     {
            //         ...prevState,
            //         isRunnig: true
            //     }
            // ))
            dispatch({type: "START_TIMER"})
        },
        stopTimer() {
            // setState(prevState => ({
            //     ...prevState,
            //     isRunnig: false
            // }))
            dispatch({type: "STOP_TIMER"})
        },

    }
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}