interface Mocks {
  [key: string]: any;
}

export const mocks: Mocks = {};

export default function mock(event: string, value: any): void {
  mocks[event] = value;
}
