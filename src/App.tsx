import { useState } from "react";
import "./App.css";
import Animal from "./components/Animal";
import AddAnimal from "./components/AddAnimal";

export type PetInfo = {
  name: string;
  breed: string;
};

function App() {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [listOfPets, setListOfPets] = useState<PetInfo[]>([]);

  return (
    <div className="animal-page">
      {isSideDrawerOpen && (
        <AddAnimal
          setIsSideDrawerOpen={setIsSideDrawerOpen}
          setListOfPets={setListOfPets}
        />
      )}

      <button onClick={() => setIsSideDrawerOpen(true)}>Add Animal</button>

      <div
        className={`animal-wrapper && ${
          isSideDrawerOpen ? "blurMainPage" : ""
        }`}
      >
        {!listOfPets.length && (
          <p>
            You have no pets at the moment.
            <br /> Please click the "Add Animal" button on the left to create
            one.
          </p>
        )}
        {listOfPets.map((pet) => (
          <Animal name={pet.name} breed={pet.breed} />
        ))}
      </div>
    </div>
  );
}

export default App;
