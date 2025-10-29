import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import ContactCard from '../components/ContactCard';
import ContactFormModal from '../components/ContactForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const Dashboard = () => {
  const { filteredContacts = [], addContact, updateContact, deleteContact } = useContacts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (selectedContact) {
      updateContact(selectedContact._id, formData);
    } else {
      addContact(formData);
    }
    setSelectedContact(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar and Add Contact Button Side by Side */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <SearchBar />
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors shadow-sm whitespace-nowrap"
            aria-label="Add a new contact"
          >
            <Plus size={20} />
            Add Contact
          </button>
        </div>

        <div className="mb-8">
          <TagFilter />
        </div>

        {filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No contacts found. Add your first contact!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ContactFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        contact={selectedContact}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (contactToDelete) {
            deleteContact(contactToDelete._id);
          }
        }}
        contact={contactToDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />

      <Toast />
    </div>
  );
};

export default Dashboard;
