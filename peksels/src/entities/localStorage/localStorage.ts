import { LocalStorageKeys } from "../enums/localStorageKeys";

function getLikes(): number[] {
  return JSON.parse(localStorage.getItem(LocalStorageKeys.LIKES) || "[]");
}
function setLikes(value: string): void {
  localStorage.setItem(LocalStorageKeys.LIKES, value);
}

export function initializeLocalStorage(): void {
  if (!localStorage.getItem(LocalStorageKeys.LIKES)) {
    const likes: number[] = [];
    localStorage.setItem(LocalStorageKeys.LIKES, JSON.stringify(likes));
  }
}

export function addLike(id: number): void {
  const list = getLikes();
  list.push(id);
  setLikes(JSON.stringify(list));
}

export function removeLike(id: number): void {
  const oldList = getLikes();
  const updateList = oldList.filter((photoId) => photoId !== id);
  setLikes(JSON.stringify(updateList));
}

export function isLiked(id: number): boolean {
  const list = getLikes();
  return list.find((photoId) => photoId === id) ? true : false;
}
