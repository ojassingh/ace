import { useFrame } from '@react-three/fiber';
import { useMotionValue, MotionConfigContext } from 'framer-motion';
import { useContext } from 'react';

function useTime() {
    var time = useMotionValue(0);
    var isStatic = useContext(MotionConfigContext).isStatic;
    !isStatic && useFrame(function (state) { return time.set(state.clock.getElapsedTime()); });
    return time;
}

export { useTime };
