export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg font-medium bg-amber-500 text-white hover:bg-amber-500 transition-colors shadow-md hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
