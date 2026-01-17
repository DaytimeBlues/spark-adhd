import { renderHook, act, waitFor } from "@testing-library/react-native";
import useTimer from "../src/hooks/useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with correct time", () => {
    const { result } = renderHook(() => useTimer({ initialTime: 300 }));
    expect(result.current.timeLeft).toBe(300);
    expect(result.current.formattedTime).toBe("05:00");
  });

  it("starts timer when start is called", () => {
    const { result } = renderHook(() => useTimer({ initialTime: 5 }));
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });

  it("pauses timer when pause is called", () => {
    const { result } = renderHook(() => useTimer({ initialTime: 5 }));
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
  });

  it("resets timer to initial time", () => {
    const { result } = renderHook(() => useTimer({ initialTime: 300 }));
    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(300);
    expect(result.current.isRunning).toBe(false);
  });

  it("formats time correctly", () => {
    const { result } = renderHook(() => useTimer({ initialTime: 65 }));
    expect(result.current.formattedTime).toBe("01:05");
  });
});
