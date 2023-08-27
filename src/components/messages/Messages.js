import React from "react";
import MessageItem from "./MessageItem";
import { useState, useEffect, useContext } from 'react';
import MessageForm from './MessageForm'
import { PopupMessageContext } from "../../PopupMessage";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "../../profileInfoSlice";

const Messages = () => {

    const { showMessage } = useContext(PopupMessageContext)
    const profileInfo = useSelector((state) => state.profileInfo)
    const dispatch = useDispatch()

    const [ showSent, setShowSent ] = useState(false);
    const [ showReceived, setShowReceived ] = useState(true);
    const [ showReply, setShowReply ] = useState(false);
    const [ emailForReply, setEmailForReply ] = useState("");
    const [ messagesData, setMessagesData ] = useState(profileInfo.messages);

    useEffect(() => {
        dispatch(updateMessages(messagesData))
    }, [ messagesData ])

    let type = "user";

    if (profileInfo.isBusiness) {
        type = "business"
    }

    const api = type === 'business' ? "http://localhost:3001/business/" : "http://localhost:3001/users/"

    const handleShowReply = (email) => {
        setEmailForReply(email);
        setShowReply(true);
    };

    if (!profileInfo || !messagesData) return null;

    const filteredMessages = messagesData.filter((message) => {
        if (showSent && showReceived) return true;
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
                    email: profileInfo.email,
                    id: id,
                    read: !read,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessagesData((prevMessages) =>
                    prevMessages.map((message) => {
                        if (message._id === id) {
                            return { ...message, read: !read };
                        }
                        return message;
                    })
                );
                showMessage(data.message, data.type)
            } else {
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
                body: JSON.stringify({ email: profileInfo.email, id }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessagesData((prevMessages) =>
                    prevMessages.filter(
                        (message) =>
                            message._id !== id
                    )
                );
                showMessage(data.message, data.type)
            } else {
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
                            type={ type }
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