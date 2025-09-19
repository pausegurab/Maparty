import { vi } from 'vitest';

vi.mock('bootstrap', () => ({
  Tooltip: vi.fn().mockImplementation(() => ({
    show: vi.fn(),
  })),
  Toast: vi.fn().mockImplementation(() => ({
    show: vi.fn(),
  })),
}));