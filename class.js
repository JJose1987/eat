/* JavaScript */
// Clases
class EAT {
    /* Constructor donde le pasamos los datos de entrada, para ello le pasamos el nombreparametro = VALUE */
    constructor(kwargs) {
        //*********************************************************************************
        // Variables por defecto
        this.person = 1;

        this.ration = {
        };

        this.CheckLack = {
              'arroces'         : [0,  2, ['arroz']]
            , 'pastas'          : [0,  2, ['espirales', 'lazos', 'macarrones', 'rigatoni', 'caracolas', 'nidos', 'spaghetti', 'tagliatelle', 'fettuccine', 'fideos', 'estrellas', 'sopa de letras', 'pasta de colores', 'fideos de arroz', 'pasta al huevo', 'lasagna', 'raviolis', 'tortellini']]
            , 'legumbres'       : [0,  2, ['garbanzos', 'guisantes', 'judías verdes', 'lentejas', 'habichuelas']]
            , 'tubérculos'      : [0,  7, ['patata', 'batata']]
            , 'carnes blancas'  : [0,  5, ['pollo', 'pavo', 'gallina', 'cerdo']]
            , 'carnes rojas'    : [0,  2, ['ternera', 'cordero', 'pato']]
            , 'pescados blancos': [0,  5, ['lenguado', 'merluza', 'pescadilla', 'rape', 'bacalao', 'gallo', 'rodaballo', 'lubina']]
            , 'pescados azules' : [0,  5, ['atún', 'pez espada', 'salmón', 'boquerón', 'besugo', 'salmonete', 'caballa', 'trucha', 'cazón', 'sardina', 'gallineta', 'mero', 'dorada']]
            , 'huevos'          : [0,  7, ['huevo']]
            , 'verduras'        : [0, 99, ['aguacate', 'ajo', 'alcachofa', 'berenjena', 'brócoli', 'calabaza', 'calabacín', 'cebolla', 'coliflor', 'espinaca', 'pimiento', 'tomate', 'zanahoria', 'champiñon']]
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
        //*********************************************************************************
    }

    /* Metodo para cargar los primeros días */
    sets() {
        var i1      = 0;
        var i4      = 0;
        var newKeys = [];
        var auxKeys = Object.keys(this.kwargs['GlobalMenu']);
        var insert  = true;
        var err     = false;

        do {
            if (i1 > 0) {
                auxKeys = newKeys;
            }

            var i0   = auxKeys.length;
            this.kwargs[this.days[i1]] = '';

            if ((i0 > 0) && !err) {
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
            }

            if (i0 <= 0) {
                err = true;
            }

            if (err) {
                this.kwargs[this.days[i1]] = '';
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

        if (lotof != '') {
            out += '\n: -> Much@s ' + lotof.substr(0, lotof.length - 2) + '.';
        }

        if (little != '') {
            out += '\n: -> Poc@s  ' + little.substr(0, little.length - 2) + '.';
        }

        out += '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';

        return out;
    }

    /* Metodo para retornar la clase en cadena de caracteres */
    get str() {
        var out = '::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';

        for (var i0 = 0; i0 < this.days.length; i0++) {
            if (this.kwargs[days[i0]] != '') {
                out += '\n' + this.ddays[i0] + this.kwargs[days[i0]] + ' (' + this.kwargs['GlobalMenu'][this.kwargs[days[i0]]] + ')';
            } else {
                // Invetar plato con lo que falta
                out += '\n' + this.ddays[i0] + '0' + ' (' + '0' + ')';
            }
            
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

        out += '\n' + this.lack;

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