const apiURL = import.meta.env.VITE_BASE_URL;

export async function login({ data }) {
  let userDetail = {};

  try {
    const res = await fetch(`${apiURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    userDetail = await res.json(); // Parse the response JSON
    return userDetail?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function signUp({ data }) {
  let userDetail = {};

  try {
    const res = await fetch(`${apiURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "SignUp failed");
    }

    userDetail = await res.json(); // Parse the response JSON
    return userDetail?.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function forgotPassword({ data }) {
  try {
    const res = await fetch(`${apiURL}/user/forgotPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "SignUp failed");
    }

    await res.json(); // Parse the response JSON
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function resetPassword({ data, token }) {
  try {
    const res = await fetch(`${apiURL}/user/resetPassword/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "SignUp failed");
    }

    await res.json(); // Parse the response JSON
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function logout() {
  try {
    const res = await fetch(`${apiURL}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }

  return {};
}
