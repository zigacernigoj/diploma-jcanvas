var gameCanvas = $('#gameCanvas');
var gameWidth = gameCanvas.width();
var gameHeight = gameCanvas.height();

var baseURL = 'https://zigacernigoj.github.io/diploma-assets/';

store.set('mode', 'student');
var mode = store.get('mode');

if (mode === undefined) {
    mode = "student"; // default value
}

var naslovText = null;
var navodilaText = null;

var nastavitveText = null;

var uspeh = 0;
var uspehOds = 0;
var pravilniPrimeri = 0;
var reseniPrimeri = 0;

var nacinX;

var crtovje = null;
var prikazanaNota = null;

var correctNote = null;
var correctNoteNumber = null;
var trenutniRez = null;

var yPositions = [263, 245, 227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47,
    227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11,
    209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11, -7]; // 18px narazen

var yViolinski = ['c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a',
    'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais',
    'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as'];

var yBasovski = ['e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c',
    'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis',
    'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces'];

var yAltovski = ['d', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his',
    'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes'];


var ySopranski = ['a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f',
    'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis',
    'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes'];


var yTenorski = ['h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g',
    'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis',
    'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges'];

var notaCrtaBrez = ['celinkaCrta', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinka', 'celinkaCrta',
    'visajCelinkaCrta', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaBrez', 'visajCelinkaCrta',
    'nizajCelinkaCrta', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaBrez', 'nizajCelinkaCrta'];

var koncneNote = [];
var koncneNoteImena = [];
var izbraniKljuc, izbraniKljuc2;

showStart();


function reset() {
    //gameCanvas.remove();
    //
    //$('#canvasDiv').html('<canvas id="gameCanvas" width="800px" height="600px"></canvas>');
    //
    //gameCanvas = $('#gameCanvas');

    location.reload();
}

function showStart() {

    //reset();

    gameCanvas.css({
        backgroundColor: "#82aed6"
    });

    gameCanvas.clearCanvas();

    naslovText = gameCanvas.drawText({
        layer: true,
        name: 'naslovText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: gameWidth / 2, y: 50,
        fontSize: 62,
        fontFamily: 'Arial, sans-serif',
        text: 'Vadnica not'
    });


    navodilaText = gameCanvas.drawText({
        layer: true,
        name: 'navodilaText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: gameWidth / 2, y: 300,
        maxWidth: 500,
        fontSize: 24,
        fontFamily: 'Arial, sans-serif',
        text: 'Vadnica not ti bo pomagala izpiliti poznavanje not in njihov položaj na različnih lestvicah. ' +
        'Klikni gumb Naprej in si v meniju izberi note, lestvice in predznake.'
    });

    naprejTextBtn = gameCanvas.drawImage({
        layer: true,
        name: 'naprejTextBtn',
        source: baseURL + mode + '/btn/naprejTextBtn.png',
        x: 650, y: 550,
        fromCenter: false,
        click: function (layer) {
            showSettings();
        }
    });

    nazajTextBtn = gameCanvas.drawImage({
        layer: true,
        name: 'nazajTextBtn',
        source: baseURL + mode + '/btn/nazajTextBtn.png',
        x: 0, y: 550,
        fromCenter: false,
        click: function (layer) {
            window.location.href = 'https://zigacernigoj.github.io/';
        }
    });

}


function showSettings() {
    gameCanvas.css({
        backgroundColor: "#ffffff"
    });

    gameCanvas.removeLayer('naslovText').drawLayers();
    gameCanvas.removeLayer('navodilaText').drawLayers();
    gameCanvas.removeLayer('nazajTextBtn').drawLayers();
    gameCanvas.removeLayer('naprejTextBtn').drawLayers();

    gameCanvas.clearCanvas();

    nastavitveText = gameCanvas.drawText({
        layer: true,
        name: 'nastavitveText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: gameWidth / 2, y: 50,
        fontSize: 62,
        fontFamily: 'Arial, sans-serif',
        text: 'Nastavitve'
    });


    gameCanvas.drawText({
        layer: true,
        name: 'izberiNoteText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 50, y: 100,
        fontSize: 30,
        fontFamily: 'Arial, sans-serif',
        text: 'Izberi note',
        fromCenter: false
    });

    $('#settings1a').css({
        display: 'block'
    });

    $('#settings1b').css({
        display: 'block'
    });

    $('#settings1c').css({
        display: 'block'
    });

    gameCanvas.drawText({
        layer: true,
        name: 'izberiKljucText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 450, y: 100,
        fontSize: 30,
        fontFamily: 'Arial, sans-serif',
        text: 'Izberi ključ',
        fromCenter: false
    });

    $('#settings2').css({
        display: 'block'
    });


    gameCanvas.drawText({
        layer: true,
        name: 'izberiNacinText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 50, y: 375,
        fontSize: 30,
        fontFamily: 'Arial, sans-serif',
        text: 'Izberi način',
        fromCenter: false
    });

    $('#settings3').css({
        display: 'block'
    });


    nazajTextBtn = gameCanvas.drawImage({
        layer: true,
        name: 'nazajTextBtn',
        source: baseURL + mode + '/btn/nazajTextBtn.png',
        x: 0, y: 550,
        fromCenter: false,
        click: function (layer) {

            hideSettings();
            showStart();
        }
    });

    naprejTextBtn = gameCanvas.drawImage({
        layer: true,
        name: 'naprejTextBtn',
        source: baseURL + mode + '/btn/naprejTextBtn.png',
        x: 650, y: 550,
        fromCenter: false,
        click: function (layer) {
            zacniAkcija();
        }
    });
}


function hideSettings() {
    $('#settings1a').css({
        display: 'none'
    });
    $('#settings1b').css({
        display: 'none'
    });
    $('#settings1c').css({
        display: 'none'
    });
    $('#settings2').css({
        display: 'none'
    });
    $('#settings3').css({
        display: 'none'
    });


    gameCanvas.removeLayer('nastavitveText').drawLayers();
    gameCanvas.removeLayer('nazajTextBtn').drawLayers();
    gameCanvas.removeLayer('naprejTextBtn').drawLayers();
    gameCanvas.removeLayer('izberiNoteText').drawLayers();
    gameCanvas.removeLayer('izberiKljucText').drawLayers();
    gameCanvas.removeLayer('izberiNacinText').drawLayers();

    gameCanvas.removeLayer('stPrimerovText').drawLayers();
    gameCanvas.removeLayer('minusPrimeri').drawLayers();
    gameCanvas.removeLayer('plusPrimeri').drawLayers();

    gameCanvas.removeLayer('casText').drawLayers();
    gameCanvas.removeLayer('minusCas').drawLayers();
    gameCanvas.removeLayer('plusCas').drawLayers();


    gameCanvas.clearCanvas();
}

function hidePrimeriCas() {
    console.log('hidePrimeriCas');

    gameCanvas.removeLayer('stPrimerovText').drawLayers();
    gameCanvas.removeLayer('minusPrimeri').drawLayers();
    gameCanvas.removeLayer('plusPrimeri').drawLayers();

    gameCanvas.removeLayer('casText').drawLayers();
    gameCanvas.removeLayer('minusCas').drawLayers();
    gameCanvas.removeLayer('plusCas').drawLayers();
}

var stPrimerov = -1;

function drawStPrimerovText() {
    gameCanvas.drawText({
        layer: true,
        name: 'stPrimerovText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 354, y: 435,
        fontSize: 20,
        fontFamily: 'Arial, sans-serif',
        text: 'Število primerov: ' + stPrimerov,
        fromCenter: false
    });

}

function showPrimeri() {
    stPrimerov = 10;
    drawStPrimerovText();

    gameCanvas.drawImage({
        layer: true,
        name: 'minusPrimeri',
        source: baseURL + mode + '/btn/minusBtn.png',
        x: 650, y: 425,
        fromCenter: false,
        click: function (layer) {
            if (stPrimerov > 5) {
                stPrimerov -= 5;
            }
            gameCanvas.removeLayer('stPrimerovText').drawLayers();
            drawStPrimerovText();
        }
    });

    gameCanvas.drawImage({
        layer: true,
        name: 'plusPrimeri',
        source: baseURL + mode + '/btn/plusBtn.png',
        x: 710, y: 425,
        fromCenter: false,
        click: function (layer) {
            if (stPrimerov < 100) {
                stPrimerov += 5;
            }
            gameCanvas.removeLayer('stPrimerovText').drawLayers();
            drawStPrimerovText();
        }
    });


    gameCanvas.removeLayer('casText').drawLayers();
    gameCanvas.removeLayer('minusCas').drawLayers();
    gameCanvas.removeLayer('plusCas').drawLayers();

}


var cas = 60;
var intervalCas;

var updateIntervalCas; // = setInterval 1 sec

function drawCasText() {
    gameCanvas.drawText({
        layer: true,
        name: 'casText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 354, y: 460,
        fontSize: 20,
        fontFamily: 'Arial, sans-serif',
        text: "Čas: " + Math.floor(cas / 60) + " minut, " + cas % 60 + " sekund",
        fromCenter: false
    });
}

function showCas() {
    drawCasText();

    gameCanvas.drawImage({
        layer: true,
        name: 'minusCas',
        source: baseURL + mode + '/btn/minusBtn.png',
        x: 650, y: 450,
        fromCenter: false,
        click: function (layer) {
            if (cas > 10) {
                cas -= 10;
            }
            gameCanvas.removeLayer('casText').drawLayers();
            drawCasText();
        }
    });

    gameCanvas.drawImage({
        layer: true,
        name: 'plusCas',
        source: baseURL + mode + '/btn/plusBtn.png',
        x: 710, y: 450,
        fromCenter: false,
        click: function (layer) {
            if (cas < 300) {
                cas += 10;
            }
            gameCanvas.removeLayer('casText').drawLayers();
            drawCasText();
        }
    });


    gameCanvas.removeLayer('stPrimerovText').drawLayers();
    gameCanvas.removeLayer('minusPrimeri').drawLayers();
    gameCanvas.removeLayer('plusPrimeri').drawLayers();
}


function createNavbar() {
    console.log('test');
    gameCanvas.drawRect({
        layer: true,
        name: 'navbarBackground',
        fillStyle: '#000',
        x: 0, y: 0,
        width: 800,
        height: 30,
        fromCenter: false
    });

    gameCanvas.drawText({
        layer: true,
        name: 'imeText',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 10, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Vadnica not',
        fromCenter: false
    });

    gameCanvas.drawText({
        layer: true,
        name: 'primeriText',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 230, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Primeri: ',
        fromCenter: false
    });


    gameCanvas.drawText({
        layer: true,
        name: 'casText2',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 400, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Čas: ',
        fromCenter: false
    });


    gameCanvas.drawText({
        layer: true,
        name: 'uspehText',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 580, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Uspeh: ',
        fromCenter: false
    });


    gameCanvas.drawImage({
        layer: true,
        name: 'pauseBtn',
        source: baseURL + mode + '/btn/navbar/pauseWhiteBtn.png',
        x: 752, y: 9,
        fromCenter: false
    });

    gameCanvas.drawImage({
        layer: true,
        name: 'stopBtn',
        source: baseURL + mode + '/btn/navbar/stopWhiteBtn.png',
        x: 776, y: 9,
        fromCenter: false,
        click: function (layer) {
            showResults();
        }

    });
}

function updateCasText2() {

    gameCanvas.removeLayer('casText2').drawLayers();

    gameCanvas.drawText({
        layer: true,
        name: 'casText2',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 400, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: "Čas: " + Math.floor(cas / 60) + " m, " + cas % 60 + " s",
        fromCenter: false
    });
    cas--;
}


function destroyNavbar() {
    gameCanvas.removeLayer('navbarBackground').drawLayers();
    gameCanvas.removeLayer('imeText').drawLayers();
    gameCanvas.removeLayer('primeriText').drawLayers();
    gameCanvas.removeLayer('casText2').drawLayers();
    gameCanvas.removeLayer('uspehText').drawLayers();
    gameCanvas.removeLayer('pauseBtn').drawLayers();
    gameCanvas.removeLayer('stopBtn').drawLayers();
}


function updateUspeh() {
    gameCanvas.removeLayer('uspehText').drawLayers();

    gameCanvas.drawText({
        layer: true,
        name: 'uspehText',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 580, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Uspeh: ' + uspehOds.toFixed(0) + '%',
        fromCenter: false
    });
}

function zacniAkcija() {

    console.log('akcija');

    var note = document.querySelectorAll('input[name=note]:checked');
    for (var i = 0; i < note.length; i++) {
        koncneNoteImena.push(note[i].value);
    }
    console.log(koncneNoteImena);

    var kljuc = document.querySelectorAll('input[name=kljuc]:checked');
    console.log(kljuc[0].value);
    izbraniKljuc2 = kljuc[0].value;


    var nacin = document.querySelectorAll('input[name=nacin]:checked');
    console.log(nacin[0].value);

    nacinX = nacin[0].value;

    createNavbar();

    if (nacinX === 'stevilo') {
        updateOstanekPrimerov();
    }

    if(nacinX === 'cas') {
        updateCasText2();
        intervalCas = setInterval(showResults, cas * 1000 );
        updateIntervalCas = setInterval(updateCasText2, 1000);
    }

    hideSettings();

    drawKljuc();

    prepareNotes();

    drawNoteButtons();

    nextNote();

}

function nextNote() {
    var nextN = Math.round(Math.random() * (koncneNote.length - 1));
    console.log(nextN);

    gameCanvas.drawImage({
        layer: true,
        name: 'prikazanaNota',
        source: baseURL + mode + '/notacija/' + notaCrtaBrez[koncneNote[nextN]] + ".png",
        x: gameWidth / 2, y: yPositions[koncneNote[nextN]],
        fromCenter: false
    });

    correctNote = izbraniKljuc[koncneNote[nextN]];
    correctNoteNumber = yPositions[koncneNote[nextN]];

    console.log(correctNote);
}


function prepareNotes() {
    console.log('prepareNotes');
    for (var i in izbraniKljuc) {
        for (var j in koncneNoteImena) {
            if (izbraniKljuc[i] === koncneNoteImena[j]) {
                console.log(i, izbraniKljuc[i], koncneNoteImena[j]);
                koncneNote.push(i);
            }
        }
    }
}

function hidePravilnost() {
    clearInterval(delay);

    gameCanvas.removeLayer('pravilnostText').drawLayers();
    gameCanvas.removeLayer('pravilnoImg').drawLayers();
    gameCanvas.removeLayer('narobeImg').drawLayers();


    gameCanvas.removeLayer('prikazanaNota').drawLayers();

    if ((stPrimerov-reseniPrimeri != 0 && nacinX === 'stevilo') || nacinX === 'neomejeno' || nacinX === 'cas' ) {
        nextNote();
    }
    else {
        console.log("stop");
        showResults();
    }
}


var delay;

function checkIfCorrect(clickedName) {
    console.log("check if correct");

    reseniPrimeri++;

    gameCanvas.removeLayer('pravilnostText').drawLayers();
    gameCanvas.removeLayer('pravilnoImg').drawLayers();
    gameCanvas.removeLayer('narobeImg').drawLayers();

    if (clickedName === correctNote) {
        console.log("pravilno");

        gameCanvas.drawImage({
            layer: true,
            name: 'pravilnoImg',
            source: baseURL + mode + '/pravilnost/pravilno.png',
            x: 500, y: 260,
            fromCenter: false
        });

        pravilniPrimeri++;
    }
    else {
        console.log("narobe");

        gameCanvas.drawImage({
            layer: true,
            name: 'narobeImg',
            source: baseURL + mode + '/pravilnost/narobe.png',
            x: 500, y: 260,
            fromCenter: false
        });

        gameCanvas.drawText({
            layer: true,
            name: 'pravilnostText',
            fillStyle: '#000',
            //strokeStyle: '#25a',
            //strokeWidth: 2,
            x: 50, y: 325,
            fontSize: 40,
            fontFamily: 'Arial, sans-serif',
            text: "Pravilna: " + correctNote,
            fromCenter: false
        });
    }

    uspeh = pravilniPrimeri / reseniPrimeri;
    uspehOds = uspeh * 100;
    updateUspeh();

    if (nacinX === 'stevilo') {
        updateOstanekPrimerov();
    }

    delay = setInterval(hidePravilnost, 500);

}

function updateOstanekPrimerov() {

    gameCanvas.removeLayer('primeriText').drawLayers();
    gameCanvas.drawText({
        layer: true,
        name: 'primeriText',
        fillStyle: '#fff',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: 230, y: 2,
        fontSize: 25,
        fontFamily: 'Arial, sans-serif',
        text: 'Primeri: ' + (stPrimerov - reseniPrimeri),
        fromCenter: false
    });
}

function drawKljuc() {

    var img = "";
    if (izbraniKljuc2 === 'violinski') {
        img = 'treble';
        izbraniKljuc = yViolinski;
    }
    else if (izbraniKljuc2 === 'basovski') {
        img = 'bass';
        izbraniKljuc = yBasovski;
    }
    else if (izbraniKljuc2 === 'altovski') {
        img = 'alto';
        izbraniKljuc = yAltovski;
    }
    else if (izbraniKljuc2 === 'tenorski') {
        img = 'tenor';
        izbraniKljuc = yTenorski;
    }
    else if (izbraniKljuc2 === 'sopranski') {
        img = 'soprano';
        izbraniKljuc = ySopranski;
    }

    gameCanvas.drawImage({
        layer: true,
        name: 'kljucImg',
        source: baseURL + mode + '/notacija/kljuci/' + img + '.png',
        x: 30, y: -43,
        fromCenter: false
    });
}


function drawNoteButtons() {

    gameCanvas.drawImage({
        layer: true,
        name: 'cBtn',
        source: baseURL + mode + '/btn/note/cBtn.png',
        x: 75, y: 450,
        click: function (layer) {
            checkIfCorrect('c');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'dBtn',
        source: baseURL + mode + '/btn/note/dBtn.png',
        x: 175, y: 450,
        click: function (layer) {
            checkIfCorrect('d');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'eBtn',
        source: baseURL + mode + '/btn/note/eBtn.png',
        x: 275, y: 450,
        click: function (layer) {
            checkIfCorrect('e');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'fBtn',
        source: baseURL + mode + '/btn/note/fBtn.png',
        x: 375, y: 450,
        click: function (layer) {
            checkIfCorrect('f');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'gBtn',
        source: baseURL + mode + '/btn/note/gBtn.png',
        x: 475, y: 450,
        click: function (layer) {
            checkIfCorrect('g');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'aBtn',
        source: baseURL + mode + '/btn/note/aBtn.png',
        x: 575, y: 450,
        click: function (layer) {
            checkIfCorrect('a');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'hBtn',
        source: baseURL + mode + '/btn/note/hBtn.png',
        x: 675, y: 450,
        click: function (layer) {
            checkIfCorrect('h');
        }
    });

///////// VISAJI --------------------------------------------------
    gameCanvas.drawImage({
        layer: true,
        name: 'cisBtn',
        source: baseURL + mode + '/btn/note/cisBtn.png',
        x: 75, y: 400,
        click: function (layer) {
            checkIfCorrect('cis');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'disBtn',
        source: baseURL + mode + '/btn/note/disBtn.png',
        x: 175, y: 400,
        click: function (layer) {
            checkIfCorrect('dis');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'eisBtn',
        source: baseURL + mode + '/btn/note/eisBtn.png',
        x: 275, y: 400,
        click: function (layer) {
            checkIfCorrect('eis');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'fisBtn',
        source: baseURL + mode + '/btn/note/fisBtn.png',
        x: 375, y: 400,
        click: function (layer) {
            checkIfCorrect('fis');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'gisBtn',
        source: baseURL + mode + '/btn/note/gisBtn.png',
        x: 475, y: 400,
        click: function (layer) {
            checkIfCorrect('gis');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'aisBtn',
        source: baseURL + mode + '/btn/note/aisBtn.png',
        x: 575, y: 400,
        click: function (layer) {
            checkIfCorrect('ais');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'hisBtn',
        source: baseURL + mode + '/btn/note/hisBtn.png',
        x: 675, y: 400,
        click: function (layer) {
            checkIfCorrect('his');
        }
    });

/////////// NIZAJI -----------------------------------------
    gameCanvas.drawImage({
        layer: true,
        name: 'cesBtn',
        source: baseURL + mode + '/btn/note/cesBtn.png',
        x: 75, y: 500,
        click: function (layer) {
            checkIfCorrect('ces');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'desBtn',
        source: baseURL + mode + '/btn/note/desBtn.png',
        x: 175, y: 500,
        click: function (layer) {
            checkIfCorrect('des');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'esBtn',
        source: baseURL + mode + '/btn/note/esBtn.png',
        x: 275, y: 500,
        click: function (layer) {
            checkIfCorrect('es');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'fesBtn',
        source: baseURL + mode + '/btn/note/fesBtn.png',
        x: 375, y: 500,
        click: function (layer) {
            checkIfCorrect('fes');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'gesBtn',
        source: baseURL + mode + '/btn/note/gesBtn.png',
        x: 475, y: 500,
        click: function (layer) {
            checkIfCorrect('ges');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'asBtn',
        source: baseURL + mode + '/btn/note/asBtn.png',
        x: 575, y: 500,
        click: function (layer) {
            checkIfCorrect('as');
        }
    });
    gameCanvas.drawImage({
        layer: true,
        name: 'hesBtn',
        source: baseURL + mode + '/btn/note/hesBtn.png',
        x: 675, y: 500,
        click: function (layer) {
            checkIfCorrect('hes');
        }
    });

}

function clearAll() {
    gameCanvas.clearCanvas();

    gameCanvas.drawRect({
        layer: true,
        name: 'showResults',
        fillStyle: '#fff',
        x: 0, y: 0,
        width: 800,
        height: 600,
        fromCenter: false
    });
}


function showResults() {

    clearInterval(intervalCas);

    clearAll();

    gameCanvas.drawText({
        layer: true,
        name: 'resultsText',
        fillStyle: '#000',
        //strokeStyle: '#25a',
        //strokeWidth: 2,
        x: gameWidth / 2, y: 200,
        maxWidth: 500,
        fontSize: 24,
        fontFamily: 'Arial, sans-serif',
        text: 'Rezultati: \nRešenih primerov: ' + reseniPrimeri + '\nPravilnih primerov: ' + pravilniPrimeri +
        '\nUspešnost: ' + uspehOds + '%'
    });

    naprejTextBtn = gameCanvas.drawImage({
        layer: true,
        name: 'naprejTextBtn',
        source: baseURL + mode + '/btn/naprejTextBtn.png',
        x: 650, y: 550,
        fromCenter: false,
        click: function (layer) {
            reset();
        }
    });
}