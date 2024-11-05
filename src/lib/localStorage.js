export async function saveToLocalStorage(jsonBlocks, id) {
  localStorage.setItem(
    `daily-driver-file-id=${id}`,
    JSON.stringify(jsonBlocks)
  );
}

export async function getFromLocalStorage(id) {
  const storageString = localStorage.getItem(`daily-driver-file-id=${id}`);

  return storageString ? JSON.parse(storageString) : undefined;
}

export async function removeFromLocalStorage(id) {
  localStorage.removeItem(`daily-driver-file-id=${id}`);
}
