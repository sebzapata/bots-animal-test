import { useState } from "react";
import "./addAnimal.css";

type AddAnimalProps = {
  setIsSideDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListOfPets: React.Dispatch<React.SetStateAction<{ name: string }[]>>;
};

const AddAnimal = ({ setIsSideDrawerOpen, setListOfPets }: AddAnimalProps) => {
  const [petName, setPetName] = useState("");

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
          <label>Pet's name:</label>
          <input onChange={(e) => setPetName(e.target.value)} value={petName} />
        </div>
        <button
          onClick={() => {
            setListOfPets((prevState) => [...prevState, { name: petName }]);
            setIsSideDrawerOpen(false);
          }}
        >
          Add pet
        </button>
      </div>
    </div>
  );
};

export default AddAnimal;
