import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("/gameplay");
        }}
      >
        ゲームスタート
      </button>
    </>
  );
}

export default HomePage;
