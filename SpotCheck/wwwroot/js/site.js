// Write your JavaScript code.

$(".userinput").change(function () {
    UpdateValues();
});
$(".userinput").keyup(function () {
    UpdateValues();
});

function UpdateValues() {
    // check to see if all inputs are filled in for backgound sound level and update if so
    var totalSoundLevel = parseInt($("#totalSoundLevel").val());
    var backgroundOnlySoundLevel = parseInt($("#backgroundOnlySoundLevel").val());
    var distFromSound = parseInt($("#distFromSound").val());
    // console.log("updatevalues. totalSoundLevel:" + totalSoundLevel + " backgroundOnlySoundLevel:" + backgroundOnlySoundLevel + " distFromSound:" + distFromSound);

    if (!totalSoundLevel || !backgroundOnlySoundLevel ||       
        totalSoundLevel < 0 || backgroundOnlySoundLevel < 0) {
        $("#soundOfInterestLevel").val("");
    }
    else {
        var soundOfInterestLevel = 10.0 * Math.log10(
                                            Math.pow(10,totalSoundLevel / 10.0) -
                                            Math.pow(10,backgroundOnlySoundLevel / 10.0));
        $("#soundOfInterestLevel").val(Math.round(soundOfInterestLevel));

        if (distFromSound && distFromSound >= 0) {
            var estSoundLevel = Math.round(85 - 20 * Math.log10(distFromSound / 52));
            $("#estSoundLevel").val(Math.round((estSoundLevel)));
        }
        else {
            $("#estSoundLevel").val("");
        }
    }
}

