app.bringToFront();
//var outputFolder = Folder.selectDialog("Select a folder for the output files");
var activeDoc = app.activeDocument;
var activeLayer = activeDoc.activeLayer;
var artLayers = activeDoc.artLayers;
var i = 0;

for(i = 0; i < artLayers.length; i++)
    artLayers[i].visible = false;

for(i = 0; i < artLayers.length; i++)
{
    if(i > 0)   artLayers[i - 1].visible = false;
    artLayers[i].visible = true;
    activeDoc.trim();
    activeDoc.saveAs(File("D:/" + artLayers[i].name + ".png"), PNGSaveOptions, true);
    activeDoc.activeHistoryState = activeDoc.historyStates[activeDoc.historyStates.length - 2];
}