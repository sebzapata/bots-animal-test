import { useEffect, useState } from "react";

type Metric = {
  date: Date;
  baseLevel: number;
  level: number;
};

type AnimalProps = {
  name: string;
};

const Animal = ({ name }: AnimalProps) => {
  const [happiness, setHappiness] = useState<Metric>({
    date: new Date(),
    baseLevel: 80,
    level: 80,
  });
  const [hunger, setHunger] = useState<Metric>({
    date: new Date(),
    baseLevel: 60,
    level: 60,
  });
  const [sleep, setSleep] = useState<Metric>({
    date: new Date(),
    baseLevel: 50,
    level: 50,
  });

  const increaseHappiness = () => {
    const datePlayedWith = new Date();

    setHappiness((prevState) => {
      if (prevState.level <= 95) {
        return {
          date: datePlayedWith,
          baseLevel: prevState.level + 5,
          level: prevState.level + 5,
        };
      }

      return {
        date: datePlayedWith,
        baseLevel: 100,
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
          baseLevel: prevState.level - 5,
          level: prevState.level - 5,
        };
      }

      return {
        date: dateFed,
        baseLevel: 0,
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
          baseLevel: prevState.level + 5,
          level: prevState.level + 5,
        };
      }

      return {
        date: dateRested,
        baseLevel: 100,
        level: 100,
      };
    });
  };

  useEffect(() => {
    const refreshTime = 1000;

    const interval = setInterval(() => {
      const currentTime = new Date();

      if (happiness.level > 0) {
        const timeSinceLastPlay = Math.round(
          (currentTime.getTime() - happiness.date.getTime()) / 1000
        );

        setHappiness((prevState) => ({
          ...prevState,
          level: prevState.baseLevel - timeSinceLastPlay,
        }));
      }

      if (hunger.level < 100) {
        const timeSinceLastFeed = Math.round(
          (currentTime.getTime() - hunger.date.getTime()) / 1000
        );

        setHunger((prevState) => ({
          ...prevState,
          level: prevState.baseLevel + timeSinceLastFeed,
        }));
      }

      if (sleep.level > 0) {
        const timeSinceLastRest = Math.round(
          (currentTime.getTime() - sleep.date.getTime()) / 1000
        );

        setSleep((prevState) => ({
          ...prevState,
          level: prevState.baseLevel - timeSinceLastRest,
        }));
      }
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [
    happiness.date,
    happiness.level,
    hunger.date,
    hunger.level,
    sleep.date,
    sleep.level,
  ]);

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
          <h2>{name}</h2>
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

export default Animal;
