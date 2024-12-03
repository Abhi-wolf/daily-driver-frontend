const apiURL = import.meta.env.VITE_BASE_URL;

export async function getUserTodos(filterObj) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let url = `${apiURL}/todos?`;
  const queryParams = new URLSearchParams();

  if (filterObj?.filter) {
    queryParams.append("filter", filterObj.filter);
  }

  if (filterObj?.startDate) {
    queryParams.append("startDate", filterObj.startDate);
  }

  if (filterObj?.endDate) {
    queryParams.append("endDate", filterObj.endDate);
  }

  if (queryParams.toString()) {
    url += `${queryParams.toString()}`;
  }

  try {
    const res = await fetch(`${url}&timezone=${timezone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function createTodo({ newTodo }) {
  try {
    const res = await fetch(`${apiURL}/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
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

export async function deleteTodo({ todoId }) {
  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
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
    return todoId;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateTodo({ todoId, newTodo }) {
  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo), // here projectTasks is an array
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

export async function updateTodoStatus({ todoId, done }) {
  try {
    const res = await fetch(`${apiURL}/todos/statusupdate/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: done }), // here projectTasks is an array
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
