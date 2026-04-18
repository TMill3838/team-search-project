const DATA_PATH = 'scripts/data.js';
let shortcuts = [];

//loading the data
async function init() {
    try {
        const response = await fetch(DATA_PATH);
        shortcuts = await response.json();
        
        // Sort by shortcut keys (A-Z) initially
        renderData(sortShortcuts(shortcuts));
    } catch (err) {
        console.error("Failed to load shortcuts:", err);
    }
}

// sorting
function sortShortcuts(data) {
    return data.sort((a, b) => a.shortcut.localeCompare(b.shortcut));
}

// rendering
function renderData(data) {
    const list = document.getElementById('shortcutList');
    list.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'retro-card';
        card.innerHTML = `
            <kbd>${item.shortcut}</kbd>
            <h3>${item.description}</h3>
            <div class="meta">
                <span class="tool">${item.tool}</span>
                <span class="author">By: ${item.author}</span>
            </div>
        `;
        list.appendChild(card);
    });
}

// filtering
function handleFilter() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const toolVal = document.getElementById('toolFilter').value;

    const filtered = shortcuts.filter(item => {
        const matchesSearch = item.description.toLowerCase().includes(searchVal);
        const matchesTool = toolVal === 'all' || item.tool === toolVal;
        return matchesSearch && matchesTool;
    });

    renderData(sortShortcuts(filtered));
}


document.getElementById('searchInput').addEventListener('input', handleFilter);
document.getElementById('toolFilter').addEventListener('change', handleFilter);

init();
