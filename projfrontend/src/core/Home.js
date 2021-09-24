import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
function Home() {
  console.log("API IS", API);
  return (
    <Base title="Home Page" description="All about tshirts">
      <h1>Welcome Bro</h1>
    </Base>
  );
}

export default Home;
