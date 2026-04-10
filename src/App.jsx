import { StarSystemRouter, SolarSystem } from "./StarSystem";
import { Stars } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";



function Sun({ opacity }) {


  return (
    <mesh>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        color="#ff8c32"        // strong orange base
        emissive="#ff5e00"     // deep orange glow
        emissiveIntensity={3.6}
        metalness={0}
        roughness={1}
        transparent
        opacity={opacity}
      />

    </mesh>
  );
}







export function DeepBackgroundStars() {
  const groupRef = useRef();



  const stars = useMemo(() => {
    const positions = [];
    const count = 35000;

    for (let i = 0; i < count; i++) {
      const r = 100000;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
    }
  });



  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={stars}
            count={stars.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <shaderMaterial
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 1.5;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
          fragmentShader={`
          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.18);
          }
        `}
        />

      </points>
    </group>
  );
}



function GalaxyField({ setTargetPosition, setCameraMode }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <DeepSpace />
      <BrightStars
        setTargetPosition={setTargetPosition}
        setCameraMode={setCameraMode}
      />
    </group>
  );
}





function Galaxy({ setTargetPosition, setCameraMode, setDestination, controlsRef, setHoveredStar, travelRef }) {
  const groupRef = useRef();

  const galaxyData = useMemo(() => {

    const positions = [];
    const colors = [];

    const count = 25000;
    const arms = 4;
    const maxRadius = 1200;
    const spiralTightness = 0.04;
    const armWidth = 0.25;

    for (let i = 0; i < count; i++) {

      const r = Math.pow(Math.random(), 1.4) * maxRadius;

      const armIndex = Math.floor(Math.random() * arms);
      const baseAngle = (armIndex / arms) * Math.PI * 2;

      let angle =
        baseAngle +
        r * spiralTightness;

      // 🟣 DESTROY spiral near core
      const coreBlend = Math.exp(-r / 200.0);

      // random swirl inside bulge
      angle += (Math.random() - 0.5) * 2.0 * coreBlend;

      // normal arm thickness outside
      angle += (Math.random() - 0.5) * armWidth * (1.0 - coreBlend);


      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 80;

      positions.push(x, y, z);

      const t = r / maxRadius;

      const core = new THREE.Color(1.0, 0.95, 0.8);
      const arm = new THREE.Color(0.6, 0.75, 1.0);
      const dust = new THREE.Color(1.0, 0.55, 0.3);

      const mixed = core.clone()
        .lerp(arm, t)
        .lerp(dust, t * 0.5);

      colors.push(mixed.r, mixed.g, mixed.b);
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };

  }, []);


  const geometry = useMemo(() => {

    const g = new THREE.BufferGeometry();

    g.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyData.positions, 3)
    );

    g.setAttribute(
      "color",
      new THREE.BufferAttribute(galaxyData.colors, 3)
    );

    return g;

  }, [galaxyData]);





  useFrame((_, delta) => {

    if (travelRef.current) return;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }

  });





  return (
    <group ref={groupRef}>
      {/* Galaxy Star Field */}
      <points geometry={geometry} raycast={() => null}>

        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          toneMapped={false}

          vertexShader={`

varying vec3 vColor;

void main(){

  vColor = color;

  vec4 mvPosition = modelViewMatrix * vec4(position,1.0);

  // ⭐ minimum must be around 6–10 for circle to form
  gl_PointSize = clamp(200.0 / -mvPosition.z, 1.0, 3.0);

  gl_Position = projectionMatrix * mvPosition;
}
`}

          fragmentShader={`
 void main() {

  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  if (dist > 0.5) discard;

  float glow = 1.0 - smoothstep(0.5, 0.5, dist);

  vec3 purple = vec3(0.55, 0.0, 1.0);

   gl_FragColor = vec4(purple * glow * 2.0, glow);

}

            `}


        />

      </points>


      {/* Clickable Bright Stars INSIDE galaxy */}
      <BrightStars
        setTargetPosition={setTargetPosition}
        setCameraMode={setCameraMode}
        setDestination={setDestination}
        controlsRef={controlsRef}
        setHoveredStar={setHoveredStar}
        travelRef={travelRef}
      />
    </group>
  );
}




function BrightStar({ position, onSelect, onHover, onLeave }) {


  const texture = useLoader(TextureLoader, "/shine.png");
  const spriteRef = useRef();
  const [hovered, setHovered] = useState(false);


  useFrame(({ camera }) => {
    if (!spriteRef.current) return;

    const distance = camera.position.distanceTo(
      spriteRef.current.position
    );

    const baseSize = 30;  // YOU control overall size here

    // deterministic variation (not random each reload)
    const variation =
      0.5 +
      0.3 *
      (Math.abs(
        Math.sin(
          spriteRef.current.position.x * 12.9898 +
          spriteRef.current.position.z * 78.233
        )
      ));

    const rawSize = (baseSize * variation) / (distance * 0.04);

    // 🔥 Minimum size clamp
    const size = Math.max(rawSize, 10);

    const hoverBoost = hovered ? 1.4 : 1;

    spriteRef.current.scale.set(
      size * hoverBoost,
      size * hoverBoost,
      1
    );
  });


  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  return (
    <sprite
      ref={spriteRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        onHover();
      }}

      onPointerOut={() => {
        setHovered(false);
        onLeave();
      }}
      onClick={onSelect}
    >
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}





function BrightStars({ setTargetPosition, setCameraMode, setDestination, controlsRef, setHoveredStar, travelRef }) {

  const stars = useMemo(() => {

    const result = [];

    const starCount = 12;
    const maxRadius = 550;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < starCount; i++) {

      const r = 120 + (i / starCount) * maxRadius;
      const theta = goldenAngle * i;

      const spiralOffset = r * 0.03;
      const finalAngle = theta + spiralOffset;

      const x = Math.cos(finalAngle) * r;
      const z = Math.sin(finalAngle) * r;
      const y = (i - starCount / 2) * 4;

      // 🔥 destination ALWAYS INSIDE galaxy
      const inwardFactor = 0.65;

      const targetX = x * inwardFactor;
      const targetZ = z * inwardFactor;
      const targetY = y * 0.3;

      result.push({
        portal: [x, y, z],
        target: [targetX, targetY, targetZ],
        system:
          i === 0 ? "betelgeuse" :
            i === 1 ? "proxima" :
              i === 2 ? "alpha" :
                i === 3 ? "rigel" :
                  i === 4 ? "vega" :
                    "deep",

        name:
          i === 0 ? "Betelgeuse" :
            i === 1 ? "Proxima Centauri" :
              i === 2 ? "Alpha Centauri" :
                i === 3 ? "Rigel" :
                  i === 4 ? "Vega" :
                    "Deep Space"

      });

    }

    return result;

  }, []);

  return (
    <>
      <BrightStar
        position={[0, 0, 0]}
        onHover={() => setHoveredStar({ name: "Supermassive Black Hole" })}
        onLeave={() => setHoveredStar(null)}
        onSelect={() => {
          travelRef.current = true;
          controlsRef.current?.reset();

          setDestination("blackhole");
          setTargetPosition([0, 0, 0]);
          setCameraMode("travel");
        }}
      />
      {stars.map((star, index) => (
        <BrightStar
          key={index}
          position={star.portal}
          onHover={() => setHoveredStar({ name: star.name })}
          onLeave={() => setHoveredStar(null)}
          onSelect={() => {
            travelRef.current = true;   // 🔒 LOCK THIS FRAME
            controlsRef.current?.reset();

            setDestination(star.system);   // ⭐ IMPORTANT
            setTargetPosition(star.target);
            setCameraMode("travel");

          }}
        />
      ))}
    </>
  );
}




function TravelController({ cameraMode, targetPosition, onArrive }) {
  const { camera } = useThree();



  useFrame(() => {

    if (cameraMode === "travel") {
      console.log("TRAVEL MODE ACTIVE");
    }

    if (cameraMode !== "travel" || !targetPosition) return;






    if (cameraMode !== "travel" || !targetPosition) return;

    const starPos = new THREE.Vector3(
      targetPosition[0],
      targetPosition[1],
      targetPosition[2]
    );

    const direction = starPos.clone().normalize();

    const target = starPos.clone().sub(
      direction.multiplyScalar(120)
    );

    const lookTarget = new THREE.Vector3(
      targetPosition[0],
      targetPosition[1],
      targetPosition[2]
    );

    camera.position.lerp(target, 0.03);
    camera.lookAt(lookTarget);

    const distance = camera.position.distanceTo(target);

    if (distance < 5) {
      onArrive();
    }

  });

  return null;
}



function DistanceTracker({ setZoomLevel, setCameraMode, cameraMode, travelRef }) {
  const { camera } = useThree();

  useFrame(() => {

    const betelgeusePosition = new THREE.Vector3(0, 0, 0)
    const distance = camera.position.distanceTo(betelgeusePosition)

    setZoomLevel(distance)

    if (travelRef.current) return

    if (distance > 420 && cameraMode !== "deepSpace") {
      setCameraMode("deepSpace")
    }

    if (distance < 60 && cameraMode !== "explore") {
      setCameraMode("explore")
    }

  })

  return null;
}




function Planet({ data, setHoveredPlanet }) {
  const planetRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2); // random start angle

  useFrame((state, delta) => {
    if (!planetRef.current) return;

    // Self rotation
    planetRef.current.rotation.y += delta * 0.5;

    // Orbit movement
    angleRef.current += delta * (data.speed / 1000000);

    planetRef.current.position.x =
      Math.cos(angleRef.current) * data.distance;

    planetRef.current.position.z =
      Math.sin(angleRef.current) * data.distance;
  });

  return (
    <mesh
      ref={planetRef}
      castShadow
      receiveShadow
      onPointerOver={() => setHoveredPlanet(data)}
      onPointerOut={() => setHoveredPlanet(null)}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial
        color={data.color}
        transparent
        opacity={data.opacity}
      />


    </mesh>
  );
}





function OrbitRing({ radius, opacity }) {
  const points = [];

  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color="#666666"
        transparent
        opacity={opacity * 0.3}
      />
    </line>
  );
}











function DestinationSystem({ position }) {

  return (
    <group position={position}>

      {/* ⭐ local main star */}
      <mesh>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial color={"lime"} />
      </mesh>

      {/* ⭐ LOCAL BACKGROUND */}
      <DeepBackgroundStars />

    </group>

  );
}













function FixedStarLayer({ radius, count, size, opacity }) {
  const positions = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {

      const spreadFactor = 0.8;   // YOU control outer spread
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      const y = 1 - (i / (count - 1)) * 2;   // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);

      const theta = goldenAngle * i;

      const r = radius * spreadFactor;

      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;

      arr.push(x, y * r, z);
    }



    return new Float32Array(arr);
  }, [radius, count]);

  return (
    <points raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uSize;
          void main() {
 

            float variation = 0.7 + 0.4 *
            fract(sin(dot(position.xyz ,vec3(12.9898,78.233,45.164))) * 43758.5453);



            gl_PointSize = variation * uSize * 6.0;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `}
        uniforms={{
          uSize: { value: size }
        }}
      />
    </points>
  );
}



function FixedStarField() {
  const groupRef = useRef();


  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
    }
  });



  return (

    <group ref={groupRef}>

      {/* Far background */}
      <FixedStarLayer
        radius={4100}
        count={3000}
        size={0.05}
        opacity={0.5}
      />

      {/* Mid layer */}
      <FixedStarLayer
        radius={2400}
        count={300}
        size={0.05}
        opacity={0.01}
      />

      {/* Near layer */}
      <FixedStarLayer
        radius={4100}
        count={400}
        size={0.06}
        opacity={0.05}
      />
    </group>
  );
}








export default function App() {
  const [zoomLevel, setZoomLevel] = useState(20);
  const [targetPosition, setTargetPosition] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [cameraMode, setCameraMode] = useState("explore");
  const [destination, setDestination] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  const controlsRef = useRef();
  const travelRef = useRef(false);



  const handleArrival = () => {

    travelRef.current = false;

    controlsRef.current.object.position.set(0, 0, 120);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();

    setCameraMode("localExplore");
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>

      <Canvas
        shadows
        camera={{ position: [0, 200, 900], fov: 60, far: 6000 }}
        gl={(gl) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.NoToneMapping;
          gl.toneMappingExposure = 1;
        }}
        style={{ background: "black" }}
      >





        <ambientLight intensity={0.03} />

        <pointLight
          position={[0, 0, 0]}
          intensity={40}
          distance={250}
          decay={2}
          castShadow
        />


        <DeepBackgroundStars />

        <FixedStarField />




        <DistanceTracker
          setZoomLevel={setZoomLevel}
          setCameraMode={setCameraMode}
          cameraMode={cameraMode}

          travelRef={travelRef}
        />

        {/* ☀ OUR SOLAR SYSTEM */}
        {cameraMode === "explore" && destination === null && (
          <SolarSystem
            zoomLevel={zoomLevel}
            hoveredPlanet={hoveredPlanet}
            setHoveredPlanet={setHoveredPlanet}
            selectedPlanet={selectedPlanet}
            setSelectedPlanet={setSelectedPlanet}
          />
        )}

        {/* STAR SYSTEM */}
        {cameraMode === "localExplore" && destination && (
          <StarSystemRouter destination={destination} zoomLevel={zoomLevel} />
        )}






        {(cameraMode === "deepSpace" ||
          cameraMode === "travel") && (
            <Galaxy
              zoomLevel={zoomLevel}
              setTargetPosition={setTargetPosition}
              setCameraMode={setCameraMode}
              setDestination={setDestination}
              controlsRef={controlsRef}
              setHoveredStar={setHoveredStar}
              travelRef={travelRef}
            />
          )}





        <TravelController
          cameraMode={cameraMode}
          targetPosition={targetPosition}
          onArrive={handleArrival}

        />
        <OrbitControls
          ref={controlsRef}
          enabled={cameraMode !== "travel"}
          enablePan={cameraMode !== "travel"}
          enableZoom={cameraMode !== "travel"}
          enableRotate={cameraMode !== "travel"}
          enableDamping={cameraMode !== "travel"}
          dampingFactor={0.05}

          minDistance={destination ? 90 : 10}
          maxDistance={2000}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}

          rotateSpeed={0.6}
          zoomSpeed={0.6}
        />




      </Canvas>

      {/* 🔥 Hover UI must be inside return */}
      {
        hoveredPlanet && (
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 24px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid white",
              borderRadius: "8px",
              color: "white",
              fontFamily: "monospace",
              letterSpacing: "1px",
              pointerEvents: "none"
            }}
          >
            <div>{hoveredPlanet.name}</div>
            <div>
              Speed: {hoveredPlanet.speed.toLocaleString()} km/hr(approx)
            </div>
          </div>
        )
      }

      {
        hoveredStar && (
          <div
            style={{
              position: "absolute",
              top: "90px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 24px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid white",
              borderRadius: "8px",
              color: "white",
              fontFamily: "monospace",
              letterSpacing: "1px",
              pointerEvents: "none"
            }}
          >
            <div>{hoveredStar.name}</div>
            <div>Destination Star System</div>
          </div>
        )
      }

      {
        true && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              padding: "10px 16px",
              background: "black",
              border: "1px solid white",
              color: "lime",
              fontFamily: "monospace",
              zIndex: 9999
            }}
          >
            MODE: {cameraMode} <br />
            DEST: {destination}
          </div>
        )
      }

    </div >
  );


}
