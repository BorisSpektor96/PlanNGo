const addBusinessToFavorite = async (userEmail, businessEmail) => {
  try {
    const response = await fetch('http://localhost:3001/users/addToFavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail,
        businessEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Server request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Server request failed');
  }
}

const deleteBusinessFromFavorites = async (userEmail, businessEmail) => {
  try {
    const response = await fetch('http://localhost:3001/users/deleteFromFavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail,
        businessEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Server request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Server request failed');
  }
}

export { deleteBusinessFromFavorites, addBusinessToFavorite };