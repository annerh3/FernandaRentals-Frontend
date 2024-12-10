export const formatDate = (isoDateString) => { // la hizo Anner
    const date = new Date(isoDateString);
    const options = {day: 'numeric', month: 'long', year: 'numeric'}; // este objeto DEBE ir en ingles.
    return date.toLocaleDateString('es-Es', options)
}




export const formatDateTime = (isoDateString) => {

    const date = new Date(isoDateString); // pasar UTC

    date.setHours(date.getHours()); // restar 6 horas

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Tegucigalpa'
    };

    const formatter = new Intl.DateTimeFormat('es-ES', options); 
    return formatter.format(date);
};