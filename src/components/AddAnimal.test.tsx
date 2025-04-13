import { fireEvent, render, screen } from "@testing-library/react";
import AddAnimal from "./AddAnimal";
import { vi } from "vitest";

describe("AddAnimal", () => {
  it("should not allow a pet to be added if it doesn't have a name", () => {
    const setListOfPetsFn = vi.fn();
    render(
      <AddAnimal
        setIsSideDrawerOpen={vi.fn()}
        setListOfPets={setListOfPetsFn}
      />
    );

    const gingerCatOption = screen.getByRole("radio", { name: "Ginger cat" });
    fireEvent.click(gingerCatOption);

    const addButton = screen.getByRole("button", { name: "Add pet" });
    fireEvent.click(addButton);

    expect(setListOfPetsFn).not.toHaveBeenCalled();

    const nameInput = screen.getByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Charlie" } });

    fireEvent.click(addButton);

    expect(setListOfPetsFn).toHaveBeenCalled();
  });
  it("should not allow a pet to be added if it doesn't have a breed", () => {
    const setListOfPetsFn = vi.fn();
    render(
      <AddAnimal
        setIsSideDrawerOpen={vi.fn()}
        setListOfPets={setListOfPetsFn}
      />
    );

    const nameInput = screen.getByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Charlie" } });

    const addButton = screen.getByRole("button", { name: "Add pet" });
    fireEvent.click(addButton);

    expect(setListOfPetsFn).not.toHaveBeenCalled();

    const gingerCatOption = screen.getByRole("radio", { name: "Ginger cat" });
    fireEvent.click(gingerCatOption);

    fireEvent.click(addButton);

    expect(setListOfPetsFn).toHaveBeenCalled();
  });
});
