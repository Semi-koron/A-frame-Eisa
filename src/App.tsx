import "./App.css";
import { useEffect, useState, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": any;
      "a-plane": any;
      "a-assets": any;
      "a-asset-item": any;
      "a-gltf-model": any;
      "a-sphere": any;
      "a-sky": any;
      "a-camera": any;
    }
  }
}

type Vector = {
  x: number;
  y: number;
  z: number;
};
function App() {
  const [position, setPosition] = useState<Vector>({ x: 0, y: 1, z: 0 });
  const [rotation, setRotation] = useState<Vector>({ x: 0, y: 0, z: 0 });
  //キーが押されている間の処理をイベントリスナーで設定
  useEffect(() => {
    const floorElement = document.getElementById("floor");
    const donutElement = document.getElementById("donut");
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "w") {
        setPosition({ x: position.x, y: position.y, z: position.z - 0.5 });
        console.log(position);
      }
      if (e.key === "s") {
        setPosition({ x: position.x, y: position.y, z: position.z + 0.5 });
        console.log(position);
      }
      if (e.key === "a") {
        setPosition({ x: position.x - 0.5, y: position.y, z: position.z });
        console.log(position);
      }
      if (e.key === "d") {
        setPosition({ x: position.x + 0.5, y: position.y, z: position.z });
        console.log(position);
      }
    };
    const floorCollition = (e: any) => {
      console.log(e);
      console.log("out");
      //-10~10の範囲でランダムな座標を生成
      const x = Math.floor(Math.random() * 20 - 10);
      const y = 10;
      const z = Math.floor(Math.random() * 20 - 10);
      //donutの座標を変更
      donutElement?.setAttribute("position", `${x} ${y} ${z}`);
      //dynamic-body="shape: sphere; mass: 1"を削除する
      donutElement?.removeAttribute("dynamic-body");
      donutElement?.setAttribute("dynamic-body", "shape: sphere; mass: 1");
    };
    if (floorElement) {
      floorElement.addEventListener("collide", floorCollition);
    }
    window.addEventListener("keypress", onKeyDown);
    return () => {
      window.removeEventListener("keypress", onKeyDown);
      window.removeEventListener("collide", floorCollition);
    };
  }, [position]);

  useEffect(() => {
    //一秒後に実行
    setTimeout(() => {
      setRotation({ x: 90, y: 0, z: 0 });
    }, 1000);
  });
  return (
    <>
      <a-scene
        stats
        physics="debug: true ; gravity: -3;"
        vr-mode-ui="enabled: false"
      >
        <a-plane
          id="floor"
          static-body="shape: plane"
          width="22"
          height="22"
          position="0 0 0"
          rotation="-90 0 0"
          color="#7BC8A4"
        ></a-plane>
        <a-assets>
          <a-asset-item id="taiko" src="/src/assets/taiko.glb"></a-asset-item>
        </a-assets>
        <a-gltf-model
          id="player"
          src="#taiko"
          position={position.x + " " + position.y + " " + position.z}
          static-body="shape: auto"
          rotation={rotation.x + " " + rotation.y + " " + rotation.z}
        ></a-gltf-model>
        <a-sphere
          id="donut"
          position="0 10 4"
          color="blue"
          dynamic-body="shape: sphere; mass: 1"
        ></a-sphere>
        <a-sky color="#ECECEC"></a-sky>
        <a-camera
          position="0 15 10"
          rotation="-60 0 0"
          look-controls-enabled="false"
          wasd-controls-enabled="false"
        ></a-camera>
      </a-scene>
    </>
  );
}

export default App;
