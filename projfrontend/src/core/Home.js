import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
function Home() {
  console.log("API IS", API);
  return <Base title="Home Page" description="All about tshirts"></Base>;
}

export default Home;
