const apiURL = import.meta.env.VITE_BASE_URL;

export async function updateBudget({ data }) {
  try {
    const res = await fetch(`${apiURL}/budget/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const expense = await res.json();
    return expense?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
