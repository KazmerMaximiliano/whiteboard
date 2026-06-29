import "@testing-library/jest-dom";

// jsdom does not implement ResizeObserver, which useGridMetrics relies on.
class ResizeObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver =
  ResizeObserverMock as unknown as typeof ResizeObserver;
