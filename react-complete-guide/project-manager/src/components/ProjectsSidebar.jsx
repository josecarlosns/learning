import cnClasses from '../utils/cnClasses';
import Button from './Button';

export default function ProjectsSidebar({
  onAddProject,
  onSelectProject,
  selectedProjectId,
  projects,
  ...props
}) {
  return (
    <aside className="w-1/3 px-8 py-8 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl h-fit">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onAddProject}>Add Project</Button>
      </div>
      <ul className='mt-4'>
        {projects &&
          projects.map((project) => {
            const isSelectedProject = project.id === selectedProjectId;

            return (
              <li key={project.id}>
                <button
                  className={cnClasses(
                    'w-full text-left px-2 py-1 rounded-sm my-1 to-stone-100 hover:bg-stone-600',
                    isSelectedProject && 'bg-stone-600 to-stone-200',
                  )}
                  onClick={() => onSelectProject({ id: project.id })}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
