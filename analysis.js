window.onload = function () {
  const data = JSON.parse(localStorage.getItem('playerEvaluations')) || {};
  const container = document.getElementById('analysis-container');
  Object.keys(data).forEach(session => {
    const section = document.createElement('div');
    section.className = 'session-report';
    section.innerHTML = `<h3>📌 تحليل الحصة ${session}</h3>`;
    const evals = data[session];
    Object.keys(evals).forEach(player => {
      section.innerHTML += `<p>${player}: ${evals[player]}</p>`;
    });
    container.appendChild(section);
  });
};