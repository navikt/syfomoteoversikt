import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { setupServer } from "msw/node";

vi.mock("@amplitude/analytics-browser", () => ({
  track: vi.fn(),
  init: vi.fn(),
}));

export const mockServer = setupServer();

// Start server before all tests
beforeAll(() => mockServer.listen({ onUnhandledRequest: "warn" }));

//  Close server after all tests
afterAll(() => mockServer.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => mockServer.resetHandlers());
