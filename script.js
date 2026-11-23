const list = document.querySelector("#starred-list");
const status = document.querySelector("#status");

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = type ? `status ${type}` : "status";
}

async function renderStarredRepositories() {
  if (!list || !status) {
    return;
  }

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories)) {
      throw new Error("Invalid repository data");
    }

    if (repositories.length === 0) {
      setStatus("No starred repositories yet.");
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const repository of repositories) {
      if (
        !repository ||
        typeof repository.repo !== "string" ||
        typeof repository.description !== "string" ||
        typeof repository.url !== "string" ||
        typeof repository.starredAt !== "string"
      ) {
        throw new Error("Invalid repository entry");
      }

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
      fragment.append(item);
    }

    list.append(fragment);
    setStatus(
      `${repositories.length} starred ${
        repositories.length === 1 ? "repository" : "repositories"
      }.`
    );
  } catch (error) {
    setStatus("Repositories could not be loaded. Please try again.", "error");
  }
}

renderStarredRepositories();
