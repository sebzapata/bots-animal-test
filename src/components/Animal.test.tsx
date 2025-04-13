import { act, fireEvent, render, screen } from "@testing-library/react";
import Animal from "./Animal";
import { vi } from "vitest";

describe("Animal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  it("should start animal with neutral stat values", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Hunger: 50")).toBeInTheDocument();
    expect(screen.getByText("Happiness: 50")).toBeInTheDocument();
    expect(screen.getByText("Sleepiness: 50")).toBeInTheDocument();
  });

  it("should decrease hunger after being fed", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Hunger: 50")).toBeInTheDocument();

    const feedButton = screen.getByRole("button", { name: "Feed" });
    fireEvent.click(feedButton);

    expect(screen.getByText("Hunger: 45")).toBeInTheDocument();
  });

  it("should increase happiness after being played with", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Happiness: 50")).toBeInTheDocument();

    const playButton = screen.getByRole("button", { name: "Play" });
    fireEvent.click(playButton);

    expect(screen.getByText("Happiness: 55")).toBeInTheDocument();
  });

  it("should decrease sleepiness after being rested", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Sleepiness: 50")).toBeInTheDocument();

    const restButton = screen.getByRole("button", { name: "Rest" });
    fireEvent.click(restButton);

    expect(screen.getByText("Sleepiness: 45")).toBeInTheDocument();
  });

  it("should decrease happiness over time", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Happiness: 50")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Happiness: 46")).toBeInTheDocument();
  });

  it("should increase hunger over time", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Hunger: 50")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Hunger: 56")).toBeInTheDocument();
  });

  it("should increase sleepiness over time", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    expect(screen.getByText("Sleepiness: 50")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Sleepiness: 57")).toBeInTheDocument();
  });

  it("should decrease happiness faster when hunger is full", () => {
    render(<Animal breed="Ginger cat" name="Charlie" />);

    const firstHappinessLevel = Number(
      screen.getByTestId("happinessLevel").textContent?.slice(-2)
    );
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    const secondHappinessLevel = Number(
      screen.getByTestId("happinessLevel").textContent?.slice(-2)
    );

    const firstHappinessDecrease = firstHappinessLevel - secondHappinessLevel;

    act(() => {
      vi.advanceTimersByTime(40000);
    });

    const playButton = screen.getByRole("button", { name: "Play" });

    fireEvent.click(playButton);
    fireEvent.click(playButton);
    fireEvent.click(playButton);
    fireEvent.click(playButton);

    const thirdHappinessLevel = Number(
      screen.getByTestId("happinessLevel").textContent?.slice(-2)
    );
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    const fourthHappinessLevel = Number(
      screen.getByTestId("happinessLevel").textContent?.slice(-2)
    );

    const secondHappinessDecrease = thirdHappinessLevel - fourthHappinessLevel;

    expect(secondHappinessDecrease > firstHappinessDecrease);
  });

  it("should have stats decrease at different rates for different animals", () => {
    render(
      <>
        <Animal breed="Ginger cat" name="Charlie" />
        <Animal breed="Snake" name="Sammy" />
      </>
    );

    const firstHappinessLevels = screen.getAllByTestId("happinessLevel");

    firstHappinessLevels.forEach((happinessLevel) => {
      expect(happinessLevel.textContent).toEqual("Happiness: 50");
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    const secondHappinessLevels = screen.getAllByTestId("happinessLevel");

    expect(secondHappinessLevels[0].textContent).toEqual("Happiness: 42");
    expect(secondHappinessLevels[1].textContent).toEqual("Happiness: 40");

    expect(secondHappinessLevels[0].textContent).not.toEqual(
      secondHappinessLevels[1].textContent
    );
  });
});
