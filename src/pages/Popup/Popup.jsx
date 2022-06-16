import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './Popup.css';
import retrievalService from '../../../utils/retrivalService';
import BotRow from './BotRow';

const Popup = () => {

  const [showBotList, setShowBotList] = useState(false);
  const [botList, setBotList] = useState([]);
  const [channelName, setChannelName] = useState('');


  async function getBotsInChat() {
    let bots = await retrievalService.getBotList();
    let viewers = await retrievalService.getViewersInChat(await retrievalService.getChannelNameInCurrentTab());
    let botNameKeyToAmountOfChannels = {};
    bots.forEach(bot => {
      botNameKeyToAmountOfChannels[bot[0]] = bot[1];
    });
    setShowBotList(false);
    setBotList({});
    let viewrBots = [];
    viewers.forEach((user, index) => {
      let amountOfChannels = botNameKeyToAmountOfChannels[user.toLowerCase()];
      if (amountOfChannels) {
        viewrBots.push({ name: user, amountOfChannels: amountOfChannels });
      }

    });
    if (viewrBots.length > 0) {
      setBotList(viewrBots);
      setShowBotList(true);
    }
  }

  return (
    <div className="App">
      <Button variant="primary" onClick={getBotsInChat}>Show Bots</Button>

      <div className='bot-list'>

        {showBotList && (() => `bots for ${channelName}`) &&
          <Table responsive="sm">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th># of Channels</th>
              </tr>
              {botList.map((bot, index) => {
                return <BotRow bot={bot} index={index} key={index + "_bot"}></BotRow>
              })}
            </tbody>
          </Table>

        } </div>
    </div>
  );
};

export default Popup;
