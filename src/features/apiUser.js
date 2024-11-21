const apiURL = import.meta.env.VITE_BASE_URL;

export async function getUserProfile() {
  try {
    const res = await fetch(`${apiURL}/user/`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json(); // Parse the response JSON
    return data?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateProfile({ data }) {
  console.log(data);

  try {
    const res = await fetch(`${apiURL}/user/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData.message || "Profile update failed");
    }
    const temp = await res.json();
    console.log(temp);
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
