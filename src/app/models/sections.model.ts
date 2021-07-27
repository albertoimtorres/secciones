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