const form = document.getElementById('player-form');
const list = document.getElementById('player-list');

function loadPlayers() {
  const players = JSON.parse(localStorage.getItem('players')) || [];
  list.innerHTML = '';
  players.forEach((p, i) => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - ${p.position}`;
    list.appendChild(li);
  });
}
form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('player-name').value;
  const position = document.getElementById('player-position').value;
  const players = JSON.parse(localStorage.getItem('players')) || [];
  players.push({ name, position });
  localStorage.setItem('players', JSON.stringify(players));
  form.reset();
  loadPlayers();
};
window.onload = loadPlayers;