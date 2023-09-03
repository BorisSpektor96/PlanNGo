const sendMessage = async (email, messageData, isBusiness) => {
    try {
        // Define the endpoint based on whether it's a business or user message
        const endpoint = isBusiness ? "business/addMessage" : "users/addMessage";

        // Make an API call to send the message
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                message: messageData,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.log("Error:", error);
        return { success: false, message: "Failed to send message" };
    }
};

const createMessage = (read, email, date, content, status, subject, isBusiness) => {
    return {
        read,
        date: date || new Date().toISOString(),
        content,
        status,
        subject,
        ...(isBusiness ? { userEmail: email } : { businessEmail: email }),
    };
};

export { sendMessage, createMessage };
