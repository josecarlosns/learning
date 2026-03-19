import { useRef, useState } from 'react';
import { v4 } from 'uuid';

import Button from './Button';
import Modal from './Modal';
import { isEmptyString } from '../utils/jsUtils';

export default function NewTask({ onSaveTask, ...props }) {
  const modalRef = useRef();
  const [description, setTaskDescription] = useState('');

  function handleChange(event) {
    setTaskDescription(event.target.value);
  }

  function handleAddTask() {
    if (isEmptyString(description)) {
      modalRef.current.open();
      return;
    }

    onSaveTask({ id: v4(), description });

    setTaskDescription('');
  }

  return (
    <div className="flex justify-between gap-4 mb-4">
      <input
        type="text"
        className="w-2/3 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={description}
      />
      <Button className={'w-1/5'} onClick={handleAddTask}>
        Add Task
      </Button>
      <Modal ref={modalRef}>
        <h2>Empty task description!</h2>
      </Modal>
    </div>
  );
}
