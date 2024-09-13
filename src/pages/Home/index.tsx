import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style["home-wrapper"]}>
        <h1>A-frame Eisa!!</h1>
        <button
          type="button"
          onClick={() => {
            navigate("/gameplay");
          }}
        >
          ゲームスタート
        </button>
      </div>
    </>
  );
}

export default HomePage;
