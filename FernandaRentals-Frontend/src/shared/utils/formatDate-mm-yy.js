export function formatDate_MM_YY(monthString) {
    const [month, year] = monthString.split('-');
    console.log(monthString); 
  
    const date = new Date(Number(year), Number(month) - 1, 1);
    console.log(date);
    
   
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options); 
  }