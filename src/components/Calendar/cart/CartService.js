const sendCartListToServer = async (businessEmail, cartList) => {
  try {
    const response = await fetch("http://localhost:3001/business/incrementProductQuantityArray", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: businessEmail,
        productsArray: cartList,
      }),
    });

    if (!response.ok) {
      throw new Error("Server request failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Server request failed");
  }
};

export { sendCartListToServer };