import { useState } from "react";
import "./App.css";
import Animal from "./components/Animal";
import AddAnimal from "./components/AddAnimal";

function App() {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [listOfPets, setListOfPets] = useState<{ name: string }[]>([]);

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
        {listOfPets.map((pet) => (
          <Animal name={pet.name} />
        ))}
      </div>
    </div>
  );
}

export default App;
