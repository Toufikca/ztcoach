const players = JSON.parse(localStorage.getItem('players')) || [];
const container = document.getElementById('schedule-container');

function createSession(sessionId) {
  const session = document.createElement('div');
  session.className = 'session';
  session.innerHTML = `<h3>🕒 حصة تدريبية ${sessionId}</h3>`;

  players.forEach(player => {
    const row = document.createElement('div');
    row.innerHTML = `
      <strong>${player.name}</strong>
      <label>تقييم:</label>
      <select data-player="${player.name}" data-session="${sessionId}">
        <option>ضعيف</option>
        <option>متوسط</option>
        <option>جيد</option>
        <option>ممتاز</option>
      </select>
    `;
    session.appendChild(row);
  });
  container.appendChild(session);
}

function saveEvaluations() {
  const selects = document.querySelectorAll('select[data-player]');
  const data = {};
  selects.forEach(sel => {
    const player = sel.dataset.player;
    const session = sel.dataset.session;
    if (!data[session]) data[session] = {};
    data[session][player] = sel.value;
  });
  localStorage.setItem('playerEvaluations', JSON.stringify(data));
}

window.onload = function () {
  for (let i = 1; i <= 3; i++) createSession(i);
  document.querySelectorAll('select').forEach(sel => sel.addEventListener('change', saveEvaluations));
};