import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProject from './components/NoProject';
import ProjectsSidebar from './components/ProjectsSidebar';
import Project from './components/Project';
import { isEmptyString, isNotEmptyObject } from './utils/jsUtils';
import dummyProjects from './data/dummyProjects';

function App() {
  const [state, setState] = useState({
    selectedProjectId: null,
    selectionState: 'noproject',
    projects: dummyProjects,
  });

  function handleNewProject() {
    setState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
      selectionState: 'new',
    }));
  }

  function handleCancelNewProject() {
    setState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
      selectionState: 'noproject',
    }));
  }

  function handleSaveProject({ newProjectData }) {
    setState((prevState) => {
      const newProjects = [...prevState.projects, newProjectData];

      return {
        ...prevState,
        selectionState: 'selected',
        selectedProjectId: newProjectData.id,
        projects: newProjects,
      };
    });
  }

  function handleSelectProject({ id }) {
    setState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
      selectionState: 'selected',
    }));
  }

  function handleDeleteProject({ projectId }) {
    const newProjects = state.projects.filter(
      (project) => project.id !== projectId,
    );

    setState((prevState) => ({
      ...prevState,
      projects: newProjects,
      selectedProjectId: null,
      selectionState: 'noproject',
    }));
  }

  function onAddTask({ projectId, id, description }) {
    const newProjects = state.projects.map((project) => {
      if (project.id === projectId) {
        const newTasks = [{ id, description }, ...project.tasks];
        return { ...project, tasks: newTasks };
      } else return project;
    });

    setState((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  }

  function onDeleteTask({ projectId, id }) {
    const newProjects = state.projects.map((project) => {
      if (project.id === projectId) {
        const newTasks = project.tasks.filter((task) => task.id !== id);
        return { ...project, tasks: newTasks };
      } else return project;
    });

    setState((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  }

  let content;
  switch (state.selectionState) {
    case 'new':
      content = (
        <NewProject
          onCancel={handleCancelNewProject}
          onSave={handleSaveProject}
        />
      );
      break;
    case 'noproject':
      content = <NoProject onNewProject={handleNewProject} />;
      break;
    default:
      const selectedProject = state.projects.find(
        (project) => project.id === state.selectedProjectId,
      );

      if (selectedProject && !isEmptyString(selectedProject.id))
        content = (
          <Project
            projectData={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
          />
        );
      else content = <p>Invalid Project Content!</p>;

      break;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onAddProject={handleNewProject}
        onSelectProject={handleSelectProject}
        projects={state.projects}
        selectedProjectId={state.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
