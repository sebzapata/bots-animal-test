import { useEffect, useState } from "react";
import "./App.css";

const Animal = () => {
  const [happinessLevel, setHappinessLevel] = useState({
    date: new Date(),
    happinessLevel: 80,
  });

  const increaseHappiness = () => {
    const datePlayedWith = new Date();

    setHappinessLevel((prevState) => {
      if (prevState.happinessLevel <= 95) {
        return {
          date: datePlayedWith,
          happinessLevel: prevState.happinessLevel + 5,
        };
      }

      return {
        date: datePlayedWith,
        happinessLevel: 100,
      };
    });
  };

  useEffect(() => {
    const refreshTime = 1000;

    const interval = setInterval(() => {
      if (happinessLevel.happinessLevel > 0) {
        setHappinessLevel((prevState) => ({
          ...prevState,
          happinessLevel: prevState.happinessLevel - 1,
        }));
      }
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [happinessLevel.happinessLevel]);

  return (
    <>
      <div className="animal-container">
        <h1>Poodle</h1>
        <div className="animal-animal">
          <img
            src="src/poodle.svg"
            alt="Your animal"
            className="animal-image"
          />
          <h2>Animal Name</h2>
        </div>
        <div className="animal-stats">
          <div className="stat">
            <strong>Hunger:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "60%" }}></div>
            </div>
            <button className="action-button">Feed</button>
          </div>
          <div className="stat">
            <strong>{`Happiness: ${happinessLevel.happinessLevel}`}</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${happinessLevel.happinessLevel}%` }}
              ></div>
            </div>

            <button
              className="action-button"
              onClick={increaseHappiness}
              disabled={happinessLevel.happinessLevel >= 100}
            >
              Play
            </button>
          </div>
          <div className="stat">
            <strong>Sleep:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "50%" }}></div>
            </div>
            <button className="action-button">Rest</button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="animal-page">
      <button>Add Animal</button>

      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}

export default App;
