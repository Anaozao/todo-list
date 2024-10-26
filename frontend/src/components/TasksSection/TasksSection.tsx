import { useEffect, useState } from "react";
import styles from './TasksSection.module.css'
import { ReduxState, TaskType } from "../../types";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import ReactLoading from "react-loading";

function TasksSection() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const {allTasks} = useSelector((state: ReduxState) => state.tasks)
  const {deletTask} = useSelector((state: ReduxState) => state.tasks)
  const {isLoading} = useSelector((state: ReduxState) => state.loading)

  
  useEffect(() => {
    const newTasks = [...allTasks].sort((a, b) => b.id - a.id);
    setTasks(newTasks)
    
  }, [allTasks, deletTask])

  return (
    <section className={styles.tasksSection}>
      {isLoading && <ReactLoading type="spinningBubbles" color='black'/>}
      {!isLoading && (tasks.length < 1 ? <h3>Nenhuma tarefa cadastrada</h3> : (
        tasks && tasks.map((task) => (
          <TaskCard key={task.id} {...task}/>
        ))
      ))}
    </section>
  )
}

export default TasksSection