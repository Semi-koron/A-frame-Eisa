import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  //クエリパラメータから取得する
  const param = new URLSearchParams(useLocation().search);
  const count = (param.get("count") ?? 0) as number;
  return (
    <>
      <h1>結果</h1>
      <div>{count}回</div>

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        タイトルへ戻る
      </button>
    </>
  );
}

export default ResultPage;
