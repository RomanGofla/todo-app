import axios from 'axios'
import React, {useState} from 'react'

import addSvg from '../../assets/img/add.svg'

function AddTaskForm({ list, onAddTask }) {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setLoading] = useState(false)

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            // id: data.id,
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setLoading(true)
        axios.post('http://localhost:3002/tasks', obj).then(({ data }) => {

            onAddTask(list.id, data)
            toggleFormVisible()
        })
        .catch(() => {
            alert('Error while adding the task')
        })  
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? 
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>
                : 
                <div className="tasks__form-block">
                <input
                    value={inputValue}
                    className="field" 
                    type="text" 
                    placeholder="Текст задачи"
                    onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={isLoading} onClick={addTask} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
                <button onClick={toggleFormVisible} className="button button--grey">
                   Отмена
                </button>
            </div>
            } 
        </div>
    )
}

export default AddTaskForm
