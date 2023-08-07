import React from "react";
import MessageItem from "./MessageItem";
import { ProfileInfoContext } from '../../ProfileInfoContext';
import { useContext, useState } from 'react';
import MessageForm from './MessageForm'
const Messages = () => {
    const { profileInfo, dispatch } = useContext(ProfileInfoContext);
    const [localProfileInfo, setLocalProfileInfo] = useState(profileInfo);
    const [showSent, setShowSent] = useState(false);
    const [showReceived, setShowReceived] = useState(true);
    const [showReply, setShowReply] = useState(false);
    const [businessEmailForReply, setBusinessEmailForReply] = useState("");

    // Function to handle showing the reply form
    const handleShowReply = (businessEmail, businessName) => {
        setBusinessEmailForReply(businessEmail);
        setShowReply(true);
    };
    const [messagesData, setMessagesData] = useState(localProfileInfo?.messages);

    if (!localProfileInfo || !messagesData) return null;

    // Filter the messages based on the selected statuses
    const filteredMessages = messagesData.filter((message) => {
        if (showSent && showReceived) return true; // Show all messages if both checkboxes are checked
        if (showSent && message.status === "sent") return true;
        if (showReceived && message.status === "received") return true;
        return false;
    });
    const onChangeRead = async (businessEmail, date, read) => {
        try {
            const response = await fetch("http://localhost:3001/users/markAs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localProfileInfo.email,
                    businessEmail,
                    date,
                    read: !read,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Update the state to reflect the updated read status
                setMessagesData((prevMessages) =>
                    prevMessages.map((message) => {
                        if (
                            message.businessEmail === businessEmail &&
                            new Date(message.date).toISOString() === new Date(date).toISOString()
                        ) {
                            return { ...message, read: !read };
                        }
                        return message;
                    })
                );
                // Display a success message (you can implement this using state and a modal, for example)
                console.log("Message status updated successfully!");
            } else {
                // Display an error message (you can implement this using state and a modal, for example)
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error while updating message status:", error);
        }
    };

    const handleRemoveMessage = async (businessEmail, date) => {


        try {
            const response = await fetch("http://localhost:3001/users/removeMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: localProfileInfo.email, businessEmail, date }),
            });

            const data = await response.json();
            if (response.ok) {
                // If the message was removed successfully, update the state to remove the message from the table
                setMessagesData((prevMessages) =>
                    prevMessages.filter(
                        (message) =>
                            message.businessEmail !== businessEmail ||
                            new Date(message.date).toISOString() !== new Date(date).toISOString()
                    )
                );
                // Display a success message (you can implement this using state and a modal, for example)
                console.log("Message removed successfully!");
            } else {
                // Display an error message (you can implement this using state and a modal, for example)
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error while removing message:", error);
        }
    };

    return (
        <div className="p-4 ">
            <p className="text-center display-6 pt-3">Messages</p>
            <div className="p-3 d-flex justify-content-center">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showSent}
                        onChange={() => setShowSent(!showSent)}
                        id="showSentCheckbox"
                    />
                    <label className="form-check-label" htmlFor="showSentCheckbox">
                        Show Sent Messages
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showReceived}
                        onChange={() => setShowReceived(!showReceived)}
                        id="showReceivedCheckbox"
                    />
                    <label className="form-check-label" htmlFor="showReceivedCheckbox">
                        Show Received Messages
                    </label>
                </div>
            </div>
            <table className="table table-responsive table-striped table-hover mt-3 mb-3">
                <thead>
                    <tr className="table-secondary">
                        <th className="text-center" scope="col"> # </th>
                        <th className="text-center" scope="col">date</th>
                        <th className="text-center" scope="col">recipient </th>
                        <th className="text-center" scope="col">subject</th>
                        <th className="text-center" scope="col">status (forTest)</th>
                        <th className="text-center" scope="col">mark as read</th>
                        <th className="text-center" scope="col">Content</th>
                        <th className="text-center" scope="col"></th>
                        <th className="text-center" scope="col"> </th>
                    </tr>
                </thead>
                <tbody className="">
                    {filteredMessages.map((message, index) => (
                        <MessageItem key={message._id.$oid}data={message} index={index} onChangeRead={onChangeRead} onShowReply={handleShowReply}
                            onRemoveMessage={handleRemoveMessage} />
                    ))}
                </tbody>
            </table>
            {showReply && (
                <MessageForm
                    fullname={profileInfo.fullname}
                    userEmail={profileInfo.email}
                    businessEmail={businessEmailForReply} 
                    onClose={() => setShowReply(false)}
                />
            )}

        </div>
    );
};

export default Messages;
