import { Canvas } from "@react-three/fiber"
import styles from "../styles/Torus.module.scss"
import { motion } from "framer-motion-3d";
import { useRef } from "react";

const Torus = () => {
    const value = 0;
    if (typeof window !== "undefined") {
        value = window.devicePixelRatio;
    }
    const myMesh = useRef();
    return(<div className='h-128 w-150 bg-beige'>
        <Canvas
        dpr={value}
        gl={{antialias:true}}
        camera={{ position: [0, 0, 6] }}
        linear>
        <ambientLight intensity={0.75}/>
        <directionalLight intensity={0.7} position={[5, 4, 10]} />
        <color attach="background" args={[0xFCFCFC]} />
        <motion.group 
        animate={{
            rotateX: 3.14*2,
            rotateY: 3.14*2
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 6,
          }}>
            <motion.mesh ref={myMesh}>
                <torusKnotGeometry
                args={[2, 0.5, 300, 20, 6, 10]}
                />
                <meshPhongMaterial 
                color={0x1A56DA}
                wireframe = {true}
                />
            </motion.mesh>
        </motion.group>
        {/* <OrbitControls/> */}
        </Canvas>
    </div>)
}

export default Torus;