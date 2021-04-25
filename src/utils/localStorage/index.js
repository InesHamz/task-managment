import * as React from 'react';

/**
 * Adds an entry to localStorage to a specific key
 *
 * @param {string} key - localStorage key
 * @param {number} id - entry id
 * @param {string} title - entry title
 * @param {number} columnId - entry column id
 */
export function addEntryLocalStorage(key, id, title, columnId) {
  let existingEntries = JSON.parse(localStorage.getItem(key));
  if (existingEntries === null) existingEntries = [];
  let entry = {
    id,
    title,
    column: columnId,
  };

  // Here the existingEntries array is updated with the entry... That is entry is added to the array
  existingEntries.push(entry);

  // the entire array is saved to the local storage with the name(or key) of key. where key is whatever is passed in the function as a parameter
  localStorage.setItem(key, JSON.stringify(existingEntries));
}

/**
 * Updates an entry to localStorage to a specific key
 *
 * @param {string} key
 * @param {object} ticket
 * @param {string} title
 */

// this is just a basic function that accepts some params key, ticket, title.
// the first line gets the key and parses it to json. after which its being stored in a variable
// if the there's no key, then the entry is set to an empy array
export function updateEntryLocalStorage(key, ticket, title) {
  let existingEntries = JSON.parse(window.localStorage.getItem(key));
  if (existingEntries === null) existingEntries = [];

  // updateEntry is an object that spreads the ticket. The spread operator is use to tell Js to keep all the values of ticket in a new object and then add title to that new object
  let updatedEntry = { ...ticket, title };

  // foundIndex is a variable that is assigend to a filter which makeds sure that the id of the event is same as ticket. If that id is found (which is an index), is then assigned to tha variable
  let foundIndex = existingEntries.findIndex(e => e.id === ticket.id);

  // here the update is assigned to the array child at index of the index found
  existingEntries[foundIndex] = updatedEntry;

  window.localStorage.setItem(key, JSON.stringify(existingEntries));
}

/**
 *  Custom hook
 *
 * @param {string} key
 * @param {string} defaultValue
 * @returns {*}
 */


//This is a hook who's state is a key stored in the localStorage. The useEffect makes sure that any time the key or state changes, the local storage is updated.
//Hence it's dependencies are key and state. If left empty, it would only run once. when the component mounts.
export function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(() => JSON.parse(window.localStorage.getItem(key)) || defaultValue);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
