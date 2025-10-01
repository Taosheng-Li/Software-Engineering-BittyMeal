import "./styles.css";

const Hero = () => {
  return (
    <div className="poster">
      <div className="border">
        <div className="img">
          <img src="coffee.png" alt="'coffee" />
        </div>
        <div className="info">
          <div className="text">
            <div className="text1">
              <p>Enjoy</p>
              <p>Food</p>
              <p>With us</p>
            </div>
            <div className="text2">
              <p>Enjoy</p>
              <p>Food</p>
              <p>With us</p>
            </div>
            <div className="blur"></div>

            <p id="small">Start your day in the best possible way</p>
          </div>

          <div className="button">
            <button>Start Now</button>
            <p>Find recipes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
