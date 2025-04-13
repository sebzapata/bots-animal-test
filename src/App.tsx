import { useEffect, useState } from "react";
import "./App.css";

type metric = {
  date: Date;
  level: number;
};

const Animal = () => {
  const [happiness, setHappiness] = useState<metric>({
    date: new Date(),
    level: 80,
  });
  const [hunger, setHunger] = useState<metric>({
    date: new Date(),
    level: 60,
  });
  const [sleep, setSleep] = useState<metric>({
    date: new Date(),
    level: 50,
  });

  const increaseHappiness = () => {
    const datePlayedWith = new Date();

    setHappiness((prevState) => {
      if (prevState.level <= 95) {
        return {
          date: datePlayedWith,
          level: prevState.level + 5,
        };
      }

      return {
        date: datePlayedWith,
        level: 100,
      };
    });
  };

  const decreaseHunger = () => {
    const dateFed = new Date();

    setHunger((prevState) => {
      if (prevState.level >= 5) {
        return {
          date: dateFed,
          level: prevState.level - 5,
        };
      }

      return {
        date: dateFed,
        level: 0,
      };
    });
  };

  const increaseSleep = () => {
    const dateRested = new Date();

    setSleep((prevState) => {
      if (prevState.level <= 95) {
        return {
          date: dateRested,
          level: prevState.level + 5,
        };
      }

      return {
        date: dateRested,
        level: 100,
      };
    });
  };

  useEffect(() => {
    const refreshTime = 1000;

    const interval = setInterval(() => {
      if (happiness.level > 0) {
        setHappiness((prevState) => ({
          ...prevState,
          level: prevState.level - 1,
        }));
      }

      if (hunger.level < 100) {
        setHunger((prevState) => ({
          ...prevState,
          level: prevState.level + 1,
        }));
      }

      if (sleep.level > 0) {
        setSleep((prevState) => ({
          ...prevState,
          level: prevState.level - 1,
        }));
      }
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [happiness.level, hunger.level, sleep.level]);

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
            <strong>{`Hunger: ${hunger.level}`}</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${hunger.level}%` }}
              ></div>
            </div>
            <button
              className="action-button"
              onClick={decreaseHunger}
              disabled={hunger.level <= 0}
            >
              Feed
            </button>
          </div>
          <div className="stat">
            <strong>{`Happiness: ${happiness.level}`}</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${happiness.level}%` }}
              ></div>
            </div>

            <button
              className="action-button"
              onClick={increaseHappiness}
              disabled={happiness.level >= 100}
            >
              Play
            </button>
          </div>
          <div className="stat">
            <strong>{`Sleep: ${sleep.level}`}</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${sleep.level}%` }}
              ></div>
            </div>
            <button
              className="action-button"
              onClick={increaseSleep}
              disabled={sleep.level >= 100}
            >
              Rest
            </button>
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
