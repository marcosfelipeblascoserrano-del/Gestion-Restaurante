export class Plato {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public disponible: boolean,
        public imagenUrl: string,
        public categoria: string,
        public alergenos: string[]
    ) { }
}