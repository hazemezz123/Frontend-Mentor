const grid = document.getElementById('extensions-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

let extensions = [];
let currentFilter = 'all';

async function loadData() {
  const res = await fetch('./data.json');
  extensions = await res.json();
  render();
}

function render() {
  const filtered = extensions.filter(ext => {
    if (currentFilter === 'active') return ext.isActive;
    if (currentFilter === 'inactive') return !ext.isActive;
    return true;
  });

  grid.innerHTML = filtered.map((ext, i) => {
    const realIndex = extensions.indexOf(ext);
    return `
      <div class="card" data-index="${realIndex}">
        <div class="card-top">
          <img src="${ext.logo}" alt="${ext.name} logo" class="card-logo">
          <div class="card-info">
            <p class="card-name">${ext.name}</p>
            <p class="card-desc">${ext.description}</p>
          </div>
        </div>
        <div class="card-bottom">
          <button class="remove-btn" data-index="${realIndex}">Remove</button>
          <label class="toggle" aria-label="Toggle ${ext.name}">
            <input type="checkbox" ${ext.isActive ? 'checked' : ''} data-index="${realIndex}">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>`;
  }).join('');
}

grid.addEventListener('click', e => {
  const removeBtn = e.target.closest('.remove-btn');
  if (removeBtn) {
    const idx = +removeBtn.dataset.index;
    extensions.splice(idx, 1);
    render();
  }
});

grid.addEventListener('change', e => {
  if (e.target.type === 'checkbox') {
    const idx = +e.target.dataset.index;
    extensions[idx].isActive = e.target.checked;
    if (currentFilter !== 'all') render();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

themeToggle.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
});

loadData();
