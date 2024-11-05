export const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "projects",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "NextJs-Project",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              items: [],
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              items: [],
            },
          ],
        },
        { id: "6", name: "temp.txt", isFolder: false, items: [] },
      ],
    },

    {
      id: "7",
      name: "Desktop",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "PDFs",
          isFolder: true,
          items: [
            {
              id: "9",
              name: "notes.pdf",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: "10",
          name: "Personal",
          isFolder: true,
          items: [
            {
              id: "11",
              name: "abhi.txt",
              isFolder: false,
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
