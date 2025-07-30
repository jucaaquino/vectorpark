if (!app.homeScreenVisible) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

var myDocument = app.documents.add();

generateBackground();

function generateBackground() {
    var doc = app.activeDocument;
    var background = doc.pathItems.add();
    background.filed = true;
    var bgFillColor = new CMYKColor();
    bgFillColor.cyan   = 4;
    bgFillColor.magenta = 2;
    bgFillColor.yellow = 97;
    bgFillColor.black  = 1;

    background.fillColor = bgFillColor;
    background.setEntirePath([[0, 0],
                             [doc.width, 0],
                             [doc.width, doc.height],
                             [0, doc.height]]);
}
