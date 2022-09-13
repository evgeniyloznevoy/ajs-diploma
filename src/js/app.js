/**
 * Entry point of app: don't change this
 */
 import GamePlay from './gamePlay';
 import GameController from './gameController';
 import GameStateService from './gameStateService';
 
 const gamePlay = new GamePlay();
 gamePlay.bindToDOM(document.querySelector('#game-container'));
 
 const stateService = new GameStateService(localStorage);
 
 const gameCtrl = new GameController(gamePlay, stateService);
 gameCtrl.init();
 
 // don't write your code here