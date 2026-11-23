const list = document.querySelector("#starred-list");

async function renderStarredRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const repositories = await response.json();

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "starred-item";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.repo;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("time");
      date.dateTime = repository.starredAt;
      date.textContent = `Starred ${repository.starredAt}`;

      item.append(link, description, date);
      list.append(item);
    }
  } catch (error) {
    const message = document.createElement("li");
    message.className = "error";
    message.textContent = error.message;
    list.append(message);
  }
}

renderStarredRepositories();
