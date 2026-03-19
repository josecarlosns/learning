import { useRef } from 'react';
import Input from './Input';
import { v4 } from 'uuid';
import { isEmptyString } from '../utils/jsUtils';
import Modal from './Modal';

export default function NewProject({ onSave, onCancel, props }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const modalRef = useRef();

  function handleSave() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;

    if (
      isEmptyString(title) ||
      isEmptyString(description) ||
      isEmptyString(dueDate)
    ) {
      modalRef.current.open();
      return;
    }

    const newProjectData = {
      id: v4(),
      title,
      description,
      dueDate,
    };

    onSave({ newProjectData });
  }

  return (
    <>
      <Modal ref={modalRef}>
        <h2 className="text-xl font-bold text-stone-800 my-4 text-center">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4 text-center">
          Please check your inputs
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-2 my-4">
          <li>
            <button
              className="px-6 py-2 rounded-md text-stone-800 hover:text-stone-950 hover:bg-stone-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-600 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} label="Title" type="text" />
          <Input ref={descriptionRef} label="Description" textArea />
          <Input ref={dueDateRef} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
