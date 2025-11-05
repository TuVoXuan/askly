export function getLocalStorageItem<T>(key: string): T|null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}