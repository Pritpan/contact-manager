import { useContacts } from '../context/ContactContext';

const Toast = () => {
  const { showToast, toastMessage } = useContacts();

  if (!showToast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in"
      role="alert"
    >
      {toastMessage}
    </div>
  );
};

export default Toast;