import axios from "axios";

export async function fetchTasks() {
    const { data } = await axios.get("http://localhost:5000/task", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return data;
}

export async function createTask(task: {title: string, dueDate: string | Date}) {
    const { data } = await axios.post("http://localhost:5000/task", task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return data;
}

export async function updateTask(task: {id: string, title: string, dueDate: string | Date, isCompleted: boolean}) {
    const { data } = await axios.put(`http://localhost:5000/task/${task.id}`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return data;
}

export async function toggleCompleteTask(taskId: string) {
    const { data } = await axios.put(`http://localhost:5000/task/${taskId}/toggleComplete`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return data;
}