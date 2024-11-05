const apiURL = import.meta.env.VITE_BASE_URL;

export async function getUserFileExplorer() {
  try {
    const res = await fetch(`${apiURL}/user/getUserFileExplorer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies and credentials with the request
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

export async function updateFileExplorer({ finalTree }) {
  try {
    const res = await fetch(`${apiURL}/user/updateFolder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ finalTree }),
      credentials: "include", // Sends cookies and credentials with the request
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
