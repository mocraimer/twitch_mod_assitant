import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import retrievalService from '../../../utils/retrivalService';

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
      <Button variant="primay" onClick={getBotsInChat}>Show Bots</Button>

      <div className='bot-list'>
        {showBotList && (() => `bots for ${channelName}`) &&
          botList.map((bot, index) => {
            return <div key={index}>{bot.name} is in {bot.amountOfChannels} channels</div>
          })}
      </div>
    </div>
  );
};

export default Popup;
