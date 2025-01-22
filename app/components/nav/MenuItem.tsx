interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition font-medium text-gray-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default MenuItem;