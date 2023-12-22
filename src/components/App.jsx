import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const contactExist = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExist) {
      alert(`${contact.name} is already in the contacts!`);
      return;
    }

    setContacts(prev => {
      const updatedContacts = [{ id: nanoid(), ...contact }, ...prev];
      console.log('Contacts after adding:', updatedContacts);
      return updatedContacts;
    });
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const showFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = contactId => {
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length > 0 ? (
        <h2>Contacts</h2>
      ) : (
        <p>Your contact list is empty</p>
      )}
      <Filter value={filter} onFilterContacts={filterContacts} />
      <ContactList
        contacts={showFilteredContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};
