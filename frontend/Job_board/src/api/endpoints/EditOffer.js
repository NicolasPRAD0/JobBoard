const baseUrl = import.meta.env.VITE_BASE_URL

export const Edit = async function (id, data) {
    try {
        const response = await fetch(`${baseUrl}/offer/updateOffer/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update offer');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};