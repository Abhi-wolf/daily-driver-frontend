import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  // FUNCTION TO ADD NEW FILE OR FOLDER
  function insertNode(tree, folderId, item, isFolder) {
    // folderId -- to add file to folder to the parent
    // isFolder -- to check we are adding the file or folder to a folder
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          {
            id: uuidv4(),
            name: item,
            isFolder,
            items: [],
          },
          ...tree.items,
        ],
      };
    }

    // traverse all the children
    let latestNode = [];
    latestNode = tree?.items?.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  // FUNCTION TO RENAME FILE OR FOLDER
  function renameNode(tree, itemId, newName) {
    if (tree.id === itemId) {
      return { ...tree, name: newName };
    }

    let latestNode = [];
    latestNode = tree?.items?.map((obj) => {
      return renameNode(obj, itemId, newName);
    });

    return { ...tree, items: latestNode };
  }

  // FUNCTION TO DELETE A FILE OR FOLDER
  function deleteNode(tree, itemId) {
    if (tree.id == itemId) return null;

    const filteredItems = tree?.items
      .map((obj) => deleteNode(obj, itemId))
      .filter(Boolean);

    return { ...tree, items: filteredItems };
  }

  return { insertNode, renameNode, deleteNode };
};

export default useTraverseTree;
