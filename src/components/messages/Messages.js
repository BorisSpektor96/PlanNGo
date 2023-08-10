import React from "react";
import MessageItem from "./MessageItem";
import { ProfileInfoContext } from '../../ProfileInfoContext';
import { useContext, useState, useEffect } from 'react';
import MessageForm from './MessageForm'

// *************** redux ***************
import { Store } from '../../Store'
import { useSelector } from "react-redux";
// *************** redux ***************

const Messages = () => {

    // const { profileInfo, dispatch } = useContext(ProfileInfoContext);
    const profileInfo = useSelector((state) => state.profileInfo)
    useEffect(() => {
        console.log(profileInfo);
    }, [])

    const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);
    const [ showSent, setShowSent ] = useState(false);
    const [ showReceived, setShowReceived ] = useState(true);
    const [ showReply, setShowReply ] = useState(false);
    const [ emailForReply, setEmailForReply ] = useState("");

    let type = "user";
    useEffect(() => {
        setLocalProfileInfo(profileInfo);
    }, [ profileInfo ]);

    if (localProfileInfo.isBusiness) {
        type = "business"
    }

    const api = type === 'business' ? "http://localhost:3001/business/" : "http://localhost:3001/users/"

    // Function to handle showing the reply form
    const handleShowReply = (email) => {
        setEmailForReply(email);
        setShowReply(true);
    };
    const [ messagesData, setMessagesData ] = useState(localProfileInfo?.messages);

    if (!localProfileInfo || !messagesData) return null;

    // Filter the messages based on the selected statuses
    const filteredMessages = messagesData.filter((message) => {
        if (showSent && showReceived) return true; // Show all messages if both checkboxes are checked
        if (showSent && message.status === "sent") return true;
        if (showReceived && message.status === "received") return true;
        return false;
    });
    const onChangeRead = async (id, read) => {
        try {
            const response = await fetch(api + "markAs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localProfileInfo.email,
                    id: id,
                    read: !read,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Update the state to reflect the updated read status
                setMessagesData((prevMessages) =>
                    prevMessages.map((message) => {
                        if (
                            message._id === id
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

    const handleRemoveMessage = async (id) => {
        try {
            const response = await fetch(api + 'removeMessage', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: localProfileInfo.email, id }),
            });

            const data = await response.json();
            if (response.ok) {
                // If the message was removed successfully, update the state to remove the message from the table
                setMessagesData((prevMessages) =>
                    prevMessages.filter(
                        (message) =>
                            message._id !== id
                        // message.businessEmail !== email &&
                        // new Date(message.date).toISOString() !== new Date(date).toISOString()
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
    // const getMessages = async () => {
    //     try {
    //         const response = await fetch(api + "getMessages", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email: profileInfo.email }),
    //         });

    //         const messages = await response.json()
    //         if (response.ok) {
    //             setMessagesData(messages);
    //         } else {
    //             console.error("cannot get messages");
    //         }
    //     } catch (error) {
    //         console.error("Error while updating message status:", error);
    //     }
    // }
    return (
        <div className="p-4 ">
            <p className="text-center display-6 pt-3">Messages</p>
            <div className="p-3 d-flex justify-content-center">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={ showSent }
                        onChange={ () => setShowSent(!showSent) }
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
                        checked={ showReceived }
                        onChange={ () => setShowReceived(!showReceived) }
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
                        <th className="text-center" scope="col">
                            {
                                showReceived && !showSent
                                    ? "From"
                                    : showSent && !showReceived
                                        ? "To"
                                        : "From / To"
                            }
                        </th>
                        <th className="text-center" scope="col">subject</th>
                        <th className="text-center" scope="col">mark as read</th>
                        <th className="text-center" scope="col">Content</th>
                        <th className="text-center" scope="col"></th>
                        <th className="text-center" scope="col"> </th>
                    </tr>
                </thead>
                <tbody className="">
                    { filteredMessages.map((message, index) => (
                        <MessageItem
                            id={ message._id }
                            data={ message }
                            index={ index }
                            onChangeRead={ onChangeRead }
                            onShowReply={ handleShowReply }
                            type={ type } // Pass the current user type to the MessageItem component
                            onRemoveMessage={ handleRemoveMessage }
                        />
                    )) }
                </tbody>
            </table>
            { showReply && (
                <MessageForm
                    type={ type }
                    from={ profileInfo.email }
                    to={ emailForReply }
                    onClose={ () => setShowReply(false) }
                />
            ) }
        </div>
    );
};

export default Messages;