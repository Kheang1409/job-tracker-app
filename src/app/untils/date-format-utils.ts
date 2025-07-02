export function dateToISODateString(date?: Date) : string{
    if(date === undefined)
        date = new Date();
    return new Date(date).toISOString().split('T')[0] || '';
}