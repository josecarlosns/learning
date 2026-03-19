import cnClasses from '../utils/cnClasses';

export default function Input({
  label,
  textArea = false,
  className,
  ref,
  ...props
}) {
  const inputClasses = cnClasses(
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600',
  );

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        htmlFor={label}
        className="text-sm font-bold uppercase text-stone-500"
      >
        {label}
      </label>
      {textArea ? (
        <textarea
          ref={ref}
          id={label}
          className={inputClasses}
          {...props}
        ></textarea>
      ) : (
        <input
          ref={ref}
          id={label}
          type="text"
          className={inputClasses}
          {...props}
        />
      )}
    </p>
  );
}
