import { StylesProvider } from "@chakra-ui/react";
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
    return(<div className={styles.container}>
        <Canvas
        dpr={value}
        gl={{antialias:true}}
        camera={{ position: [0, 0, 6] }}
        linear>
        <ambientLight intensity={0.65}/>
        <directionalLight intensity={0.7} position={[5, 4, 10]} />
        <color attach="background" args={[0x000000]} />
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
                color={0x05970}
                wireframe = {true}
                />
            </motion.mesh>
        </motion.group>
        {/* <OrbitControls/> */}
        </Canvas>
    </div>)
}

export default Torus;