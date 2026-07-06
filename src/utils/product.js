// Un producto no se puede añadir a la cesta si la API no trae precio.
export const isAvailable = (product) => Boolean(product?.price)
