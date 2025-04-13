import { useEffect, useState } from "react";

type Metric = {
  date: Date;
  baseLevel: number;
  level: number;
};

type AnimalProps = {
  name: string;
  breed: string;
};

const dogsList = ["Basset hound", "Chow chow", "Droopy dog"];
const catsList = ["Ginger cat", "Brown cat"];

const getHappinessMeterColour = (meterValue: number) => {
  if (meterValue >= 50) {
    return "#4caf50";
  }

  if (meterValue >= 20) {
    return "#f5a742";
  }

  return "#f50000";
};

const getHungerOrSleepMeterColour = (meterValue: number) => {
  if (meterValue >= 80) {
    return "#f50000";
  }

  if (meterValue >= 50) {
    return "#f5a742";
  }

  return "#4caf50";
};

const Animal = ({ name, breed }: AnimalProps) => {
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
  const [sleepiness, setSleepiness] = useState<Metric>({
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

  const decreaseSleepiness = () => {
    const dateRested = new Date();

    setSleepiness((prevState) => {
      if (prevState.level >= 5) {
        return {
          date: dateRested,
          baseLevel: prevState.level - 5,
          level: prevState.level - 5,
        };
      }

      return {
        date: dateRested,
        baseLevel: 0,
        level: 0,
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

        let happinessDecreaseFactor;

        const isSleepinessOrHungerFull =
          sleepiness.level >= 100 || hunger.level >= 100;

        const sleepAndHungerFactor = isSleepinessOrHungerFull ? 2 : 1;

        if (dogsList.includes(breed)) {
          happinessDecreaseFactor = 1.25;
        } else if (catsList.includes(breed)) {
          happinessDecreaseFactor = 0.8;
        } else {
          happinessDecreaseFactor = 1;
        }

        setHappiness((prevState) => ({
          ...prevState,
          level: Math.round(
            prevState.baseLevel -
              timeSinceLastPlay * happinessDecreaseFactor * sleepAndHungerFactor
          ),
        }));
      }

      if (hunger.level < 100) {
        const timeSinceLastFeed =
          (currentTime.getTime() - hunger.date.getTime()) / 1000;

        let hungerIncreaseFactor;

        if (dogsList.includes(breed)) {
          hungerIncreaseFactor = 0.9;
        } else if (catsList.includes(breed)) {
          hungerIncreaseFactor = 1.2;
        } else {
          hungerIncreaseFactor = 0.1;
        }

        setHunger((prevState) => ({
          ...prevState,
          level: Math.round(
            prevState.baseLevel + timeSinceLastFeed * hungerIncreaseFactor
          ),
        }));
      }

      if (sleepiness.level < 100) {
        const timeSinceLastRest = Math.round(
          (currentTime.getTime() - sleepiness.date.getTime()) / 1000
        );

        let sleepinessIncreaseFactor;

        if (dogsList.includes(breed)) {
          sleepinessIncreaseFactor = 0.7;
        } else if (catsList.includes(breed)) {
          sleepinessIncreaseFactor = 1.3;
        } else {
          sleepinessIncreaseFactor = 0.3;
        }

        setSleepiness((prevState) => ({
          ...prevState,
          level: Math.round(
            prevState.baseLevel + timeSinceLastRest * sleepinessIncreaseFactor
          ),
        }));
      }
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [
    breed,
    happiness.date,
    happiness.level,
    hunger.date,
    hunger.level,
    sleepiness.date,
    sleepiness.level,
  ]);

  return (
    <>
      <div className="animal-container">
        <h1>{breed}</h1>
        <div className="animal-animal">
          <img
            src={`src/petImages/${breed}.svg`}
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
                style={{
                  width: `${hunger.level}%`,
                  backgroundColor: getHungerOrSleepMeterColour(hunger.level),
                }}
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
                style={{
                  width: `${happiness.level}%`,
                  backgroundColor: getHappinessMeterColour(happiness.level),
                }}
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
            <strong>{`Sleepiness: ${sleepiness.level}`}</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{
                  width: `${sleepiness.level}%`,
                  backgroundColor: getHungerOrSleepMeterColour(
                    sleepiness.level
                  ),
                }}
              ></div>
            </div>
            <button
              className="action-button"
              onClick={decreaseSleepiness}
              disabled={sleepiness.level <= 0}
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
