import { shortcuts, getData } from "./data.js";

await getData();

function renderResults(items) {
  const list = document.querySelector("#shortcutList");

  list.innerHTML = items.map(item => `
    <div class="shortcut-card">
      <h2>${item.shortcut}</h2>
      <p>${item.description}</p>
      <p>${item.author}</p>
    </div>
  `).join("");
}

document.querySelector("#sortSelect").addEventListener("change", (e) => {
  const by = e.target.value;

  const sorted = [...shortcuts].sort((a, b) => {
    if (by === "author") return a.author.localeCompare(b.author);
    if (by === "shortcut") return a.shortcut.localeCompare(b.shortcut);
  });

  renderResults(sorted);
});
