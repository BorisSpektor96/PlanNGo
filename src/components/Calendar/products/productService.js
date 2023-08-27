
const incrementProductQuantityHandler = async (productId, increment, businessEmail) => {
  try {
    const response = await fetch('http://localhost:3001/business/incrementProductQuantity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: businessEmail,
        productId: productId,
        increment: increment
      })
    });
    return response
  } catch (error) {
    console.log('Error:', error);
  }
};

const decrementProductQuantityHandler = async (productId, decrement, businessEmail) => {
  try {
    const response = await fetch('http://localhost:3001/business/decrementProductQuantity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: businessEmail,
        productId: productId,
        decrement: decrement
      })
    });
    return response
  } catch (error) {
    console.log('Error:', error);
  }
};

export { incrementProductQuantityHandler, decrementProductQuantityHandler }