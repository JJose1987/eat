/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var days = ['mon_l' , 'mon_d' , 'tue_l' , 'tue_d' , 'wed_l' , 'wed_d' , 'thu_l' , 'thu_d' , 'fri_l' , 'fri_d' , 'sat_l' , 'sat_d' , 'sun_l' , 'sun_d'];

const __eat = new EAT();

// Funciones
function main() {
    $('div[class=table] div').height(height * 0.967);
    this.__eat = new EAT();
    this.__eat.sets();
    
    for (var i0 = 0; i0 < days.length; i0++) {
        $.each(this.__eat.get('GlobalMenu'), function(key, val) {$('[name=' + days[i0] + ']').append(new Option(key, key.replaceAll(' ', '_')));});
        
        if (this.__eat.get(days[i0]) != '') {
            $('[name=' + days[i0] + '] option[value=' + this.__eat.get(days[i0]).replaceAll(' ', '_') + ']').attr('selected','selected');
        }
    }
    
    update();
    
    $('select').change(function() {set(this);});
    $('svg').click(function() {send();});
}
// Asignar valor del campo
function set(object) {
    var index = $(object).attr('name');

    this.__eat.set(index, ($(object).val()).replaceAll('_', ' '));

    update();
}
//
function send() {
    location.href = 'whatsapp://send?text=' + ((this.__eat.str).replaceAll(' ', '%20')).replaceAll('\n', '%0A');    
}
// Actualizar valores de la clase
function update() {
    $('div[id=lack]').html((this.__eat.lack).replaceAll('\n', '<br />'));
}


