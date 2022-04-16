import { useEffect, useRef } from 'react'

function useDebounce(callback: Function, delay: number = 300) {
    const timer: { current: NodeJS.Timeout | null } = useRef(null)

    useEffect(() => {
        timer.current = setTimeout(() => callback(), delay)
        return () => clearInterval(timer.current as NodeJS.Timeout)
    }, [delay, callback])

}

export default useDebounce