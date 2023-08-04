import React, { useState, useEffect } from 'react';
// import App from './App';
import './App.css';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotCard from './components/BotCard';

function App() {
 
 
  const [allBots, setAllBots] = useState([]); // State to store all available bots
  const [enlistedBots, setEnlistedBots] = useState([]); // State to store enlisted bots
  const [selectedBot, setSelectedBot] = useState(null); //selected for view specs
    // State to track whether a bot has been enlisted to show/hide the "Enlist" button
    const [enlisted, setEnlisted] = useState(false);


  //Fetch
    useEffect(() =>  {
      fetch('https://bots-server-7jow.onrender.com/bots')
        .then((response) => response.json())
        .then((data) => {
          console.log ('data', data)
        // setAllBots(data.slice(0,12));
        setAllBots(data);
        // console.groupCollapsed(data.slice(0,1))
        })
    }, []);

    //Function to Enlist a bot into the army
    const enlistBot = (bot) => {
      // Check if the bot is not already in the army
      if (!enlistedBots.some((enlistedBot) => enlistedBot.id === bot.id)) {
        setEnlistedBots([...enlistedBots, bot]);
        }
      };
   

    // Function to release a bot from the army
      const releaseBot = (botId) => {
      setEnlistedBots(enlistedBots.filter((bot) => bot.id !== botId));
      };
 
   
      //Function to discharge a bot forever
      const dischargeBot = (botId) => {
       
          // Remove the bot from the frontend first
          setEnlistedBots(enlistedBots.filter((bot) => bot.id !== botId));
          console.log(botId)
          // Then make a DELETE request to the backend API to remove it from the database
            fetch(` http://localhost:3000/bots`, {
          method: "DELETE",
            });

          // If the deletion is successful, update the state to remove the bot from enlistedBots
          setEnlistedBots(enlistedBots.filter((bot) => bot.id !== botId));
          setAllBots(allBots.filter((bot) => bot.id !== botId));
          }
     
    // Function to handle displaying the bot specifications and enlisting a bot
    const handleSelectBot = (bot) => {
    setSelectedBot(bot);
    setEnlisted(false); // Reset enlisted state when displaying specifications
    };

      // Function to handle enlisting a bot and return to the homepage
    const handleEnlistBot = (bot) => {
    enlistBot(bot);
    setSelectedBot(null) //go back to homepage
    // setEnlisted(true); // Set enlisted state to show "Enlist" button
  };


return (
  <BotCollection bots={allBots}enlistBot={enlistBot} onSelectBot={handleSelectBot} />
)

    // return (
      // <div>
      //   <div>
      //     <h1>Bot Battle App</h1>
      //   </div>
       
      //     {selectedBot ? (
      //       <div>
      //         <BotCard bot={selectedBot} enlistBot={handleEnlistBot} showEnlistButton={!enlisted} />
      //       </div>
      //     ) : (
      //       // Show bot collection
      //       <>
      //         <div>
      //           <YourBotArmy bots={enlistedBots} releaseBot={releaseBot} dischargeBot={dischargeBot} />
      //         </div>
      //         <div>
      //           <BotCollection bots={allBots} enlistBot={enlistBot} onSelectBot={handleSelectBot} />
      //         </div>
      //         </>
      //        )}
      // </div>
      //       )}
}
export default App;
