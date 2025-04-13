import { useState } from "react";
import { PetInfo } from "../App";
import "./addAnimal.css";

type AddAnimalProps = {
  setIsSideDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListOfPets: React.Dispatch<React.SetStateAction<PetInfo[]>>;
};

const petOptions = [
  "Chow chow",
  "Basset hound",
  "Droopy dog",
  "Ginger cat",
  "Brown cat",
  "Snake",
];

const AddAnimal = ({ setIsSideDrawerOpen, setListOfPets }: AddAnimalProps) => {
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState<string>("");

  return (
    <div className="addAnimalDrawer">
      <div className="addAnimalDrawer--header">
        <h1>Add new animal</h1>
        <span
          className="addAnimalDrawer--header--button"
          onClick={() => setIsSideDrawerOpen(false)}
        >
          X
        </span>
      </div>
      <div className="addAnimalDrawer--form">
        <div>
          <div>
            <label htmlFor="petName">Pet's name:</label>
            <input
              id="petName"
              className="addAnimalDrawer--form--input"
              onChange={(e) => setPetName(e.target.value)}
              value={petName}
            />
          </div>
          <div className="addAnimalDrawer--form--selectBreed">
            <div>
              <label htmlFor="petBreed">Pet breed:</label>
              <ul id="petBreed">
                {petOptions.map((petOption) => (
                  <li key={petOption}>
                    <input
                      type="radio"
                      onChange={() => setPetBreed(petOption)}
                      checked={petBreed === petOption}
                      id={petOption}
                    />
                    <label htmlFor={petOption}>{petOption}</label>
                  </li>
                ))}
              </ul>
            </div>
            {petBreed && (
              <img
                src={`src/petImages/${petBreed}.svg`}
                alt="Selected animal"
                className="animal-image"
              />
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setListOfPets((prevState) => [
              ...prevState,
              { name: petName, breed: petBreed },
            ]);
            setIsSideDrawerOpen(false);
          }}
          disabled={!petBreed || !petName}
        >
          Add pet
        </button>
      </div>
    </div>
  );
};

export default AddAnimal;
