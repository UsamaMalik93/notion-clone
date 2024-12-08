import { DocumentData } from "firebase-admin/firestore";

export type User={
    fullName: string;
    email?:string ;
    image:string;
    lastName:string;
    firstName:string    
}

export interface RoomDocument extends DocumentData{
    createdAt:string,
    role:"owner"|'editor',
    roomId:string,
    userId:string
}