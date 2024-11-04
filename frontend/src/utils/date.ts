import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

// Calculate hire date and format it
export const formatHireDate = (hireDate: string) => {
    const date = new Date(hireDate);
    const formattedDate = format(date, 'MMM d, yyyy');
    const years = differenceInYears(new Date(), date);
    const months = differenceInMonths(new Date(), date) % 12;
    const days = differenceInDays(new Date(), date) % 30;
    return `${formattedDate} (${years}y – ${months}m – ${days}d)`;
};
