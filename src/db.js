// db.js - working with IndexedDB

const dbName = 'addressBookDB';
const storeName = 'contacts';

// Open the IndexedDB database
const openDb = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onerror = (e) => reject('Error opening IndexedDB:', e.target.error);
        request.onsuccess = (e) => resolve(e.target.result);
    });
};

// Add a contact to IndexedDB
const addContact = async (name, phone, email) => {
    const db = await openDb();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    const contact = { name, phone, email };
    const request = store.add(contact);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(contact);
        request.onerror = (e) => reject('Error adding contact:', e.target.error);
    });
};

// Get all contacts from IndexedDB
const getContacts = async () => {
    const db = await openDb();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject('Error retrieving contacts:', e.target.error);
    });
};

export { addContact, getContacts };
