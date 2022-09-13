export function* characterGenerator(allowedTypes, maxLevel) {
    // random types of char (0 - allowedTypes.length)
    const rand = Math.floor(Math.random() * allowedTypes.length);
    const genCharacter = Object.create(allowedTypes[rand]);
    // random char`s level (1 - maxLevel)
    genCharacter.level = Math.floor(1 + Math.random() * maxLevel);
    yield genCharacter;
  }
  
  export function generateTeam(allowedTypes, maxLevel, characterCount) {
    const team = [];
    for (let i = 0; i < characterCount; i += 1) {
      team.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
    return team;
  }
  
  export function* positionGenerator(lines, boardSize) {
    // generate random positions
    if (Math.max(lines) > boardSize - 1) {
      throw new Error('Line`s number greater than board size!');
    }
  
    const allBoard = [...Array(boardSize ** 2).keys()];

    const positionsArray = allBoard.filter((position) => lines.includes(position % boardSize));
  
    for (let i = positionsArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [positionsArray[i], positionsArray[j]] = [positionsArray[j], positionsArray[i]];
    }
  
    for (const position of positionsArray) {
      yield position;
    }
  }