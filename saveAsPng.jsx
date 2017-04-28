app.bringToFront();
activeDoc = app.activeDocument;
activeLayer = app.activeDocument.activeLayer;

//返回step步历史
function setHistory(step)
{
	activeDoc.activeHistoryState = activeDoc.historyStates[activeDoc.historyStates.length - 1 - step];
}

//旋转
function rotateAroundPosition(_angle,x,y) {
  var desc1 = new ActionDescriptor();
  var desc2 = new ActionDescriptor();
  var ref1 = new ActionReference();
  ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
  desc1.putReference(charIDToTypeID('null'), ref1);
  desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
  desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), x);
  desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), y);
  desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
  desc1.putUnitDouble(charIDToTypeID('Angl'), charIDToTypeID('#Ang'), _angle);
  desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
  executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
}

//主函数
function main()
{
    //选择保存路径
    file = new File(activeDoc.activeLayer.name);
    file = file.saveDlg(null, "PNG files:*.png");

    //取消则退出
    if(file == null)    return;

    csv = new File(file.path + "/location.csv");
    csv.open("w");
    //剪切图片并返回历史
    //alert(activeLayer.bounds[0] + "," + activeLayer.bounds[1]);
    var cnt = 0;
    for(i = 0; i < 90; i+=0.5)
    {
        var fileStr = file.fullName;
        fileStr = fileStr.substr(0, fileStr.length - 4);
        filename = file.name.substr(0, file.name.length - 4);
        
        rotateAroundPosition(i, 400, 237); 
        
        x = activeLayer.bounds[0].toString();
        y = activeLayer.bounds[1].toString();
        w = (activeLayer.bounds[2] - activeLayer.bounds[0]).toString();
        h = (activeLayer.bounds[3] - activeLayer.bounds[1]).toString();
        
        activeDoc.trim();
        activeDoc.saveAs(File(fileStr + "_" + cnt + ".png"), PNGSaveOptions, true);
        
        csv.write(filename + "_" + cnt + ".png" + "," + x.substr(0, x.length - 3) + "," + y.substr(0, y.length - 3) + "," + 
                      w.substr(0, w.length - 3) + "," + h.substr(0, h.length - 3) + "\n"); 
        setHistory(2);
        cnt++;
    }
    csv.close();

    alert("finish");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main();
