const apiUrl = import.meta.env.VITE_API;

export const LOGIN =`${apiUrl}/api/auth/login`;
export const REGISTER = `${apiUrl}/api/auth/register`;
export const USERS = `${apiUrl}/api/users`;
export const DETAIL_USER = `${apiUrl}/api/users`;
export const DELETE_USER = `${apiUrl}/api/users/delete`;
export const DETAIL_USER_PRODUIT = `${apiUrl}/api/users`;
export const PRODUITS = `${apiUrl}/api/produits`;
export const DETAIL_PRODUIT = `${apiUrl}/api/produits`
export const DELETE_PRODUIT = `${apiUrl}/api/produits/delete`