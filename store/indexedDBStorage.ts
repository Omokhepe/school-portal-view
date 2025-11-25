import { get, set, del } from "idb-keyval";
import type { PersistStorage, StorageValue } from "zustand/middleware";

// Basic IndexedDB wrapper

export function createIndexedDBStorage<T>(
  dbName: string,
  storeName: string,
): PersistStorage<T> {
  let db: IDBDatabase | null = null;

  function getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);

      const request = indexedDB.open(dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName);
        }
      };
    });
  }

  async function getItem(name: string): Promise<StorageValue<T> | null> {
    const database = await getDB();

    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.get(name);

      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  }

  async function setItem(name: string, value: StorageValue<T>): Promise<void> {
    const database = await getDB();

    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.put(value, name);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async function removeItem(name: string): Promise<void> {
    const database = await getDB();

    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.delete(name);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
}
