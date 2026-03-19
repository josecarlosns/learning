import cnClasses from '../utils/cnClasses';

export default function Button({ children, onClick, className, ...props }) {
  return (
    <button
      className={cnClasses(
        'px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
