export interface ReservaRequest {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    slot: string;
    comensales: number;
}

export interface SlotDisponibilidad {
    slot: string;
    mesasLibres: number;
}
