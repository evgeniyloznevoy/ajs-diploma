!function(){"use strict";class e{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="info">\n        <span data-id="level">LEVEL: 1</span>\n        <span data-id="score">SCORE: 0</span>\n        <span data-id="best-score">BEST: 0</span>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.currentLevel=this.container.querySelector("[data-id=level]"),this.score=this.container.querySelector("[data-id=score]"),this.bestScore=this.container.querySelector("[data-id=best-score]"),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const a=document.createElement("div");a.classList.add("cell","map-tile","map-tile-"+(t=e,s=this.boardSize,t%8==0?t<s?"top-left":t>=s**2-s?"bottom-left":"left":t%8==7?t<s?"top-right":t>=s**2-s?"bottom-right":"right":t<s?"top":t>=s**2-s?"bottom":"center")),a.addEventListener("mouseenter",(e=>this.onCellEnter(e))),a.addEventListener("mouseleave",(e=>this.onCellLeave(e))),a.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(a)}var t,s;this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const s of e){const e=this.boardEl.children[s.position],a=document.createElement("div");a.classList.add("character",s.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=s.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${s.character.health}%`,i.appendChild(r),a.appendChild(i),e.appendChild(a)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((s=>{const a=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(()=>{a.removeChild(i),s()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}setLevel(e){this.currentLevel.innerHTML=`LEVEL: ${e+1}`}setScore(e){this.score.innerHTML="SCORE: "+ +e.toFixed(2)}setBestScore(e){this.bestScore.innerHTML="BEST: "+ +e.toFixed(2)}}class t{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";if(this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t,"Character"===new.target.name)throw new Error("Do not use new Character()")}}class s extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"bowman"),this.attack=25,this.defence=25,this.stepRadius=2,this.attackRadius=2}}class a extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"daemon"),this.attack=10,this.defence=40,this.stepRadius=1,this.attackRadius=4}}class i extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"magician"),this.attack=10,this.defence=40,this.stepRadius=1,this.attackRadius=4}}class r extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"swordsman"),this.attack=40,this.defence=10,this.stepRadius=4,this.attackRadius=1}}class o extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"undead"),this.attack=40,this.defence=10,this.stepRadius=4,this.attackRadius=1}}class n extends t{constructor(e){super(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"vampire"),this.attack=25,this.defence=25,this.stepRadius=2,this.attackRadius=2}}class l{constructor(e,s){if(!(e instanceof t))throw new Error("character must be instance of Character or its children");if("number"!=typeof s)throw new Error("position must be a number");this.character=e,this.position=s}get stepCells(){const e=[this.position],t=this.position%8;for(let s=1;s<=this.character.stepRadius;s+=1){const a=this.position-8*s,i=this.position-8*s+s,r=this.position+1*s,o=this.position+8*s+s,n=this.position+8*s,l=this.position+8*s-s,c=this.position-1*s,h=this.position-8*s-s;a>=0&&e.push(a),i%8>t&&i>=0&&e.push(i),r%8>t&&c<64&&e.push(r),o%8>t&&o<64&&e.push(o),n<64&&e.push(n),l%8<t&&l<64&&e.push(l),c%8<t&&c>=0&&e.push(c),h%8<t&&h>=0&&e.push(h)}return e}get attackCells(){const e=[],t=Math.floor(this.position/8)-this.character.attackRadius>=0?Math.floor(this.position/8)-this.character.attackRadius:0,s=Math.floor(this.position/8)+this.character.attackRadius<8?Math.floor(this.position/8)+this.character.attackRadius:7,a=this.position%8-this.character.attackRadius>=0?this.position%8-this.character.attackRadius:0,i=this.position%8+this.character.attackRadius<8?this.position%8+this.character.attackRadius:7;for(let r=t;r<=s;r+=1)for(let t=a;t<=i;t+=1)e.push(8*r+t);return e}}class c{constructor(e,t,s,a,i,r){this.turn=e,this.level=t,this.score=s,this.bestScore=a,this.playerTeam=i,this.enemyTeam=r}from(e){this.level=e.level,this.turn=e.turn,this.score=e.score,this.bestScore=e.bestScore,this.player=[],this.enemy=[];for(const t of e.player){let e=0;switch(t.type){case"swordsman":e=new r(t.member.character.level);break;case"bowman":e=new s(t.member.character.level);break;case"magician":e=new i(t.member.character.level);break;default:throw new Error("It is not player classes!")}for(const s in t.member.character)({}).hasOwnProperty.call(t.member.character,s)&&(e[s]=t.member.character[s]);this.player.push({type:t.type,member:new l(e,t.member.position)})}for(const t of e.enemy){let e=0;switch(t.type){case"vampire":e=new n(t.member.character.level);break;case"daemon":e=new a(t.member.character.level);break;case"undead":e=new o(t.member.character.level);break;default:throw new Error("It is not enemy classes!")}for(const s in t.member.character)({}).hasOwnProperty.call(t.member.character,s)&&(e[s]=t.member.character[s]);this.enemy.push({type:t.type,member:new l(e,t.member.position)})}}set playerTeam(e){this.player=[];for(const t of e)this.player.push({type:t.character.type,member:t})}get playerTeam(){return this.player.map((e=>e.member))}set enemyTeam(e){this.enemy=[];for(const t of e)this.enemy.push({type:t.character.type,member:t})}get enemyTeam(){return this.enemy.map((e=>e.member))}}var h=["prairie","desert","arctic","mountain"];function*d(e,t){const s=Math.floor(Math.random()*e.length),a=Object.create(e[s]);a.level=Math.floor(1+Math.random()*t),yield a}function m(e,t,s){const a=[];for(let i=0;i<s;i+=1)a.push(d(e,t).next().value);return a}function*p(e,t){if(Math.max(e)>t-1)throw new Error("Line`s number greater than board size!");const s=[...Array(t**2).keys()].filter((s=>e.includes(s%t)));for(let e=s.length-1;e>0;e-=1){const t=Math.floor(Math.random()*(e+1));[s[e],s[t]]=[s[t],s[e]]}for(const e of s)yield e}class u{constructor(){this.positioned=[],this.allowedTypes=[new s,new r],this.startLines=[0,1]}init(){const e=m(this.allowedTypes,1,2),t=p(this.startLines,8);return e.forEach((e=>{this.positioned.push(new l(e,t.next().value))})),this.positioned}add(e){this.positioned.push(e)}levelUp(e){const t=p(this.startLines,8);for(const e of this.positioned)e.character.level+=1,e.character.attack=+Math.floor(Math.max(e.character.attack,e.character.attack*(1.8-(1-e.character.health/100)))).toFixed(2),e.character.defence=+Math.floor(Math.max(e.character.defence,e.character.defence*(1.8-(1-e.character.health/100)))).toFixed(2),e.character.health=e.character.health>20?100:e.character.health+80,e.position=t.next().value;const s=e<3?1:2,a=m([...this.allowedTypes,new i],e-1,s);for(const e of a)e.attack=Math.floor(e.attack*(1.8-(1-e.health/100))**(e.level-1)),e.defence=Math.floor(e.defence*(1.8-(1-e.health/100))**(e.level-1)),this.add(new l(e,t.next().value))}}class y extends u{constructor(){super(),this.allowedTypes=[new a,new o,new n],this.startLines=[6,7]}turn(e){return this.attack(e)?this.attack(e):(this.step(e),null)}attack(e){const t=[];return this.positioned.forEach((s=>{t.push(e.filter((e=>s.attackCells.includes(e.position))).map((e=>{const t=Math.max(s.character.attack-e.character.defence,.1*s.character.attack);return{index:s.position,attackIndex:e.position,coef:e.character.health/t}})))})),[].concat(...t).sort(((e,t)=>e.coef-t.coef))[0]}step(e){const t=[];this.positioned.forEach((s=>{e.forEach((e=>{t.push({member:s,targetIndex:e.position,distance:y.calcSteps(s,e,8)})}))})),t.sort(((e,t)=>e.distance<t.distance?-1:e.distance>t.distance?1:e.member.character.attack>t.member.character.attack?-1:e.member.character.attack<t.member.character.attack?1:0));const s=y.bestMove(t[0].member,t[0].targetIndex,8);for(let a=0;a<s.length;a+=1)if([...e,...this.positioned].findIndex((e=>e.position===s[a].stepIndex))<0){t[0].member.position=s[a].stepIndex;break}}static calcSteps(e,t,s){const a=Math.abs(Math.floor(e.position/s)-Math.floor(t.position/s)),i=Math.abs(Math.floor(e.position%s)-Math.floor(t.position%s)),r=Math.ceil((a-e.character.attackRadius)/e.character.stepRadius),o=Math.ceil((i-e.character.attackRadius)/e.character.stepRadius);return r<o?o>0?o:0:r>0?r:0}static bestMove(e,t,s){const a=[];return e.stepCells.forEach((i=>{const r=Math.abs(Math.floor(i/s)-Math.floor(t/s)),o=Math.abs(Math.floor(i%s)-Math.floor(t%s));a.push({stepIndex:i,result:r+o-e.character.attackRadius})})),a.sort(((e,t)=>e.result-t.result))}levelUp(e,t){const s=p(this.startLines,8),a=m(this.allowedTypes,e,t);for(const e of a)e.attack=Math.floor(e.attack*(1.8-(1-e.health/100))**(e.level-1)),e.defence=Math.floor(e.defence*(1.8-(1-e.health/100))**(e.level-1)),this.add(new l(e,s.next().value))}}const f=new e;f.bindToDOM(document.querySelector("#game-container"));const v=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage),C=new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.playerTeam=new u,this.enemyTeam=new y,this.selectedCharacter=0}init(){this.playerTeam.init(),this.enemyTeam.init();const e=void 0!==this.state?this.state.bestScore:0;this.state=new c(0,0,0,e,this.playerTeam.positioned,this.enemyTeam.positioned),this.gamePlay.drawUi(h[this.state.level%4]),this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned]),this.gamePlay.setBestScore(this.state.bestScore),this.addListeners()}addListeners(){this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this))}onCellClick(t){if(0===this.state.turn)if(this.selectedCharacter&&"team"!==this.checkCell(t).action)"not"===this.checkCell(t).action?e.showMessage("This move is not allowed!"):"step"===this.checkCell(t).action?(this.gamePlay.deselectCell(this.selectedCharacter.position),this.selectedCharacter.position=t,this.changeTurn(t)):"attack"===this.checkCell(t).action&&this.attack(this.selectedCharacter.position,t).then((()=>this.changeTurn(t)));else{const s=this.playerTeam.positioned.find((e=>e.position===t));void 0!==s?(this.selectedCharacter&&this.gamePlay.deselectCell(this.selectedCharacter.position),this.gamePlay.selectCell(t),this.selectedCharacter=s):e.showMessage("Select your warrior!")}}onCellEnter(e){const t=[...this.playerTeam.positioned,...this.enemyTeam.positioned].find((t=>t.position===e));if(void 0!==t&&this.gamePlay.showCellTooltip(`🎖${t.character.level} ⚔${t.character.attack} 🛡${t.character.defence} ❤${+t.character.health.toFixed(2)}`,e),this.selectedCharacter){const t=this.checkCell(e);t.color&&this.gamePlay.selectCell(e,t.color),this.gamePlay.setCursor(t.cursor)}}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor("auto"),this.selectedCharacter.position!==e&&this.gamePlay.deselectCell(e)}onNewGameClick(){this.playerTeam.positioned=[],this.enemyTeam.positioned=[],this.selectedCharacter=0,this.gamePlay.cellClickListeners=[],this.gamePlay.cellEnterListeners=[],this.gamePlay.cellLeaveListeners=[],this.gamePlay.newGameListeners=[],this.gamePlay.saveGameListeners=[],this.gamePlay.loadGameListeners=[],this.init()}onSaveGameClick(){this.state.playerTeam=this.playerTeam.positioned,this.state.enemyTeam=this.enemyTeam.positioned,this.stateService.save(this.state),e.showMessage("Game saved!")}onLoadGameClick(){try{this.state.from(this.stateService.load())}catch(t){e.showError(t.message)}this.playerTeam.positioned=this.state.playerTeam,this.enemyTeam.positioned=this.state.enemyTeam,this.gamePlay.drawUi(h[this.state.level%4]),this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned]),this.gamePlay.setScore(this.state.score),this.gamePlay.setBestScore(this.state.bestScore),this.gamePlay.setLevel(this.state.level)}checkCell(e){return this.selectedCharacter.position===e?{action:"self",cursor:"auto"}:this.playerTeam.positioned.find((t=>t.position===e))?{action:"team",cursor:"pointer"}:this.selectedCharacter.attackCells.includes(e)&&this.enemyTeam.positioned.find((t=>t.position===e))?{action:"attack",cursor:"crosshair",color:"red"}:this.selectedCharacter.stepCells.includes(e)&&!this.enemyTeam.positioned.find((t=>t.position===e))?{action:"step",cursor:"pointer",color:"green"}:{action:"not",cursor:"not-allowed"}}attack(e,t){return new Promise((s=>{const a=[...this.playerTeam.positioned,...this.enemyTeam.positioned].find((t=>t.position===e)),i=[...this.playerTeam.positioned,...this.enemyTeam.positioned].find((e=>e.position===t)),r=Math.max(a.character.attack-i.character.defence,.1*a.character.attack);this.gamePlay.showDamage(t,r).then((()=>{i.character.health-=r,i.character.health<=0&&(this.enemyTeam.positioned.includes(i)?this.enemyTeam.positioned.splice(this.enemyTeam.positioned.indexOf(i),1):this.playerTeam.positioned.splice(this.playerTeam.positioned.indexOf(i),1)),s()}))}))}changeTurn(t){if(this.gamePlay.deselectCell(this.selectedCharacter.position),this.gamePlay.deselectCell(t),this.selectedCharacter=0,this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned]),0===this.enemyTeam.positioned.length?this.levelUp():this.state.turn=1-this.state.turn,1===this.state.turn){const t=this.enemyTeam.turn(this.playerTeam.positioned);t?(this.gamePlay.selectCell(t.index),this.gamePlay.selectCell(t.attackIndex,"red"),this.attack(t.index,t.attackIndex).then((()=>{this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned]),this.gamePlay.deselectCell(t.index),this.gamePlay.deselectCell(t.attackIndex),0===this.playerTeam.positioned.length?e.showMessage("You died!"):this.state.turn=1-this.state.turn}))):(this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned]),this.state.turn=1-this.state.turn)}}levelUp(){this.state.level+=1,this.gamePlay.drawUi(h[this.state.level%4]),this.state.score+=this.playerTeam.positioned.reduce(((e,t)=>e+t.character.health),0),this.state.bestScore<this.state.score&&(this.state.bestScore=this.state.score),this.gamePlay.setScore(this.state.score),this.gamePlay.setBestScore(this.state.bestScore),this.gamePlay.setLevel(this.state.level),this.playerTeam.levelUp(this.state.level+1),this.enemyTeam.levelUp(this.state.level+1,this.playerTeam.positioned.length),this.gamePlay.redrawPositions([...this.playerTeam.positioned,...this.enemyTeam.positioned])}}(f,v);C.init()}();
//# sourceMappingURL=main.js.map