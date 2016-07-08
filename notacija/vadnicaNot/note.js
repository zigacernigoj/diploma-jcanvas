var gameCanvas  = $('#gameCanvas');

var gameWidth = gameCanvas.width();
var gameHeight = gameCanvas.height();

var xPadding = 50;

var xPath = "https://zigacernigoj.github.io/diploma-assets/student/btn/naprejTextBtn.png";




var notes = [];

notes[0] = 'c';
notes[1] = 'cis';
//notes[2] = 'ces';

//notes[3] = 'd';
//notes[4] = 'dis';
//notes[5] = 'des';

notes[6] = 'e';
//notes[7] = 'eis';
//notes[8] = 'es';

notes[9] = 'f';
//notes[10] = 'fis';
//notes[11] = 'fes';

notes[12] = 'g';
//notes[13] = 'gis';
//notes[14] = 'ges';

//notes[15] = 'a';
notes[16] = 'ais';
//notes[17] = 'as';

//notes[18] = 'h';
//notes[19] = 'his';
//notes[20] = 'hes';

var notesUrl = 'images/note/';
var png = '.png';
var notesPaths = [];

notesPaths[0] = notesUrl + notes[0] + png; // c
notesPaths[1] = notesUrl + notes[1] + png; // cis
//notesPaths[2] = notesUrl + notes[2] + png; // ces

//notesPaths[3] = notesUrl + notes[3] + png; // d
//notesPaths[4] = notesUrl + notes[4] + png; // dis
//notesPaths[5] = notesUrl + notes[5] + png; // des

notesPaths[6] = notesUrl + notes[6] + png; // e
//notesPaths[7] = notesUrl + notes[7] + png; // eis
//notesPaths[8] = notesUrl + notes[8] + png; // es

notesPaths[9] = notesUrl + notes[9] + png; // f
//notesPaths[10] = notesUrl + notes[10] + png; // fis
//notesPaths[11] = notesUrl + notes[11] + png; // fes

notesPaths[12] = notesUrl + notes[12] + png; // g
//notesPaths[13] = notesUrl + notes[13] + png; // gis
//notesPaths[14] = notesUrl + notes[14] + png; // ges

//notesPaths[15] = notesUrl + notes[15] + png; // a
notesPaths[16] = notesUrl + notes[16] + png; // ais
//notesPaths[17] = notesUrl + notes[17] + png; // as

//notesPaths[18] = notesUrl + notes[18] + png; // h
//notesPaths[19] = notesUrl + notes[19] + png; // his
//notesPaths[20] = notesUrl + notes[20] + png; // hes

var selectedImage = null;

function nextNote() {
    var nextImage = Math.round(Math.random()*(notes.length-1));
    selectedImage = notes[nextImage];

    gameCanvas.clearCanvas();
    gameCanvas.drawImage({
        source: notesPaths[nextImage],
        x: xPadding, y: 50,
        fromCenter: false
    });


    // dela cross-origin
    //gameCanvas.drawImage({
    //    source: xPath,
    //    x: xPadding, y: 50,
    //    fromCenter: false
    //});


    $('.btn-note').removeClass('btn-warning').removeClass('btn-success').addClass('btn-default');
}

function checkIfCorrect(id) {
    console.log(id);
    console.log(selectedImage);

    if(id == selectedImage){
        //console.log('correct');
        $('#'+id).removeClass('btn-default').addClass('btn-success');
        setTimeout(nextNote, 1000);
    }
    else{
        //console.log('not correct');
        $('#'+id).removeClass('btn-default').addClass('btn-warning');
    }
}

$('#instructionNaprej').click(function () {
    $('#gameInstructions').hide();
    $('#gameSettings').show();
});

$('#settingsNaprej').click(function () {
    $('#gameSettings').hide();
    $('#gameCanvas').show();
    $('#gameDashboard').show();
    nextNote();
});

$('.btn-note').click(function () {
    //nextNote();
    checkIfCorrect(this.id);
});