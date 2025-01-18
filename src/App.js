import React, { useEffect, useState } from 'react';
import { addContact, getContacts } from './db';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const handleAddContact = () => {
    addContact(name, phone, email).then(() => {
      getContacts().then(setContacts);
    });
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div>
      <h1>Address Book</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddContact();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>

      <h2>Contacts:</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.phone} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
