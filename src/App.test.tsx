import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("should render an info message if there are no pets added", () => {
    render(<App />);

    expect(
      screen.getByText("You have no pets at the moment", { exact: false })
    ).toBeInTheDocument();
  });

  it("should show the pet that has been added", () => {
    render(<App />);

    const addAnimalButton = screen.getByRole("button", { name: "Add Animal" });

    fireEvent.click(addAnimalButton);

    expect(
      screen.getByRole("heading", { name: "Add new animal" })
    ).toBeInTheDocument();

    const nameInput = screen.getByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Charlie" } });

    const gingerCatOption = screen.getByRole("radio", { name: "Ginger cat" });
    fireEvent.click(gingerCatOption);

    const addButton = screen.getByRole("button", { name: "Add pet" });
    fireEvent.click(addButton);

    expect(
      screen.queryByText("You have no pets at the moment", { exact: false })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Ginger cat" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Charlie" })
    ).toBeInTheDocument();
  });

  it("should allow multiple pets to be added", () => {
    render(<App />);

    const addAnimalButton = screen.getByRole("button", { name: "Add Animal" });
    fireEvent.click(addAnimalButton);

    expect(
      screen.getByRole("heading", { name: "Add new animal" })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Charlie" },
    });
    fireEvent.click(screen.getByRole("radio", { name: "Ginger cat" }));
    fireEvent.click(screen.getByRole("button", { name: "Add pet" }));

    fireEvent.click(addAnimalButton);
    expect(
      screen.getByRole("heading", { name: "Add new animal" })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Toby" },
    });
    fireEvent.click(screen.getByRole("radio", { name: "Brown cat" }));
    fireEvent.click(screen.getByRole("button", { name: "Add pet" }));

    expect(
      screen.getByRole("heading", { name: "Ginger cat" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Brown cat" })
    ).toBeInTheDocument();
  });
});
