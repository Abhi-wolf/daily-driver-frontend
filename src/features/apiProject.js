const apiURL = import.meta.env.VITE_BASE_URL;

export async function getProjects() {
  try {
    const res = await fetch(`${apiURL}/project/getProjects`, {
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

export async function addNewProject({ newProject }) {
  try {
    const res = await fetch(`${apiURL}/project/addProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
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

export async function getProject({ projectId }) {
  if (!projectId) return null;

  try {
    const res = await fetch(`${apiURL}/project/${projectId}`, {
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

export async function deleteProject({ projectId }) {
  try {
    const res = await fetch(`${apiURL}/project/${projectId}`, {
      method: "DELETE",
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
    return projectId;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateProjectTasks({ projectId, projectTasks }) {
  try {
    const res = await fetch(`${apiURL}/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectTasks }), // here projectTasks is an array
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
