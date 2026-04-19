import { shortcuts, getData } from "./data.js";

await getData();

function renderResults(items) {
  const list = document.querySelector("#shortcutList");

  if (items.length === 0) {
    list.innerHTML = "<p>No results found.</p>";
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="shortcut-card">
      <h2>${item.shortcut}</h2>
      <p>${item.description}</p>
      <p>${item.author}</p>
    </div>
  `).join("");
}

document.querySelector("#searchInput").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();

  const results = shortcuts.filter(item =>
    item.author.toLowerCase().includes(q) ||
    item.shortcut.toLowerCase().includes(q)
  );

  renderResults(results);
});
