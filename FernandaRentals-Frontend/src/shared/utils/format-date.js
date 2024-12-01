export const formatDate = (isoDateString) => { // la hizo Anner
    const date = new Date(isoDateString);
    const options = {day: 'numeric', month: 'long', year: 'numeric'}; // este objeto DEBE ir en ingles.
    return date.toLocaleDateString('es-Es', options)
}