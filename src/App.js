import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "";

  function searchForPlayer(event) {
    let APICallString = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + searchText + '?api_key=' + API_KEY;
    axios.get(APICallString)
      .then(function (response) {
        setPlayerData(response.data);
        const id = response.data.id;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className='App'>
      <div className='container'>
        <h2>League of Legends player searcher</h2>
        <input type='text' placeholder='Summoner name' onChange={e => setSearchText(e.target.value)}></input>
        <button className='search' onClick={e => searchForPlayer(e)}>Search</button>
      </div>
      {JSON.stringify(playerData) !== '{}' ? (
        <>
          <p>{playerData.name} </p>
          <img width="100" height="100" src={'http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/' + playerData.profileIconId + '.png'} alt="Profile Icon"></img>
          <p>Summoner level {playerData.summonerLevel}</p>
          <div>
          </div>
        </>
      ) : (
        <><p>No player data</p></>
      )}
    </div>
  )
}
