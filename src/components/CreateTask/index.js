import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

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

const OptionElement = props => {
  const {details} = props
  const {optionId, displayText} = details
  return <option value={optionId}>{displayText}</option>
}

const ButtonElement = props => {
  const {details, onClickFilter, isClicked} = props
  const {optionId, displayText} = details
  const Clicked = isClicked ? 'click' : 'unclick'
  const onClickButton = () => {
    onClickFilter(displayText, optionId, isClicked)
  }
  return (
    <li>
      {' '}
      <button className={Clicked} onClick={onClickButton}>
        <p> {displayText}</p>
      </button>{' '}
    </li>
  )
}

class CreateTask extends Component {
  state = {
    inputText: '',
    optionText: tagsList[0].displayText,
    taskList: [],
    optionId: '',
    displayList: [],
  }

  createTask = event => {
    this.setState({inputText: event.target.value})
  }

  onSelect = event => {
    this.setState({optionText: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    this.setState(prevState => ({
      optionText: tagsList[0].displayText,
      inputText: '',
      taskList: [
        ...prevState.taskList,
        {
          id: uuidv4(),
          inputText: prevState.inputText,
          optionText: prevState.optionText,
        },
      ],
      displayList: [
        ...prevState.taskList,
        {
          id: uuidv4(),
          inputText: prevState.inputText,
          optionText: prevState.optionText,
        },
      ],
    }))
  }

  onClickFilter = (optionText, optionId, isClicked) => {
    this.setState(prevState => {
      if (isClicked) {
        this.setState({optionId: '', taskList: [...prevState.displayList]})
      }

      return {
        optionId,
        taskList: prevState.taskList.filter(
          eachItem => eachItem.optionText === optionText,
        ),
      }
    })
  }

  render() {
    const {inputText, optionText, taskList, optionId} = this.state
    console.log(taskList)

    return (
      <div>
        <form onSubmit={this.addTask}>
          <h1>Create a task</h1>
          <label htmlFor="t">Task</label>
          <input
            type="text"
            onChange={this.createTask}
            placeholder="Enter the task here"
            value={inputText}
            id="t"
          />
          <label htmlFor="p">Tags</label>
          <select value={optionText} onChange={this.onSelect} id="p">
            {tagsList.map(eachItem => (
              <OptionElement details={eachItem} key={eachItem.optionId} />
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(eachItem => (
              <ButtonElement
                details={eachItem}
                key={eachItem.optionId}
                isClicked={eachItem.optionId === optionId}
                onClickFilter={this.onClickFilter}
              />
            ))}
          </ul>
        </>
        <h1>Tasks</h1>
        <ul>
          {taskList.length === 0 ? (
            <p>No Tasks Added Yet"</p>
          ) : (
            taskList.map(eachItem => (
              <p>
                <li key={eachItem.id}>
                  {' '}
                  <p>
                    {' '}
                    {eachItem.inputText} {eachItem.optionText}
                  </p>
                </li>
              </p>
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default CreateTask
