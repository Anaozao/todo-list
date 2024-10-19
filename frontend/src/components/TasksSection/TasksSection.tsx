import { useEffect, useState } from "react";
import styles from './TasksSection.module.css'
import { ReduxState, TaskType } from "../../types";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";

function TasksSection() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const {allTasks} = useSelector((state: ReduxState) => state.tasks)
  
  useEffect(() => {
    setTasks(allTasks)
    
  }, [allTasks])

  return (
    <section className={styles.tasksSection}>
      {tasks && tasks.map((task) => (
        <TaskCard key={task.id} {...task}/>
      ))}
    </section>
  )
}

export default TasksSection