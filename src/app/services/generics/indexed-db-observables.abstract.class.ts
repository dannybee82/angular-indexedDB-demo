import { from, Observable, of, switchMap } from 'rxjs';

export abstract class IndexedDBObservables<T> {
  private databaseName: string = '';
  private tableName: string = '';
  private version: number = 0;

  constructor(databaseName: string, tableName: string, version: number) {
    this.databaseName = databaseName;
    this.tableName = tableName;
    this.version = version;
  }
  
  initDB(): Observable<IDBDatabase | DOMException | null> {
    return from(this.openDB());
  }

  getItems<T>(): Observable<T[]> {
    const db$: Observable<IDBDatabase> = this.getDB();

    return db$.pipe(
      switchMap((db: IDBDatabase) => {
        return from(this.getData<T>(db));
      })
    );
  }

  addItem<T>(item: T): Observable<void> {
    const db$: Observable<IDBDatabase> = this.getDB();

    return db$.pipe( 
        switchMap((db: IDBDatabase) => {
        return from(this.create(db, item));
      })
    );
  }

  updateItem(item: T): Observable<void> {
    const db$: Observable<IDBDatabase> = this.getDB();

    return db$.pipe(
        switchMap((db: IDBDatabase) => {
            return from(this.update(db, item));
        })
    );
  }

  deleteItem<T>(id: number): Observable<void> {
    const db$: Observable<IDBDatabase> = this.getDB();

    return db$.pipe(
        switchMap((db: IDBDatabase) => {
            return from(this.delete(db, id)          
        );
      })
    );
  }

  private openDB(): Promise<IDBDatabase | DOMException | null> {
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
  }

  private getData<T>(db: IDBDatabase): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction(
          this.tableName,
          'readonly'
        );
        const store: IDBObjectStore = transaction.objectStore(this.tableName);
        const request: IDBRequest<T[]> = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject([]);
      })
  }

  private create<T>(db: IDBDatabase, item: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction(
          this.tableName,
          'readwrite'
        );
        const store: IDBObjectStore = transaction.objectStore(this.tableName);
        const request: IDBRequest<IDBValidKey> = store.add(item);
        
        request.onsuccess = () => resolve();
        
        request.onerror = () => reject(request.error);
      })
  }

  private update<T>(db: IDBDatabase, item: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction(
          this.tableName,
          'readwrite'
        );
        const store: IDBObjectStore = transaction.objectStore(this.tableName);
        const request: IDBRequest<IDBValidKey> = store.put(item);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    })
  }

  private delete(db: IDBDatabase, id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction(
          this.tableName,
          'readwrite'
        );
        const store: IDBObjectStore = transaction.objectStore(this.tableName);
        const request: IDBRequest<undefined> = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    })
  }

  private getDB(): Observable<IDBDatabase> {
    return this.initDB().pipe(
        switchMap((db: IDBDatabase | DOMException | null) => {
          if(db instanceof DOMException) {
            throw new Error('No Database Exception');          
          }
  
          if(db) {
            return of(db);
          }
  
          throw new Error('No Database');
        }),
    );
  }

}