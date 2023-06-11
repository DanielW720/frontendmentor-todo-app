import { TodoList } from "../components/todo/types";

/**
 *
 * @param items
 */
export function sortItems(items: NonNullable<TodoList>) {
  return items.sort((a, b) => a.index - b.index);
}

/**
 * Checks if two arrays have equal length and order. Useful for comparing the
 * previous version of a TodoList with the current version.
 * @param arrayA
 * @param arrayB
 * @returns true if length and order of arrayA is equal to that of arrayB, else false
 */
export function orderIsEqual(
  arrayA: NonNullable<TodoList>,
  arrayB: NonNullable<TodoList>
) {
  if (arrayA.length !== arrayB.length) return false;
  for (let i = 0; i < arrayA.length; i++) {
    if (arrayA[i].id !== arrayB[i].id) return false;
  }
  return true;
}
