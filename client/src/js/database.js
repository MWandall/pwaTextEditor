import { openDB } from 'idb';

const initdb = async () =>

  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateObj')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateObj', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log('PUT to the database');
  // console.error(error);
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jateObj', 'readwrite');
  const store = tx.objectStore('jateObj');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.log('GET from the database');
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jateObj', 'readonly');
  const store = tx.objectStore('jateObj');
  const request = store.get(1); 
  const result = await request;

  console.log('result.value', result?.value);
  return result?.value;
};

initdb();