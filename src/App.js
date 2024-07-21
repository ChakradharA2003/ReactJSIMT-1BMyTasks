import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagsList from './components/TagsList/index'
import TasksList from './components/TasksList/index'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasks: [],
    input: '',
    activeTag: tagsList[0].displayText,
    selectedTag: '',
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onChangeTag = event => {
    this.setState({activeTag: event.target.value})
  }

  clearInputs = () => {
    this.setState({
      input: '',
      activeTag: tagsList[0].displayText,
    })
  }

  taskSubmitted = event => {
    event.preventDefault()
    const {input, activeTag} = this.state
    const toDoTask = {
      id: uuidv4(),
      taskName: input,
      taskTag: activeTag,
    }
    this.setState(
      prevState => ({
        tasks: [...prevState.tasks, toDoTask],
      }),
      this.clearInputs,
    )
  }

  onTagChanged = id => {
    const {selectedTag} = this.state
    if (selectedTag !== id) {
      this.setState({selectedTag: id})
    } else {
      this.setState({selectedTag: ''})
    }
  }

  render() {
    const {input, activeTag, tasks, selectedTag} = this.state
    console.log(tasks)
    const filteredTasks = tasks.filter(task =>
      task.taskTag.includes(selectedTag),
    )
    const renderTasksView =
      filteredTasks.length > 0 ? (
        <ul className="tasks-list">
          {filteredTasks.map(task => (
            <TasksList
              key={task.id}
              taskName={task.taskName}
              taskTag={task.taskTag}
            />
          ))}
        </ul>
      ) : (
        <div className="no-tasks-container">
          <p className="no-tasks-found">No Tasks Added Yet</p>
        </div>
      )
    return (
      <div className="main-container">
        <form onSubmit={this.taskSubmitted} className="form-container">
          <h1 className="form-heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task" className="label-style">
              Task
            </label>
            <input
              id="task"
              type="text"
              value={input}
              placeholder="Enter the task here"
              className="input-style"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag" className="label-style">
              Tags
            </label>
            <select
              id="tag"
              value={activeTag}
              className="input-style"
              onChange={this.onChangeTag}
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.taskSubmitted}
            className="add-task-btn"
          >
            Add Task
          </button>
        </form>
        <div className="tasks-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(tag => (
              <TagsList
                key={tag.optionId}
                isActive={selectedTag === tag.optionId}
                details={tag}
                onTagChanged={this.onTagChanged}
              />
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          {renderTasksView}
        </div>
      </div>
    )
  }
}
export default App
