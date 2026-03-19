import Button from './Button';
import NewTask from './NewTask';

export default function Tasks({ onAddTask, onDeleteTask, tasks, ...props }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onSaveTask={onAddTask} />
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map(({ id, description }) => (
            <li key={id} className="text-stone-800 mb-4 flex justify-between">
              <span className="flex items-center">{description}</span>
              <Button
                className={'w-1/5 text-nowrap'}
                onClick={() => onDeleteTask({ id })}
              >
                Delete Task
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stone-800 mb-4">No tasks added</p>
      )}
    </section>
  );
}
