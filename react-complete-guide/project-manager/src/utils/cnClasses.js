import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cnClasses = (...classes) => twMerge(clsx(...classes));

export default cnClasses;
