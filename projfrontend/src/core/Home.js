import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
function Home() {
  return (
    <Base title="Home Page" description="All about tshirts">
      <div className="row text-center">
        <div className="col-4">
          <Card />
        </div>
        <div className="col-4"></div>
        <div className="col-4"></div>
      </div>
    </Base>
  );
}

export default Home;
