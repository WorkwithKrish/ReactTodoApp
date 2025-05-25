import { useCallback, useEffect, useState } from "react";
import "./TodoPage.css";
interface TodoItem {
  id: number;
  title: string;
  todoStatus: boolean;
}

const TodoPage: React.FC = () => {
  const [todoItem, setTodoItem] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    const dummyList: TodoItem[] = [
      { id: 1, title: "task1", todoStatus: false },
      { id: 2, title: "task2", todoStatus: false },
    ];
    setTodoList(dummyList);
  }, []);

  const startEditing = (todo: TodoItem) => {
    setTodoItem(todo.title);
    setSelectedTodoId(todo.id);
  };

  const resetForm = () => {
    setTodoItem("");
    setSelectedTodoId(null);
  };

  const deleteTodo = useCallback(
    (id: number) => {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
      if (selectedTodoId === id) {
        resetForm();
      }
    },
    [selectedTodoId]
  );

  const statusUpdate = useCallback((id: number) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, todoStatus: !todo.todoStatus } : todo
      )
    );
  }, []);

  const updateTodoList = (id: number | null = 0) => {
    if (!todoItem.trim()) return;

    if (!id) {
      //add new idem
      const newTodo: TodoItem = {
        id: todoList.length + 1,
        title: todoItem,
        todoStatus: false,
      };
      setTodoList((prevList) => [...prevList, newTodo]);
    } else {
      // existing

      setTodoList((prevList) =>
        prevList.map((todo: TodoItem) => {
          if (todo?.id === id) {
            return { ...todo, title: todoItem };
          }
          return todo;
        })
      );
    }

    resetForm();
  };

  return (
    <div className="todoPageContainer">
      <h1>Todo List</h1>
      <div className="todoInputWrapper">
        <input
          type="text"
          placeholder="Please add todo"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button
          onClick={() => updateTodoList(selectedTodoId)}
          disabled={!todoItem.trim()}
        >
          {selectedTodoId === null ? "Add" : "Update"}
        </button>
      </div>
      <hr />
      {
        <ul className="todo-list">
          {todoList.map((todo) => (
            <li key={todo.id} className="todoItem">
              <div className="checkBox">
                <input
                  type="checkbox"
                  checked={todo?.todoStatus}
                  name={`todo-${todo.id}`}
                  id={`todo-${todo.id}`}
                  className="todo-checkbox"
                  onChange={() => statusUpdate(todo.id)}
                />
                <label htmlFor={`todo-${todo.id}`}> {todo.title}</label>
              </div>
              <div className="todoActions">
                <button className="editIcon" onClick={() => startEditing(todo)}>
                  Edit
                </button>
                <button
                  className="deleteIcon"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>{" "}
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
export default TodoPage;
