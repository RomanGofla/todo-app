import axios from 'axios'
import React from 'react'
import editSvg from '../../assets/img/edit.svg'


import './Tasks.scss'
import AddTaskForm from './AddTaskForm'
import TaskComponent from './TaskComponent'
import { Link } from 'react-router-dom'

function Tasks({list, onEditTitle, onCompleteTask, onAddTask, onRemoveTask, onEditTask, withoutEmpty}) {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios
            .patch('http://localhost:3002/lists/' + list.id, {
                name: newTitle
            })
            .catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className='tasks__title'>
                    {list.name}
                
                    <img onClick={editTitle} src={editSvg} alt="Edit icon" />
                </h2>
            </Link>
            

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks &&
                    list.tasks.map(task => (
                        <TaskComponent 
                            key={task.id}
                            list={list}
                            onEdit={onEditTask}
                            onRemove={onRemoveTask}
                            onComplete= {onCompleteTask}
                            id = {task.id}
                            text = {task}
                            {...task}
                            />
                        ))
                }
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    )
}

export default Tasks
