import Button from './Button';
import Tasks from './Tasks';

export default function Project({
  projectData,
  onDelete,
  onAddTask,
  onDeleteTask,
}) {
  const { id, title, description, dueDate, tasks } = projectData;

  function handleOnAddTask(taskData) {
    onAddTask({
      projectId: id,
      id: taskData.id,
      description: taskData.description,
    });
  }

  function handleOnDeleteTask(taskData) {
    onDeleteTask({
      projectId: id,
      id: taskData.id,
    });
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{title}</h1>
          <Button onClick={() => onDelete({ projectId: id })}>Delete</Button>
        </div>
        <p className="mb-4 text-stone-400">
          {new Date(dueDate).toLocaleDateString('pt-BR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>
        <p className="text-stone-600 whitespace-pre-wrap">{description}</p>
      </header>
      <Tasks
        tasks={tasks}
        onAddTask={handleOnAddTask}
        onDeleteTask={handleOnDeleteTask}
      />
    </div>
  );
}
