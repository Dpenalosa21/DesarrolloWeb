$(document).ready(function () {

    $(".Botones").click(function () {

        var idBoton = $(this).attr('id');
        $("#Bisiestos").addClass('Hidden');
        $("#Tablas").addClass('Hidden');
        $("#TipoCambio").addClass('Hidden');
        $("#ArregloRand").addClass('Hidden');

        BtnTipoCambio
        switch (idBoton) {
            case 'BtnBisiestos':
                $("#Bisiestos").removeClass('Hidden');
                break;
            case 'BtnTablas':
                $("#Tablas").removeClass('Hidden');
                break;
            case 'BtnArreglos':
                $("#ArregloRand").removeClass('Hidden');
                GenerarArregloAleatorio()
                break;
            case 'BtnArreglosDos':

                break;
            case 'BtnTipoCambio':
                $("#TipoCambio").removeClass('Hidden');
                ConnectApiBancoMX();
                break;

        }

    })


    $("#BtnCalcularBisiesto").click(function () {

        var Year = $("#Year").val();
        if (Year == '') {
            alert('Ingrese un año para validar');
            return;
        } else {
            ValidarBisiesto(Year);
        }

    })

    function ValidarBisiesto(Year) {

        if (((Year % 4 == 0) && (Year % 100 != 0)) || (Year % 400 == 0)) {
            alert('El año es bisiesto')
        } else {
            alert('El año no es bisiesto')
        }

    }


    function GenerarArregloAleatorio() {
        const ArrayRandom = Array();
        for (var i = 1; i <= 20; i++) {

            ArrayRandom.push(Math.floor(Math.random() * (100 - 1) + 1));
        }
        var html = '<h2>Numeros aleatorios:';
        for (var Value in ArrayRandom) {
            html += '-' + ArrayRandom[Value] + '-';
        }
        html += '</h2>';

        var done = false;
        while (!done) {
            done = true;
            for (var x = 1; x < ArrayRandom.length; x += 1) {
                if (ArrayRandom[x - 1] > ArrayRandom[x]) {
                    done = false;
                    var tmp = ArrayRandom[x - 1];
                    ArrayRandom[x - 1] = ArrayRandom[x];
                    ArrayRandom[x] = tmp;
                }
            }
        }
        html += '<h2>Numeros Ordenados:';
        for (var Value in ArrayRandom) {
            html += '-' + ArrayRandom[Value] + '-';
        }
        html += '<h2>';

        $("#ResultadoArreglo").html(html);

    }



    $("#BtnGenerarTabla").click(function () {

        var Filas = $("#Filas").val();
        var Columnas = $("#Columnas").val();

        if (Filas == '') {
            alert('Ingrese un numero de filas');
            return;
        } else if (Columnas == '') {
            alert('Ingrese un numero de columnas');
            return;
        } else {
            html = '<table>';

            for (var i = 1; i <= Filas; i++) {
                html += "<tr>";
                for (var x = 1; x <= Columnas; x++) {
                    html += '<td>' + x + '</td>';
                }
                html += "</tr>";
            }
            html += '</table>';
            $("#ResultadoTablas").html(html);
        }

    })



    function ConnectApiBancoMX() {
        var token = '?token=d3919418fa9312a4ed7883eb60c20a544c42b24f80d358a6c94396b1d7d21f14';

        var urlApi = "https://www.banxico.org.mx/SieAPIRest/service/v1/";
        const D = new Date(Date.now());
        var diaActual = D.getDate();
        var MesActual = D.getMonth() + 1;
        if (MesActual < 10) {
            var MesActual = '0' + MesActual
        }
        if (diaActual < 10) {
            var diaActual = '0' + diaActual
        }
        var YearActual = D.getFullYear();
        var FechaActual = YearActual + '-' + MesActual + '-' + diaActual;

        const FechaCalcular = new Date(FechaActual);
        var FechaFinal = FechaCalcular.setDate(FechaCalcular.getDate() - 5);
        const E = new Date(FechaFinal);
        var diaFinal = E.getDate();
        var MesFinal = E.getMonth() + 1;
        if (MesFinal < 10) {
            var MesFinal = '0' + MesFinal
        }
        if (diaFinal < 10) {
            var diaFinal = '0' + diaFinal
        }
        var YearFinal = E.getFullYear();
        var FechaFinal = YearFinal + '-' + MesFinal + '-' + diaFinal;
        var endPoint = "series/SF43718/datos/" + FechaFinal + "/" + FechaActual + "";
        $("#ResultadoTipoCambio").html('<h2>Cargando datos del banco</h2>');
        $.ajax({
            url: urlApi + endPoint + token,
            dataType: "json",
            type: "get",
            success: function (response) {
                var series = response.bmx.series;
                $("#ResultadoTipoCambio").html("");
                //Se carga una tabla con los registros obtenidos
                html = '';
                for (var i in series) {
                    var serie = series[i];
                    var TituloSerie = serie.titulo;
                    var DatosSerie = serie.datos;
                    html += '<H2>' + TituloSerie + '</H2>';
                    html += '<table>';
                    html += '<tr>'
                    html += '<td>FECHA</td>';
                    html += '<td>VALOR</td>'
                    html += '</tr>'
                    for (var d in DatosSerie) {
                        html += '<tr>'
                        var datos = DatosSerie[d];
                        html += '<td>' + datos.fecha + '</td>';
                        html += '<td><B>$' + datos.dato + '</B></td>';
                        html += '</tr>'
                    }
                    html += '</table>';
                }

                $("#ResultadoTipoCambio").html(html);
            }
        });
    }


    function formatoFecha(fecha, formato) {
        formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }





})