export function formatDate_MM_YY(monthString) {
    const [month, year] = monthString.split('-');
    const date = new Date(`${year}-${month}-01`);
    
   
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options); 
  }