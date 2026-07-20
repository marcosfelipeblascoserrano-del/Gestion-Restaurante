import { Ingrediente } from './ingrediente';
import { Alergeno } from './alergeno';

export class Plato {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public disponible: boolean,
        public imagenUrl: string,
        public categoria: any,
        public alergenos: Alergeno[],
        public ingredientes: Ingrediente[]
    ) { }
}