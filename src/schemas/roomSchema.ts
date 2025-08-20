import type { FieldValue, Timestamp } from "firebase/firestore";

// aca crearemos la extructura de las bases de datos
export interface Room {
  id: string;
  participants: string[];
  createAt: Timestamp | FieldValue; // este fielvalue se usa por que cuando se hacen marcas de tiempo, automaticamente no retorna esta si no un fielvalue
  lastMessage: LastMessage | null;
}

export interface LastMessage {
  text: string;
  senderId: string;
  timeStamp: Timestamp | FieldValue;
}

export interface Messages {
  id: string;
  text: string;
  senderId: string;
  timeStamp: Timestamp | FieldValue;
}
