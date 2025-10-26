import { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      tags: ['Work', 'Client'],
      notes: 'Lead designer at TechCorp. Prefers email communication for project updates.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      tags: ['Family'],
      notes: 'Birthday: March 15th. Lives in San Francisco.'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      tags: ['Friends', 'Gym'],
      notes: 'Met at yoga class. Interested in hiking trips.'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      tags: ['Team', 'Work'],
      notes: 'Product manager. Weekly check-ins on Mondays.'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now().toString() };
    setContacts([newContact, ...contacts]);
    displayToast('Contact added successfully!');
  };

  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(c => c.id === id ? { ...updatedContact, id } : c));
    displayToast('Contact updated successfully!');
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    displayToast('Contact deleted successfully!');
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery);
    
    const matchesTag = selectedTag === 'All' || contact.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const allTags = ['All', ...new Set(contacts.flatMap(c => c.tags))];

  return (
    <ContactContext.Provider value={{
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
      toastMessage
    }}>
      {children}
    </ContactContext.Provider>
  );
};