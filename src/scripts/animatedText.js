import { animate } from "motion"
import { useMotionValue } from "motion/react"
import { useEffect, useState } from "react"

function useAnimatedText(text, dur = 5) {
    let animatedCursor = useMotionValue(0);
    let [currChar, setCurrChar] = useState(0)

    useEffect(() => {
        let animation = animate(animatedCursor, text.length, {
            duration: dur,
            ease: "linear",
            onUpdate(latest) {
                setCurrChar(Math.floor(latest))
            },
        })
        
        return () => animation.stop()   
    }, [animatedCursor, text.length])
    return text.slice(0, currChar)
} export default useAnimatedText