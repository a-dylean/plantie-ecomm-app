export interface ProductModel {
    "id": number, 
    "name": string,
    "description": string,
    "price": string,
    "available": boolean,
    "categoryId": number,
    "createdAt": string,
    "updatedAt": string,
    "picture": string
}

export interface UserModel {
    "id": number, 
    "name": string,
    "surname": string,
    "email": string,
    "password": string,
    "phone": string,
    "address": string,
    "createdAt": string,
    "updatedAt": string
}
