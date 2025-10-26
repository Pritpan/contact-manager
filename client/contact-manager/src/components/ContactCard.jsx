import { Edit2, Trash2, Mail, Phone, Tag } from "lucide-react";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(contact)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail size={18} className="text-gray-400" />
          <span>{contact.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={18} className="text-gray-400" />
          <span>{contact.phone}</span>
        </div>
      </div>

      {contact.notes && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{contact.notes}</p>
      )}

      {contact.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag size={16} className="text-gray-400" />
          {contact.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactCard;