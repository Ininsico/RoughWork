const Hero: React.FC = () => {
    const items = [1, 2, 34, 5, 6];
    return (
        <div className="p-8 bg-gray-800 min-h-screen">
            <div className="h-48 bg-gray-500 rounded mb-2">
                <h3 className="text-lg font-semibold mb-2">item {items}</h3>
                <p className="text-gray-500">This is a item number {items} in a grid layout</p>
            </div>
        </div>
    )
}