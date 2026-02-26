const variants = {
  primary:   "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  danger:    "bg-red-600 text-white hover:bg-red-700",
  outline:   "border border-primary text-primary hover:bg-primary hover:text-white",
};

const Button = ({ children, variant = "primary", type = "button", loading, disabled, onClick, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Loading...
      </span>
    ) : children}
  </button>
);

export default Button;
