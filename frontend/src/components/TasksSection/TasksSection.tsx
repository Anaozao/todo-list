import { useEffect, useState } from "react";
// import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import styles from './TasksSection.module.css'
import { ReduxState, TaskType } from "../../types";
// import TaskCard from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";

// type TasksSectionProps = {
//   token: string
// }

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