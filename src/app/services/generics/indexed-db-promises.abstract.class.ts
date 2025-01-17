export abstract class IndexedDBPromises<T> {
  private databaseName: string = '';
  private tableName: string = '';
  private version: number = 0;

  constructor(databaseName: string, tableName: string, version: number) {
    this.databaseName = databaseName;
    this.tableName = tableName;
    this.version = version;
  }

  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, this.version);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if(!db.objectStoreNames.contains(this.tableName)) {
          db.createObjectStore(this.tableName, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  async getItems(): Promise<T[]> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.tableName, 'readonly');
      const store = transaction.objectStore(this.tableName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  async addItem(item: T): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.tableName, 'readwrite');
      const store = transaction.objectStore(this.tableName);
      const request = store.add(item);
  
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  async updateItem(item: T): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.tableName, 'readwrite');
      const store = transaction.objectStore(this.tableName);  
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };  

  async deleteItem(id: number): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.tableName, 'readwrite');      
      const store = transaction.objectStore(this.tableName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

}