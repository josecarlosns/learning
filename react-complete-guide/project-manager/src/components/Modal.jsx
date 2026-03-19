import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

export default function Modal({
  children,
  ref,
  buttonLabel = 'Close',
  ...props
}) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="flex justify-end mt-4">
        <Button>{buttonLabel}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root'),
  );
}
