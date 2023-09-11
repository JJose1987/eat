/* JavaScript */
// Clases
class EAT {
    /* Constructor donde le pasamos los datos de entrada, para ello le pasamos el nombreparametro = VALUE */
    constructor(kwargs) {
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::***********************
        // Variables por defecto
        this.person = 3;

        this.ration = {
              'arroz'         : 0.100
            , 'macarrones'    : 0.100
            , 'espaguettis'   : 0.100
            , 'fideos'        : 0.100
            , 'garbanzos'     : 0.090
            , 'guisantes'     : 0.200
            , 'judías verdes' : 0.175
            , 'lentejas'      : 0.090
            , 'patata'        : 0.200
            , 'batata'        : 0.200
            , 'pollo'         : 0.225
            , 'gallina'       : 0.225
            , 'pavo'          : 0.150
            , 'ternera'       : 0.300
            , 'cerdo'         : 0.200
            , 'bacon'         : 0.100
            , 'jamon'         : 0.100
            , 'cordero'       : 0.200
            , 'merluza'       : 0.300
            , 'bacalao'       : 0.200
            , 'atún'          : 0.170
            , 'salmón'        : 0.150
            , 'caballa'       : 0.100
            , 'trucha'        : 0.150
            , 'dorada'        : 0.300
            , 'huevo'         : 2
            , 'alcachofas'    : 0.200
            , 'brócoli'       : 0.200
            , 'calabacín'     : 0.200
            , 'calabaza'      : 0.140
            , 'espinacas'     : 0.300
            , 'pimiento rojo' : 0.500
            , 'pimiento verde': 0.500
            , 'tomates'       : 0.200
            , 'zanaharina'    : 3
            , 'tortas de maíz': 2
        };

        this.CheckLack = {
              'pastas'          : [0, 2, ['arroz', 'macarrones', 'espaguettis', 'fideos']]
            , 'legumbres'       : [0, 3, ['garbanzos', 'guisantes', 'judías verdes', 'lentejas']]
            , 'tubérculos'      : [0, 2, ['patata', 'batata']]
            , 'carnes blancas'  : [0, 3, ['pollo', 'pavo', 'gallina']]
            , 'carnes rojas'    : [0, 1, ['ternera', 'cerdo', 'bacon', 'jamon', 'cordero', 'solomillo', 'lomo', 'pato']]
            , 'pescados blancos': [0, 4, ['lenguado', 'merluza', 'pescadilla', 'rape', 'bacalao', 'gallo', 'rodaballo', 'lubina']]
            , 'pescados azules' : [0, 4, ['atún', 'pez espada', 'salmón', 'boquerón', 'besugo', 'salmonete', 'caballa', 'trucha', 'cazón', 'sardina', 'gallineta', 'mero', 'dorada']]
            , 'huevos'          : [0, 7, ['huevo']]
        };

        this.days = ['mon_l' , 'mon_d' , 'tue_l' , 'tue_d' , 'wed_l' , 'wed_d' , 'thu_l' , 'thu_d' , 'fri_l' , 'fri_d' , 'sat_l' , 'sat_d' , 'sun_l' , 'sun_d'];
        this.ddays = ['Lunes;Comer;' , 'Lunes;Cenar;'
                    , 'Marte;Comer;' , 'Marte;Cenar;'
                    , 'Mierc;Comer;' , 'Mierc;Cenar;'
                    , 'Jueve;Comer;' , 'Jueve;Cenar;'
                    , 'Viern;Comer;' , 'Viern;Cenar;'
                    , 'Sabad;Comer;' , 'Sabad;Cenar;'
                    , 'Domin;Comer;' , 'Domin;Cenar;'];

        this.kwargs = {};
        this.kwargs['GlobalMenu'] = {'': ''};

        // Informar valores
        if (typeof GlobalMenu != 'undefined') {
            try {
                this.kwargs['GlobalMenu'] = GlobalMenu;
            } catch (e) {
                if (e instanceof TypeError) {
                    this.kwargs['GlobalMenu'] = {'': ''};
                }
            }
        }
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::***********************
    }

    /* Metodo para cargar los primeros días */
    sets() {
        var i1      = 0;
        var i4      = 0;
        var newKeys = [];
        var insert  = true;
        var auxKeys = Object.keys(this.kwargs['GlobalMenu']);

        do {
            if (i1 > 0) {
                auxKeys = newKeys;
            }

            var i0   = auxKeys.length;
            this.kwargs[this.days[i1]] = '';

            if (i0 > 0) {
                this.kwargs[this.days[i1]] = auxKeys[Math.floor(Math.random() * i0)];

                var aux0 = this.list();

                // Eliminamos del tabla aquellos que tengan excesos
                newKeys = [];
                i4      = 0;

                for (var i2 = 0; i2 < i0; i2++) {
                    var aux1 = (this.kwargs['GlobalMenu'][auxKeys[i2]]).split(', ');

                    if (auxKeys[i2].indexOf(this.kwargs[this.days[i1]]) == -1) {
                        insert   = true;

                        for (var i3 = 0; i3 < aux1.length; i3++) {
                            if (insert) {
                                insert = this.insert(aux1[i3]);
                            }
                        }

                        if (insert) {
                            newKeys[i4++] = auxKeys[i2];
                        }
                    }
                }
            } else {
                // Revisar de que hay poco y dejar el menu con lo que hay poco y volver a gener las opciones para elegir
                var auxKeys = Object.keys(this.kwargs['GlobalMenu']);

                this.kwargs[this.days[i1]] = auxKeys[Math.floor(Math.random() * auxKeys.length)];
            }
        } while (++i1 < this.days.length);
    }

    /* Metodo para cargar un dia en particular */
    set(day, value) {
        this.kwargs[day] = value;
    }

    /* Metodo para validar si hay esceso algun grupo */
    insert(value) {
        var auxKeys = Object.keys(this.CheckLack);

        for (var i2 = 0; i2 < auxKeys.length; i2++) {
            var aux1 = this.CheckLack[auxKeys[i2]][2];

            for (var i3 = 0; i3 < aux1.length; i3++) {

                if (value.indexOf(aux1[i3]) > -1) {
                    if (this.CheckLack[auxKeys[i2]][0] >= this.CheckLack[auxKeys[i2]][1]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /* Metodo para lista de la compra */
    list() {
        var out = {};
        var ant = '';
        var i1  = -1;
        // Obtiene una lista de los ingredientes a comprar
        var aux0 = '';

        for (var i0 = 0; i0 < this.days.length; i0++) {
            if ((this.kwargs['GlobalMenu'][this.kwargs[days[i0]]] != '')
                    || (typeof this.kwargs['GlobalMenu'][this.kwargs[days[i0]]] != 'undefined')){
                aux0 += this.kwargs['GlobalMenu'][this.kwargs[days[i0]]] + ', ';
            }
        }

        // Agrupa los ingredientes
        var aux0 = (aux0.split(', ')).sort();
        var ant  = aux0[1];

        for (var i0 = 1; i0 < aux0.length; i0++) {
            i1++;

            if (ant.indexOf(aux0[i0]) ==  -1) {
                if (ant.indexOf('undefined') ==  -1) {
                    out[ant] = i1;
                }

                ant = aux0[i0];
                i1  = 0;
            }
        }
        out[ant] = ++i1;

        // Actualizar los excesos  o carencias
        var auxKeys = Object.keys(this.CheckLack);
        for (var i2 = 0; i2 < auxKeys.length; i2++) {
            this.CheckLack[auxKeys[i2]][0] = 0;

            var aux1 = this.CheckLack[auxKeys[i2]][2];
            for (var i3 = 0; i3 < aux1.length; i3++) {
                if (typeof out[aux1[i3]] != 'undefined') {
                    this.CheckLack[auxKeys[i2]][0] += out[aux1[i3]];
                }
            }
        }

        return out;
    }
    
    /* Metodo para devolver los excesos  o carencias */
    get lack() {
        var out = '::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';
        
        var little = '';
        var lotof  = '';
        
        var aux0 = this.list();        
        var auxKeys = Object.keys(this.CheckLack);

        for (var i0 = 0; i0 < auxKeys.length; i0++) {
            var aux1 = this.CheckLack[auxKeys[i0]][2];
            
            if (this.CheckLack[auxKeys[i0]][0] > this.CheckLack[auxKeys[i0]][1]) {
                lotof  += auxKeys[i0] + ', ';
            } else if (this.CheckLack[auxKeys[i0]][0] < this.CheckLack[auxKeys[i0]][1]) {
                little += auxKeys[i0] + ', ';
            }
        }

        out += '\n* -> Much@s ' + lotof.substr(0, lotof.length - 2) + '.'
            +  '\n* -> Poc@s  ' + little.substr(0, little.length - 2) + '.'
            +  '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';

        return out;
    }

    /* Metodo para retornar la clase en cadena de caracteres */
    get str() {
        var out = '::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';

        for (var i0 = 0; i0 < this.days.length; i0++) {
            out += '\n' + this.ddays[i0] + this.kwargs[days[i0]];
        }

        out += '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';
        var aux0 = this.list();
        var auxKeys = Object.keys(aux0);

        for (var i0 = 0; i0 < auxKeys.length; i0++) {
            var aux1 = aux0[auxKeys[i0]] * this.person
            if (typeof this.ration[auxKeys[i0]] != 'undefined') {
                aux1 *= this.ration[auxKeys[i0]];
            } 

            out += '\n: -> ' +  ('      ' + aux1.toFixed(3)).slice(-7) + ' ud. de ' + auxKeys[i0];
        }

        out += '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';
        var auxKeys = Object.keys(this.CheckLack);
        
        var little = '';
        var lotof  = '';

        for (var i0 = 0; i0 < auxKeys.length; i0++) {
            var aux1 = this.CheckLack[auxKeys[i0]][2];
            
            if (this.CheckLack[auxKeys[i0]][0] > this.CheckLack[auxKeys[i0]][1]) {
                lotof  += auxKeys[i0] + ', ';
            } else if (this.CheckLack[auxKeys[i0]][0] < this.CheckLack[auxKeys[i0]][1]) {
                little += auxKeys[i0] + ', ';
            }
        }

        out += '\n: -> Much@s ' + lotof.substr(0, lotof.length - 2)   + '.'
            +  '\n: -> Poc@s  ' + little.substr(0, little.length - 2) + '.'
            +  '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';


        return out;
    }
    /* Metodo para retornar el campo que le pidamos */
    get(ix) {
        if (this.kwargs[ix] != 'undefined') {
            return this.kwargs[ix];
        } else {
            return 'undefined';
        }
    }
}