import React from 'react';
import { Button } from 'react-bootstrap';
import './Popup.css';



const BotRow = (props) => {
    let copyBanMsgToClipboard = async () => {
        await navigator.clipboard.writeText(`/ban ${props.bot.name} banned by twitch mod assitant`);
    }

    return (
        <tr key={props.index}>
            <td key={props.index + "_index"}>{props.index + 1}</td>
            <td key={props.index + "_name"} style={{ width: "100px", textOverflow: "ellipsis" }}>{props.bot.name}</td>
            <td key={props.index + "_amount"}>{props.bot.amountOfChannels}</td>
            <td key={props.index + "_btn"}>
                <Button onClick={copyBanMsgToClipboard}>
                    Copy Ban Message
                </Button>

            </td>
        </tr>
    );
};
export default BotRow;
