function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form'); //Llamando al formulario

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let nombres = document.getElementById('nombre').value;
        let apellidos = document.getElementById('apellido').value;
        let dni = document.getElementById('dni').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('telefono').value;
        let celular = document.getElementById('celular').value;
        let fecha1 = document.querySelector('input[name="fecha1"]:checked').value;
        let fecha2 = document.querySelector('input[name="fecha2"]:checked').value;
        let fecha3 = document.querySelector('input[name="fecha3"]:checked').value;
        let fecha4 = document.querySelector('input[name="fecha4"]:checked').value;
        let fecha5 = document.querySelector('input[name="fecha5"]:checked').value;
        generatePDF(nombres, apellidos, dni, email, celular, telefono, fecha1, fecha2, fecha3, fecha4, fecha5);
    })

});

async function generatePDF(nombres, apellidos, dni, email, celular, telefono, fecha1, fecha2, fecha3, fecha4, fecha5) {

    const image = await loadImage("formulario.jpg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 565, 792);  //TAMAÑO DE PDF




    
    pdf.addImage(signatureImage, 'PNG', 290, 535, 300, 60);  //Firma  x y Y  x--->  y 


    const image2 = await loadImage("firmabg.png");
    pdf.addImage(image2, 'PNG', 110, 541, 120, 33);  //TAMAÑO DE PDF
 

    //pdf.setFontSize(12);
    //pdf.text(curso, 260, 125);  

    const date = new Date();

    var dia = date.getUTCDate().toString();
    var mes = (date.getUTCMonth() + 1).toString();
    var año = date.getUTCFullYear().toString();
    
    var textoConcatenado = 'Fecha: ' + dia + ' / ' + mes + ' / ' + año;
    pdf.setFontSize(12);
    pdf.text(textoConcatenado, 470, 120);  //Fecha de Inscripción

    const meses = {
        1: 'Enero',
        2: 'Febrero',
        3: 'Marzo',
        4: 'Abril',
        5: 'Mayo',
        6: 'Junio',
        7: 'Julio',
        8: 'Agosto',
        9: 'Septiembre',
        10: 'Octubre',
        11: 'Noviembre',
        12: 'Diciembre'
      };
      
      const mesNumero = date.getUTCMonth() + 1; // Sumamos 1 ya que los meses en JavaScript se representan del 0 al 11
      const mesTexto = meses[mesNumero];
      
      pdf.text(mesTexto, 228, 530);

    pdf.text(date.getUTCDate().toString(), 112, 530);
    //pdf.text((date.getUTCMonth() + 1).toString(), 220, 530);
    //pdf.text(date.getUTCFullYear().toString(), 220, 530);




    pdf.setFontSize(11);

    var nombreCompleto = nombres + ' ' + apellidos;
    pdf.text(nombreCompleto, 180, 172);
    pdf.text(dni, 200, 187);  //DNI
    pdf.text(email, 170, 419); //CORREO 
    pdf.text(telefono, 338, 408);  //TELEFONO
    pdf.text(celular, 422, 408);  //CELULAR
    

    
    pdf.setFillColor(0,0,0);

    if (parseInt(fecha1) == 1) {
        pdf.text(422, 286, 'Si Acepto');
    } else{
        pdf.text(422, 286, 'Si Acepto');
    } 

    if (parseInt(fecha2) === 1) {
        pdf.text(422, 309, 'Si Acepto');
    } else{
        pdf.text(422, 309, 'Si Acepto');
    } 

    if (parseInt(fecha3) === 1) {
        pdf.text(422, 329, 'Si Acepto');
    } else{
        pdf.text(422, 329, 'Si Acepto');
    } 

    if (parseInt(fecha4) === 1) {
        pdf.text(422, 349, 'Si Acepto');
    }else {
        pdf.text(422, 349, 'Si Acepto');
    } 
    if (parseInt(fecha5) === 1) {
        pdf.text(422, 370, 'Si Acepto');
    } else{
        pdf.text(422, 370, 'Si Acepto');
    } 


 


    pdf.save("example.pdf");

}