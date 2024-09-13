import { useEffect, useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

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
function GamePage() {
  const navigate = useNavigate();
  const count = useRef<number>(0);
  const life = useRef<number>(3);
  const [position, setPosition] = useState<Vector>({ x: 0, y: 1, z: 0 });
  const [rotation, setRotation] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const floorElement = document.getElementById("floor");
  const donutElement = document.getElementById("target");
  const playerElement = document.getElementById("player");
  //キーが押されている間の処理をイベントリスナーで設定
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "w") {
        setPosition({ x: position.x, y: position.y, z: position.z - 1 });
        console.log(position);
      }
      if (e.key === "s") {
        setPosition({ x: position.x, y: position.y, z: position.z + 1 });
        console.log(position);
      }
      if (e.key === "a") {
        setPosition({ x: position.x - 1, y: position.y, z: position.z });
        console.log(position);
      }
      if (e.key === "d") {
        setPosition({ x: position.x + 1, y: position.y, z: position.z });
        console.log(position);
      }
    };

    window.addEventListener("keypress", onKeyDown);
    return () => {
      window.removeEventListener("keypress", onKeyDown);
    };
  }, [position]);

  useEffect(() => {
    const floorCollition = (e: any) => {
      life.current = life.current - 1;
      //-10~10の範囲でランダムな座標を生成
      const x = Math.floor(Math.random() * 20 - 10);
      const y = 10;
      const z = Math.floor(Math.random() * 20 - 10);
      //donutの座標を変更
      donutElement?.setAttribute("position", `${x} ${y} ${z}`);
      //dynamic-body="shape: sphere; mass: 1"を削除する
      donutElement?.removeAttribute("dynamic-body");
      donutElement?.setAttribute("dynamic-body", "shape: sphere; mass: 1");
      if (life.current === 0) {
        navigate(`/Result?count=${count.current}`);
      }
    };
    const playerCollition = (e: any) => {
      count.current = count.current + 1;
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
    if (playerElement) {
      playerElement.addEventListener("collide", playerCollition);
    }

    return () => {
      window.removeEventListener("collide", floorCollition);
      window.removeEventListener("collide", playerCollition);
    };
  }, [playerElement]);

  useEffect(() => {
    //一秒後に実行
    setTimeout(() => {
      setRotation({ x: 90, y: 0, z: 0 });
    }, 1000);
  });
  return (
    <>
      <div className={style["gameUI"]}>
        <div className={style["life"]}>
          life :{" "}
          {(() => {
            switch (life.current) {
              case 3:
                return (
                  <>
                    <FavoriteIcon />
                    <FavoriteIcon />
                    <FavoriteIcon />
                  </>
                );
              case 2:
                return (
                  <>
                    <FavoriteIcon />
                    <FavoriteIcon />
                    <FavoriteBorderIcon />
                  </>
                );
              case 1:
                return (
                  <>
                    <FavoriteIcon />
                    <FavoriteBorderIcon />
                    <FavoriteBorderIcon />
                  </>
                );
              case 0:
                return (
                  <>
                    <FavoriteBorderIcon />
                    <FavoriteBorderIcon />
                    <FavoriteBorderIcon />
                  </>
                );
              default:
                return null;
            }
          })()}
        </div>
        <div className={style["counter"]}>count : {count.current}</div>
        <div className={style["info"]}> 操作説明 移動AWSD</div>
      </div>
      <a-scene physics="gravity: -3;" vr-mode-ui="enabled: false">
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
          <a-asset-item id="donut" src="/src/assets/donut.glb"></a-asset-item>
        </a-assets>
        <a-gltf-model
          id="player"
          src="#taiko"
          position={position.x + " " + position.y + " " + position.z}
          static-body="shape: auto"
          rotation={rotation.x + " " + rotation.y + " " + rotation.z}
        ></a-gltf-model>
        <a-gltf-model
          id="target"
          src="#donut"
          position="0 10 4"
          dynamic-body="shape: sphere; mass: 1"
        ></a-gltf-model>
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

export default GamePage;
