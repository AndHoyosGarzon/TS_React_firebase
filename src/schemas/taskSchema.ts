//creando el esquema de la base de datos 
export interface Task{
    id: string;
    title: string;
    description?:string;
    completed:string;
    userId:string;
}

