export interface Secciones {
    secciones: Seccione[];
}

export interface Seccione {
    id_seccion: number;
    seccion:    string;
    campos:     Campo[];
}

export interface Campo {
    id_campo:    number;
    etiqueta:    string;
    obligatorio: boolean;
    catalogo?:   Catalogo;
}

export interface Catalogo {
    id_catalogo: number;
    valores:     Valore[];
}

export interface Valore {
    id_valor:     string;
    descripcion:  string;
    indice_orden: number;
}

// export class Valores {
    //     id_valor: string;
    //     descripcion: string;
    //     indice_orden: number;
    
    //     constructor(id_valor: string, description: string, indice_orden: number) {
    //         this.id_valor = id_valor;
    //         this.descripcion = description;
    //         this.indice_orden = indice_orden;
    //     }
    // }
    
    // export class Catalogo {
    //     id_catalogo: number;
    //     valores: Valores[];
    
    //     constructor(id_catalogo: number, valores: Valores[]) {
    //         this.id_catalogo = id_catalogo;
    //         this.valores = valores;
    //     }
    // }
    
    // export class Campos {
    //     id_campo: number;
    //     etiqueta: string;
    //     obligatorio: boolean;
    //     catalogo: Catalogo;
    
    //     constructor(id_campo: number, etiqueta: string, obligatorio: boolean, catalogo: Catalogo) {
    //         this.id_campo = id_campo;
    //         this.etiqueta = etiqueta;
    //         this.obligatorio = obligatorio;
    //         this.catalogo = catalogo;
    //     }
    // }
    
    // export class Secciones {
    //     id_seccion: number;
    //     seccion: string;
    //     campos: Campos[];
    
    //     constructor(id_seccion: number, seccion: string, campos: Campos[]) {
    //         this.id_seccion = id_seccion;
    //         this.seccion = seccion;
    //         this.campos = campos;
    //     }
    // }