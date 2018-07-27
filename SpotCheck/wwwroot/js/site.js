// Write your JavaScript code.

$(".userinput").change(function () {
    UpdateValues();
});


function UpdateValues() {
    // check to see if all inputs are filled in for backgound sound level and update if so
    //console.log('UpdateValues called');
    var totalSoundLevel = parseInt($("#totalSoundLevel").val());
    var backgroundOnlySoundLevel = parseInt($("#backgroundOnlySoundLevel").val());
    var distFromSound = parseInt($("#distFromSound").val());

    //console.log("totalSoundLevel: " + totalSoundLevel + " backgroundOnlySoundLevel:" + backgroundOnlySoundLevel + " distFromSound:" + distFromSound);

    if (!totalSoundLevel || !backgroundOnlySoundLevel ||       
        totalSoundLevel < 0 || backgroundOnlySoundLevel < 0) {
        $("#soundOfInterestLevel").val("999");
    }
    else {
        var soundOfInterestLevel = 10.0 * Math.log10(Math.pow(totalSoundLevel / 10.0, 10) - Math.pow(backgroundOnlySoundLevel / 10.0, 10));
        $("#soundOfInterestLevel").val(Math.round(soundOfInterestLevel * 100) / 100);

        if (distFromSound && distFromSound >= 0) {
            var estSoundLevel = Math.round(85 - 20 * Math.log10(distFromSound / 52));
            $("#estSoundLevel").val(Math.round((estSoundLevel * 100) / 100));
        }
        else {
            $("#estSoundLevel").val(999);
        }
    }
}



