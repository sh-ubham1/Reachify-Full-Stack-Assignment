import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import { getItems, deleteItem } from './api';

function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const fetchedItems = await getItems();
                setItems(fetchedItems);
            } catch (error) {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch {
            setError("Failed to delete item");
        }
    };

    return (
        <div>
            <h1>Item List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                items.map(item => (
                    <Item key={item.id} item={item} onDelete={handleDelete} />
                ))
            )}
        </div>
    );
}

export default App;
