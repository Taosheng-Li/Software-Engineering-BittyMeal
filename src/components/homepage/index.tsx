import "./styles.css";
import { cravingItem } from "../../../data/homepageData";

const Homepage = () => {
  return (
    <>
      <div className="whole-page">
        <div className="craving">
          <p className="heading">WHAT WE ARE CRAVING</p>
          <div className="craving-con">
            {cravingItem.map((item) => (
              <div className="craving-pic">
                <img src={item.img} alt={item.name} />
                <div className="craving-pic-p">
                  <p>collection</p>
                  <p id="des">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="explore-section">
          <div className="explore-header">
            <h2 className="heading">EXPLORE MORE</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
