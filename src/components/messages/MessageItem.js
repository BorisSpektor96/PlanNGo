import { useState } from 'react';

const MessageItem = ({ id, data, index, onRemoveMessage, onChangeRead, onShowReply, type }) => {
    const [ showContent, setShowContent ] = useState(false); // Add useState here

    let email = type === 'business' ? data.userEmail : data.businessEmail;

    return (
        <>
            <tr className="table-secondary">
                <td className="text-center">{ index + 1 }</td>
                <td className="text-center">{ data.date }</td>
                <td className="text-center">{ email }</td>
                <td className="text-center">{ data.subject }</td>
                <td className="text-center">
                    <input type="checkbox" class="custom-control-input" id="customSwitches"
                        checked={ data.read }
                        onChange={ () => onChangeRead(id, data.read) }
                    />
                </td>
                <td className="text-center">
                    <button type="button" class={ showContent ? "btn btn-success btn-sm" : "btn btn-outline-success btn-sm" }
                        onClick={ () => setShowContent(!showContent) }>
                        { showContent ? "Hide " : "Show " }
                    </button>
                    { showContent && (
                        <td className=" d-flex justify-content-center p-2"> { data.content } </td>
                    ) }
                </td>

                <td className="text-center">
                    <button type="button" class="btn  btn-outline-primary btn-sm"
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
        </>
    );
};

export default MessageItem;