const apiURL = import.meta.env.VITE_BASE_URL;

export async function getUserBookmarks({ page, limit }) {
  try {
    const res = await fetch(
      `${apiURL}/bookmarks/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    return data?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function addBookmark({ newBookmark }) {
  try {
    const res = await fetch(`${apiURL}/bookmarks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("errorData = ", errorData);
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.error(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}

export async function deleteBookmark({ bookmarkId }) {
  try {
    const res = await fetch(`${apiURL}/bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    // const data = await res.json();
    return bookmarkId;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateBookmark({ bookmarkId, newBookmark }) {
  try {
    const res = await fetch(`${apiURL}/bookmarks/${bookmarkId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
      credentials: "include",
    });
    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await res.json();
    return data?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
