import earthDay from "../textures/earth/earth_daymap.jpg";
import earthNight from "../textures/earth/earth_night.jpg";
import earthNormal from "../textures/earth/earth_normal.jpg";
import earthSpecular from "../textures/earth/earth_specular.jpg";
import earthClouds from "../textures/earth/earth_clouds.png";

import marsTexture from "../textures/mars.jpg";
import jupiterTexture from "../textures/jupiter.jpg";
import saturnTexture from "../textures/saturn.jpg";
import saturnRingTexture from "../textures/saturn_ring.png";
import sunTexture from "../textures/sun.jpg";
import mercuryTexture from "../textures/mercury.jpg";
import venusSurface from "../textures/venus_surface.jpg";
import uranusTexture from "../textures/uranus.jpg";
import neptuneTexture from "../textures/neptune.jpg";
import betelSurface from "../textures/betelgeuse_surface.jpg";
import { Text } from "@react-three/drei";
import { DeepBackgroundStars } from "./App";

import { useMemo } from "react";
import React, { useRef } from "react";
import { useEffect } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { TextureLoader } from "three";







function Orbit({ radius }) {

    const points = []

    for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2
        points.push(
            new THREE.Vector3(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            )
        )
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    return (
        <line geometry={geometry}>
            <lineBasicMaterial color="#9fd6ff" transparent opacity={0.09} />
        </line>
    )
}




export function SolarSystem({
    zoomLevel,
    hoveredPlanet,
    setHoveredPlanet,
    selectedPlanet,
    setSelectedPlanet
}) {

    const { camera } = useThree()

    const sunRef = useRef()


    const mercuryOrbit = useRef()
    const venusOrbit = useRef()
    const earthOrbit = useRef()
    const marsOrbit = useRef()
    const jupiterOrbit = useRef()
    const saturnOrbit = useRef()
    const saturnRing = useLoader(TextureLoader, saturnRingTexture)
    const uranusOrbit = useRef()
    const neptuneOrbit = useRef()

    const mercuryRef = useRef()
    const venusRef = useRef()
    const earthRef = useRef()
    const marsRef = useRef()
    const jupiterRef = useRef()
    const saturnRef = useRef()
    const uranusRef = useRef()
    const neptuneRef = useRef()

    const sun = useLoader(TextureLoader, sunTexture)
    const mercury = useLoader(TextureLoader, mercuryTexture)
    const venus = useLoader(TextureLoader, venusSurface)
    const earth = useLoader(TextureLoader, earthDay)
    const mars = useLoader(TextureLoader, marsTexture)
    const jupiter = useLoader(TextureLoader, jupiterTexture)
    const saturn = useLoader(TextureLoader, saturnTexture)
    const uranus = useLoader(TextureLoader, uranusTexture)
    const neptune = useLoader(TextureLoader, neptuneTexture)

    useEffect(() => {

        mercuryOrbit.current.rotation.y = Math.PI * 0.2
        venusOrbit.current.rotation.y = Math.PI * 0.45
        earthOrbit.current.rotation.y = Math.PI * 0.8
        marsOrbit.current.rotation.y = Math.PI * 1.2
        jupiterOrbit.current.rotation.y = Math.PI * 1.6
        saturnOrbit.current.rotation.y = Math.PI * 2.1
        uranusOrbit.current.rotation.y = Math.PI * 2.6
        neptuneOrbit.current.rotation.y = Math.PI * 3.0

    }, [])

    useEffect(() => {

        const handleKey = (e) => {

            if (e.key === "Escape") {
                setSelectedPlanet(null)
            }

        }

        window.addEventListener("keydown", handleKey)

        return () => {
            window.removeEventListener("keydown", handleKey)
        }

    }, [setSelectedPlanet])

    useFrame(() => {

        /* =========================
           CAMERA TRAVEL WHEN PLANET SELECTED
        ========================= */

        if (selectedPlanet) {

            let targetPlanet = null

            if (selectedPlanet === "mercury") targetPlanet = mercuryRef.current
            if (selectedPlanet === "venus") targetPlanet = venusRef.current
            if (selectedPlanet === "earth") targetPlanet = earthRef.current
            if (selectedPlanet === "mars") targetPlanet = marsRef.current
            if (selectedPlanet === "jupiter") targetPlanet = jupiterRef.current
            if (selectedPlanet === "saturn") targetPlanet = saturnRef.current
            if (selectedPlanet === "uranus") targetPlanet = uranusRef.current
            if (selectedPlanet === "neptune") targetPlanet = neptuneRef.current

            if (targetPlanet) {

                const planetPosition = new THREE.Vector3()
                targetPlanet.getWorldPosition(planetPosition)

                const cameraTarget = new THREE.Vector3(
                    planetPosition.x + 3,
                    planetPosition.y + 1.5,
                    planetPosition.z + 4
                )

                camera.position.lerp(cameraTarget, 0.03)
                camera.lookAt(planetPosition)
            }

            return
        }

        /* =========================
           ☀ SUN ROTATION
        ========================= */

        if (sunRef.current) {
            sunRef.current.rotation.y += 0.002
        }

        /* =========================
           PLANET SELF ROTATION
        ========================= */

        if (mercuryRef.current) mercuryRef.current.rotation.y += 0.01
        if (venusRef.current) venusRef.current.rotation.y += 0.008
        if (earthRef.current) earthRef.current.rotation.y += 0.02
        if (marsRef.current) marsRef.current.rotation.y += 0.018
        if (jupiterRef.current) jupiterRef.current.rotation.y += 0.04
        if (saturnRef.current) saturnRef.current.rotation.y += 0.038
        if (uranusRef.current) uranusRef.current.rotation.y += 0.03
        if (neptuneRef.current) neptuneRef.current.rotation.y += 0.028

        /* =========================
           ORBIT REVOLUTION
        ========================= */

        if (mercuryOrbit.current) mercuryOrbit.current.rotation.y += 0.004
        if (venusOrbit.current) venusOrbit.current.rotation.y += 0.003
        if (earthOrbit.current) earthOrbit.current.rotation.y += 0.002
        if (marsOrbit.current) marsOrbit.current.rotation.y += 0.0016
        if (jupiterOrbit.current) jupiterOrbit.current.rotation.y += 0.001
        if (saturnOrbit.current) saturnOrbit.current.rotation.y += 0.0008
        if (uranusOrbit.current) uranusOrbit.current.rotation.y += 0.0005
        if (neptuneOrbit.current) neptuneOrbit.current.rotation.y += 0.0003

    })

    return (
        <>
            <group
                onPointerMissed={() => {
                    setSelectedPlanet(null)
                }}
            >

                {/* Sun Light */}
                <pointLight
                    position={[0, 0, 0]}
                    intensity={50}
                    distance={1000}
                    decay={2}
                />

                {/* Sun */}
                <mesh ref={sunRef}>
                    <sphereGeometry args={[2, 64, 64]} />
                    <meshBasicMaterial map={sun} />
                </mesh>

                <Orbit radius={4} />
                <Orbit radius={7} />
                <Orbit radius={10} />
                <Orbit radius={15} />
                <Orbit radius={22} />
                <Orbit radius={30} />
                <Orbit radius={38} />
                <Orbit radius={46} />

                {/* MERCURY */}
                <group ref={mercuryOrbit}>
                    <mesh
                        ref={mercuryRef}
                        position={[4, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Mercury", speed: 170503 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("mercury")}
                    >
                        <sphereGeometry args={[0.3, 64, 64]} />
                        <meshStandardMaterial map={mercury} />
                    </mesh>
                </group>

                {/* VENUS */}
                <group ref={venusOrbit}>
                    <mesh
                        ref={venusRef}
                        position={[7, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Venus", speed: 126074 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("venus")}
                    >
                        <sphereGeometry args={[0.5, 64, 64]} />
                        <meshStandardMaterial map={venus} />
                    </mesh>
                </group>

                {/* EARTH */}
                <group ref={earthOrbit}>
                    <mesh
                        ref={earthRef}
                        position={[10, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Earth", speed: 107218 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("earth")}
                    >
                        <sphereGeometry args={[0.55, 64, 64]} />
                        <meshStandardMaterial map={earth} />
                    </mesh>
                </group>

                {/* MARS */}
                <group ref={marsOrbit}>
                    <mesh
                        ref={marsRef}
                        position={[15, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Mars", speed: 86642 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("mars")}
                    >
                        <sphereGeometry args={[0.45, 64, 64]} />
                        <meshStandardMaterial map={mars} />
                    </mesh>
                </group>

                {/* JUPITER */}
                <group ref={jupiterOrbit}>
                    <mesh
                        ref={jupiterRef}
                        position={[22, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Jupiter", speed: 47051 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("jupiter")}
                    >
                        <sphereGeometry args={[1.2, 64, 64]} />
                        <meshStandardMaterial map={jupiter} />
                    </mesh>
                </group>

                {/* SATURN */}
                <group ref={saturnOrbit}>
                    <group position={[30, 0, 0]}>

                        <mesh
                            ref={saturnRef}
                            onPointerOver={() => setHoveredPlanet({ name: "Saturn", speed: 34701 })}
                            onPointerOut={() => setHoveredPlanet(null)}
                            onClick={() => setSelectedPlanet("saturn")}
                        >
                            <sphereGeometry args={[1, 64, 64]} />
                            <meshStandardMaterial map={saturn} />
                        </mesh>

                        {/* Rings */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[1.4, 2.4, 128]} />
                            <meshStandardMaterial
                                map={saturnRing}
                                side={THREE.DoubleSide}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>

                    </group>
                </group>

                {/* URANUS */}
                <group ref={uranusOrbit}>
                    <mesh
                        ref={uranusRef}
                        position={[38, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Uranus", speed: 24477 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("uranus")}
                    >
                        <sphereGeometry args={[0.8, 64, 64]} />
                        <meshStandardMaterial map={uranus} />
                    </mesh>
                </group>

                {/* NEPTUNE */}
                <group ref={neptuneOrbit}>
                    <mesh
                        ref={neptuneRef}
                        position={[46, 0, 0]}
                        onPointerOver={() => setHoveredPlanet({ name: "Neptune", speed: 19566 })}
                        onPointerOut={() => setHoveredPlanet(null)}
                        onClick={() => setSelectedPlanet("neptune")}
                    >
                        <sphereGeometry args={[0.75, 64, 64]} />
                        <meshStandardMaterial map={neptune} />
                    </mesh>
                </group>

            </group>
        </>
    )


}





function StellarSmoke({ texture, radius = 38 }) {

    const ref = useRef()

    const data = useMemo(() => {

        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)

        const surface = new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        )

        const diagonal = new THREE.Vector3(-1, 1, 0).normalize()

        return {
            base: surface,
            dir: diagonal,
            life: Math.random(),
            speed: 2 + Math.random() * 2
        }

    }, [radius])


    useFrame((state, delta) => {

        if (!ref.current) return

        data.life += delta * 0.3

        const move = data.dir.clone().multiplyScalar(data.life * data.speed)

        ref.current.position.copy(data.base.clone().add(move))

        ref.current.material.opacity = 1 - data.life

        ref.current.rotation.z += delta * 0.2

        if (data.life > 1) {

            data.life = 0

            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos((Math.random() * 2) - 1)

            data.base.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            )

        }

    })


    return (
        <mesh ref={ref} position={data.base}>

            <planeGeometry args={[12, 12]} />

            <meshBasicMaterial
                map={texture}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />

        </mesh>
    )
}


/* =========================
   ⭐ BETELGEUSE SYSTEM
========================= */

export function BetelgeuseSystem(zoomLevel) {

    const starRef = useRef()
    const materialRef = useRef()
    const count = 70

    const surfaceTexture = useLoader(
        TextureLoader,
        "/textures/betelgeuse_surface.jpg"
    )

    const plasmaTexture = useLoader(
        TextureLoader,
        "/textures/plasma_ribbon2.png"
    )

    plasmaTexture.wrapS = THREE.RepeatWrapping
    plasmaTexture.wrapT = THREE.RepeatWrapping

    useFrame(({ clock }) => {

        const t = clock.getElapsedTime()

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = t
        }

    })

    return (

        <group>


            {/* STAR LIGHT */}

            <pointLight
                position={[0, 0, 0]}
                intensity={450}
                distance={5000}
            />

            {/* BETELGEUSE SURFACE */}

            <mesh ref={starRef}>

                <sphereGeometry args={[38, 128, 128]} />

                <shaderMaterial
                    ref={materialRef}

                    uniforms={{
                        uTime: { value: 0 },
                        uTexture: { value: surfaceTexture }
                    }}

                    vertexShader={`

            varying vec2 vUv;

            void main(){

              vUv = uv;

              gl_Position =
                projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);

            }

          `}

                    fragmentShader={`

            uniform float uTime;
            uniform sampler2D uTexture;

            varying vec2 vUv;

            void main(){

              vec2 uv = vUv;

              uv.x += sin(uv.y*6.0 + uTime*0.2)*0.01;
              uv.y += cos(uv.x*5.0 + uTime*0.2)*0.01;

              vec3 tex = texture2D(uTexture, uv).rgb;

              tex *= vec3(1.6,0.9,0.5);

              gl_FragColor = vec4(tex,1.0);

            }

          `}
                />

            </mesh>

            <>
                {Array.from({ length: 30 }).map((_, i) => (
                    <StellarSmoke key={i} texture={plasmaTexture} />
                ))}
            </>



        </group>

    )

}




/* =========================
   ⭐ PROXIMA SYSTEM
========================= */
export function ProximaSystem({ zoomLevel }) {
    return (
        <group position={position}>

            {/* Proxima Star */}
            <mesh>
                <sphereGeometry args={[8, 64, 64]} />
                <meshBasicMaterial color="red" />
            </mesh>

            {/* Planet */}
            <mesh position={[20, 0, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="gray" />
            </mesh>

            <DeepBackgroundStars />

        </group>
    );
}

/* =========================
   ⭐ ALPHA CENTAURI SYSTEM
========================= */
export function AlphaSystem({ }) {
    return (
        <group position={position}>

            <mesh>
                <sphereGeometry args={[8, 64, 64]} />
                <meshBasicMaterial color="blue" />
            </mesh>

            <mesh position={[18, 0, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="yellow" />
            </mesh>

            <DeepBackgroundStars />

        </group>
    );
}

/* =========================
   ⭐ VEGA SYSTEM
========================= */
export function VegaSystem({ }) {
    return (
        <group position={position}>

            <mesh>
                <sphereGeometry args={[8, 64, 64]} />
                <meshBasicMaterial color="cyan" />
            </mesh>

            <mesh position={[25, 0, 0]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>

            <DeepBackgroundStars />

        </group>
    );
}









/* =========================
   ⭐ RIGEL SYSTEM
========================= */
export function RigelSystem({ }) {
    return (
        <group position={position}>

            <mesh>
                <sphereGeometry args={[8, 64, 64]} />
                <meshBasicMaterial color="purple" />
            </mesh>

            <mesh position={[22, 0, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="lightblue" />
            </mesh>

            <DeepBackgroundStars />

        </group>
    );
}





export function BlackHoleSystem() {

    const coreTexture = useLoader(TextureLoader, "/blackhole1.png")

    const materialRef = useRef()

    useFrame((state, delta) => {

        if (materialRef.current) {
            materialRef.current.rotation += delta * 0.04   // faster visible rotation
        }

    })

    return (

        <group>

            {/* Black Hole */}

            <sprite scale={[100, 60, 1]}>
                <spriteMaterial
                    ref={materialRef}
                    map={coreTexture}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    toneMapped={false}
                />
            </sprite>

        </group>

    )

}

/* =========================
   ⭐ DEFAULT SYSTEM
========================= */
export function DefaultSystem({ }) {
    return (
        <group position={position}>

            <mesh>
                <sphereGeometry args={[8, 64, 64]} />
                <meshBasicMaterial color="orange" />
            </mesh>

            <DeepBackgroundStars />

        </group>
    );
}

/* =========================
   ⭐ ROUTER
========================= */
export function StarSystemRouter({ destination, zoomLevel }) {

    if (destination === "betelgeuse") {
        return <BetelgeuseSystem />
    }

    if (destination === "proxima") {

        return <ProximaSystem />
    }

    if (destination === "alpha") {

        return <AlphaSystem />
    }

    if (destination === "vega") {

        return <VegaSystem />
    }

    if (destination === "rigel") {

        return <RigelSystem />
    }
    if (destination === "blackhole")
        return <BlackHoleSystem />


    return null
}