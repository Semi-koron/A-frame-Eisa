import { useLocation, useNavigate } from "react-router-dom";
import style from "./index.module.css";

function ResultPage() {
  const navigate = useNavigate();
  //クエリパラメータから取得する
  const param = new URLSearchParams(useLocation().search);
  const count = (param.get("count") ?? 0) as number;
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
    </>
  );
}

export default ResultPage;
