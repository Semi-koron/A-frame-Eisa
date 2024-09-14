import { useLocation, useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { useEffect } from "react";

function ResultPage() {
  const navigate = useNavigate();
  //クエリパラメータから取得する
  const param = new URLSearchParams(useLocation().search);
  const count = (param.get("count") ?? 0) as number;
  const dodon = document.getElementById("dodon") as HTMLAudioElement;

  useEffect(() => {
    dodon.currentTime = 0;
    dodon.play();
  }, [dodon]);
  return (
    <>
      <div className={style["result-wrapper"]}>
        <h1>結果 : {count}回</h1>
        {(() => {
          if (count < 10) {
            return (
              <>
                <h2>エイサーが足りないぞ！！！</h2>
              </>
            );
          } else if (count < 20) {
            return (
              <>
                <h2>まだまだエイサー魂を燃やせ！</h2>
              </>
            );
          } else {
            return (
              <>
                <h2>立派なエイサーだったぞ。</h2>
              </>
            );
          }
        })()}
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          タイトルへ戻る
        </button>
      </div>
      <audio id="dodon">
        <source src="/src/assets/dodon.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

export default ResultPage;
