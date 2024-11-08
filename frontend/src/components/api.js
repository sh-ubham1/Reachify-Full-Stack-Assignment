const API_URL = "http://localhost:8000";

export async function getItems() {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
}

export async function deleteItem(id) {
    const response = await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete item');
}
