import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import HomeScreen from "../src/screens/HomeScreen";

const mockNavigate = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to screen when mode card is pressed", () => {
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(screen.getByText("Check In"));
    expect(mockNavigate).toHaveBeenCalledWith("CheckIn");

    fireEvent.press(screen.getByText("Ignite"));
    expect(mockNavigate).toHaveBeenCalledWith("Focus");
  });

  it("renders correctly", () => {
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    expect(screen.getByText("Spark")).toBeTruthy();
  });

  it("displays mode cards", () => {
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    expect(screen.getByText("Ignite")).toBeTruthy();
    expect(screen.getByText("Fog Cutter")).toBeTruthy();
    expect(screen.getByText("Pomodoro")).toBeTruthy();
  });

  it("shows streak container", () => {
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    expect(screen.getByText("0 days streak")).toBeTruthy();
  });
});
