import { useEffect, useState } from 'react'

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
  }
  export const startSeconds = 10

  const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(startSeconds)
  
    useEffect(() => {
      setSeconds(props.seconds)
    }, [props.seconds])
  
    useEffect(() => {
      props.onChange(seconds)
    }, [seconds])
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000);
      return () => { clearInterval(intervalId) }
    }, [props.timerKey])
  
    return (
      <div>
        Timer: {seconds}
      </div>
    )
  }
  
  export default Timer