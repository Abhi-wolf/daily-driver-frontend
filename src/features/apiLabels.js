const apiURL = import.meta.env.VITE_BASE_URL;

export async function getLabels() {
  try {
    const res = await fetch(`${apiURL}/label/`, {
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

export async function addNewLabel({ newLabel }) {
  try {
    const res = await fetch(`${apiURL}/label/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLabel),
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

export async function deleteLabel({ labelId }) {
  try {
    const res = await fetch(`${apiURL}/label/${labelId}`, {
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

    const data = await res.json();
    return null;
  } catch (error) {
    console.error(error);
    if (error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error);
  }
}
