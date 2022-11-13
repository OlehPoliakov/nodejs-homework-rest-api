const fs = require('fs/promises');
const path = require('path');
const ObjectID = require('bson-objectid');

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async contact => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const allContacts = await listContacts();
  const data = await allContacts.find(contact => contact.id === id);
  if (!data) {
    return null;
  }
  return data;
};

const removeContact = async id => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }

  const [result] = allContacts.splice(idx, 1);
  updateContacts(allContacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

const updateContactById = async (id, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }

  allContacts[idx] = { id, ...body };
  await updateContacts(allContacts);
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
