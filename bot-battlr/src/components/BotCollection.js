import React from 'react'
import BotCard from './BotCollection';

function BotCollection({ bots, enlistBot, onSelectBot }) {

  return (
   
    <div>
    <h1>Available Bots</h1>
    <div className="bot-list-container">
      {bots.map((bot) => (
        console.log ('bot', bot) 
      
         return (

          <BotCard 
          key={bot.id}
          bot={bot}
          enlistBot={enlistBot}
           // onClickButton={() => onSelectBot(bot)}
         
          /> )
        ))}
        </div>
    </div>
  )
}

export default BotCollection;