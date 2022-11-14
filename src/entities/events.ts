export enum ArrowKey {
  up = "ArrowUp",
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
}

export const ARROW_KEYS = new Set<string>([
  ArrowKey.up,
  ArrowKey.down,
  ArrowKey.left,
  ArrowKey.right,
]);

export enum EventKey {
  backspace = "Backspace",
}
