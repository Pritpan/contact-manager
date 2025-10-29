import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getAllContacts,
  createContact,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from '../services/contactService';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const displayToast = (message, duration = 3000) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  };

  const addContact = async (contact) => {
    try {
      const newContact = await createContact(contact);
      setContacts((prevContacts) => [newContact, ...prevContacts]);
      displayToast('Contact added successfully!');
    } catch (error) {
      console.error('Failed to add contact:', error);
      displayToast(error.response?.data?.message || 'Failed to add contact.');
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const updated = await updateContactService(id, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === id ? updated : c))
      );
      displayToast('Contact updated successfully!');
    } catch (error) {
      console.error('Failed to update contact:', error);
      displayToast(error.response?.data?.message || 'Failed to update contact.');
    }
  };

  const deleteContact = async (id) => {
    try {
      await deleteContactService(id);
      setContacts((prevContacts) => prevContacts.filter((c) => c._id !== id));
      displayToast('Contact deleted successfully!');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      displayToast(error.response?.data?.message || 'Failed to delete contact.');
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery);

      const matchesTag = selectedTag === 'All' || contact.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [contacts, searchQuery, selectedTag]);

  const allTags = useMemo(() => {
    return ['All', ...new Set(contacts.flatMap((c) => c.tags))];
  }, [contacts]);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        filteredContacts,
        searchQuery,
        setSearchQuery,
        selectedTag,
        setSelectedTag,
        allTags,
        addContact,
        updateContact,
        deleteContact,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};