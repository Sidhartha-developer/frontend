const styles = {
  success: "bg-green-50 text-green-800 border border-green-200",
  error:   "bg-red-50 text-red-800 border border-red-200",
  info:    "bg-blue-50 text-blue-800 border border-blue-200",
};

const Alert = ({ type = "info", message, onClose }) => {
  if (!message) return null;
  return (
    <div className={`flex justify-between items-center px-4 py-3 rounded-lg text-sm ${styles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold opacity-60 hover:opacity-100">
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
