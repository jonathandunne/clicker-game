let score = 0;
let autoClickerSpeed = 0;
let clickBoosterPower = 0;
let prestigePoints = 0;



function updateScore() {
  document.getElementById('score').innerText = `Score: ${score}`;
}
function updateAutoClickerSpeed() {
  document.getElementById('autoClickerSpeed').innerText = `AutoClicker Speed: ${autoClickerSpeed}`;
}
function updateClickBoosterPower() {
  document.getElementById('clickBoosterPower').innerText = `Click Booster Power: ${clickBoosterPower}`;
}
function updatePrestigePoints() {
  document.getElementById('prestigePoints').innerText = `Prestige Points: ${prestigePoints}`;
}

function purchase(itemType) {
  // Sets costs and effects of all boosts
  const items = {
      autoClicker1: { cost: 50, effect: () => autoClickerSpeed += 1 },
      clickBooster1: { cost: 100, effect: () => clickBoosterPower += 1 },
      clickBooster2: { cost: 10000, effect: () => clickBoosterPower += 50 },
      autoClicker2: { cost: 5000, effect: () => autoClickerSpeed += 50 },
      autoClicker3: { cost: 500000, effect: () => autoClickerSpeed += 2000 },
      clickBooster3: { cost: 1000000, effect: () => clickBoosterPower += 2000 },
      autoClicker4: { cost: 50000000, effect: () => autoClickerSpeed += 50000 },
      clickBooster4: { cost: 100000000, effect: () => clickBoosterPower += 50000 },
      autoClicker5: { cost: 5000000000, effect: () => autoClickerSpeed += 1000000 },
      clickBooster5: { cost: 10000000000, effect: () => clickBoosterPower += 1000000 },
      autoClicker6: { cost: 500000000000, effect: () => autoClickerSpeed += 10000000 },
      clickBooster6: { cost: 1000000000000, effect: () => clickBoosterPower += 10000000 },
  };

  if (itemType in items) {
      const item = items[itemType];
      if (score >= item.cost) {
          score -= item.cost; // Deducts the cost
          item.effect(); // Applies the effect
          updateScore();
          updateAutoClickerSpeed();
          updateClickBoosterPower();
      }
  }
}

function prestige(itemType) {
  const items = {
    prestige1: { cost: 10000000, effect: () => prestigePoints += 1 },
    prestige2: { cost: 100000000, effect: () => prestigePoints += 5 },
    prestige3: { cost: 1000000000, effect: () => prestigePoints += 20 },
    prestige4: { cost: 10000000000, effect: () => prestigePoints += 50 },
    prestige5: { cost: 100000000000, effect: () => prestigePoints += 100 },
    prestige6: { cost: 1000000000000, effect: () => prestigePoints += 200 },
    prestige7: { cost: 10000000000000, effect: () => prestigePoints += 400 },
    prestige8: { cost: 100000000000000, effect: () => prestigePoints += 800 }
  }

  if (itemType in items) {
    const item = items[itemType];
    if (score >= item.cost) {
      score = 0;
      autoClickerSpeed = 0;
      clickBoosterPower = 0;
      item.effect();
      updateScore();
      updateAutoClickerSpeed();
      updateClickBoosterPower();
      updatePrestigePoints();
    }
  }
}

function performClick() {
  score += Math.floor(clickBoosterPower * (1 + (prestigePoints * 0.1))) + 1;
  updateScore();
}

document.getElementById('clicker').addEventListener('click', performClick);

document.querySelectorAll('.purchase').forEach(item => {
  item.addEventListener('click', () => {
    purchase(item.dataset.type);
  });
});

document.querySelectorAll('.prestige').forEach(item => {
  item.addEventListener('click', () => {
    prestige(item.dataset.type);
  });
});

setInterval(() => {
  score += Math.floor(autoClickerSpeed * (1 + (prestigePoints * 0.1)));
  updateScore();
}, 1000);

updateScore();