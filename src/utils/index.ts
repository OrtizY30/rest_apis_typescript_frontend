export function formatCurrency(amount: number) {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(amount)
}

export function toBoolen(str : string){
    return str.toLowerCase() === 'true'
}