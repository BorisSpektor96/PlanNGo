import { useState } from 'react';
import MessageContent from './MessageContent';

const MessageItem = ({ id, data, index, onRemoveMessage, onChangeRead, onShowReply, type }) => {
    const [ showContent, setShowContent ] = useState(false); // Add useState here

    let email = type === 'business' ? data.userEmail : data.businessEmail;

    return (
        <>
            <tr className="table-secondary">
                <td className="text-center">{ index + 1 }</td>
                <td className="text-center">
                    { `
                    ${new Date(data.date).getHours()}:${new Date(data.date).getMinutes().toString().padStart(2, '0')}
                    ${new Date(data.date).getDate()}/${new Date(data.date).getMonth() + 1}/${new Date(data.date).getFullYear().toString().slice(2)}
                    ` }
                </td>
                <td className="text-center">{ email }</td>
                <td className="text-center">{ data.subject }</td>
                <td className="text-center">
                    <input type="checkbox" className="custom-control-input" id="customSwitches"
                        checked={ data.read }
                        onChange={ () => onChangeRead(id, data.read) }
                    />
                </td>
                <td className="text-center">
                    <button type="button" className={ showContent ? "btn btn-success btn-sm" : "btn btn-outline-success btn-sm" }
                        onClick={ () => setShowContent(!showContent) }>
                        Show
                    </button>
                </td>

                <td className="text-center">
                    <button type="button" className="btn  btn-outline-primary btn-sm"
                        onClick={ () => onShowReply(email) } >reply
                    </button>
                </td>

                <td className="text-center">
                    <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={ () => onRemoveMessage(id) }>
                        delete
                    </button>
                </td>
            </tr>
            {
                showContent &&
                <MessageContent message={ data } onClose={ () => setShowContent(!showContent) } />
            }
        </>
    );
};

export default MessageItem;