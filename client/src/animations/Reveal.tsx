import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
    children: JSX.Element;
    width?: "fit-content" | "100%"
}

export const Reveal = ({children, width = "fit-content"}:Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {once:true})
    const mainControls = useAnimation()
    const slideControls = useAnimation()
    useEffect(()=>{
        if(isInView){
            mainControls.start("visibleReveal")
            slideControls.start("visibleReveal")
        }
    },[isInView])
    return(
        <div ref={ref} style={{position:'relative', width, overflow:'hidden'}}>
            <motion.div
                variants={{
                    hiddenReveal: {opacity: 0, y:75},
                    visibleReveal: {opacity: 1, y:0},
                }}
                initial="hiddenReveal"
                animate={mainControls}
                transition={{duration:0.5, delay:0.25}}
            >{children}</motion.div>
            <motion.div
                variants={{
                    hiddenReveal: {left: 0},
                    visibleReveal: {left: "100%"},
                }}
                initial="hiddenReveal"
                animate={slideControls}
                transition={{duration:0.5, ease:"easeIn"}}
                style={{
                    position: "absolute",
                    top:4,
                    bottom:4,
                    left:0,
                    right:0,
                    background:"#a1a1a1",
                    zIndex:20
                }}
            />
        </div>
    )
}