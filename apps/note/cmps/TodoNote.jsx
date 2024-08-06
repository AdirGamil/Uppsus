const { useState } = React

export function TodoNote({ handleInputChange, title }) {
  const userTodos = title.split(',')
  const [todoStates, setTodoStates] = useState(userTodos.map(() => false))

  const toggleTodo = (index) => {
    const newTodoStates = [...todoStates]
    newTodoStates[index] = !newTodoStates[index]
    setTodoStates(newTodoStates)
  }

  return (
    <div className="todo-note">
      <ul>
        {userTodos.map((todo, index) => (
          <li className="todo-li" key={index}>
            <i
              onClick={() => toggleTodo(index)}
              className={`todo-checkbox far ${
                todoStates[index] ? 'fa-check-square' : 'fa-square'
              }`}
              aria-hidden="true"
            ></i>{' '}
            {todo}
          </li>
        ))}
      </ul>
    </div>
  )
}
