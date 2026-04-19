export let shortcuts = [];

export async function getData() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/TMill3838/team-search-project/refs/heads/main/assets/data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    shortcuts = data.shortcuts;
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
