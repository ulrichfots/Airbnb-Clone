// Définir les types des props pour le composant MenuItem
interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
    return (
        <div onClick={onClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {label}
        </div>
    )
}

export default MenuItem;
