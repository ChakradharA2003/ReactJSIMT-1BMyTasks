import './index.css'

const TasksList = props => {
  const {taskName, taskTag} = props
  return (
    <li className="task-list">
      <p className="task-name">{taskName}</p>
      <p className="task-tag">{taskTag}</p>
    </li>
  )
}
export default TasksList
