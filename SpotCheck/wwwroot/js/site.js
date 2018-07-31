// Write your JavaScript code.


window.addEventListener('load', async e => {
    console.log('load event');
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');
        }
        catch (error) {
            console.log('error');
        }
    }
});


$(".userinput").change(function () {
    UpdateValues();
});
$(".userinput").keyup(function () {
    UpdateValues();
});
$("#resetButton").click(function () {
    ResetValues();
});
function UpdateValues() {
    // check to see if all inputs are filled in for backgound sound level and update if so
    var totalSoundLevel = parseInt($("#totalSoundLevel").val());
    var backgroundOnlySoundLevel = parseInt($("#backgroundOnlySoundLevel").val());
    var distFromSound = parseInt($("#distFromSound").val());
    // console.log("updatevalues. totalSoundLevel:" + totalSoundLevel + " backgroundOnlySoundLevel:" + backgroundOnlySoundLevel + " distFromSound:" + distFromSound);
    var soundOfInterestLevel;
    var estSoundLevel;
    if (!totalSoundLevel || !backgroundOnlySoundLevel ||       
        totalSoundLevel <= 0 || backgroundOnlySoundLevel <= 0) {
        $("#soundOfInterestLevel").val("");
    }
    else {
        soundOfInterestLevel = 10.0 * Math.log10(
                                            Math.pow(10,totalSoundLevel / 10.0) -
                                            Math.pow(10,backgroundOnlySoundLevel / 10.0));
        $("#soundOfInterestLevel").val(Math.round(soundOfInterestLevel));

        if (distFromSound && distFromSound >= 0) {
            estSoundLevel = Math.round(85 - 20 * Math.log10(distFromSound / 52));
            $("#estSoundLevel").val(Math.round((estSoundLevel)));
        }
        else {
            $("#estSoundLevel").val("");
        }
    }

    UpdateResultMessageArea(estSoundLevel, soundOfInterestLevel);
}

function UpdateResultMessageArea(estSoundLevel, soundOfInterest) {
    // console.log("URMA: estSoundLevel:" + estSoundLevel + " soundOfInterest:" + soundOfInterest);
    const resultOkMessage = "Estimated sound level and Sound of Interest are within 10 dBA which is expected.";
    const resultTooNegativeMessage = "Estimated Sound Level is more than 10 dBA HIGHER THAN Sound of Interest Level. Check your measurement location. There may be a barrier or other object blocking the sound path.";
    const resultTooPositiveMessage = "Estimated Sound Level is less than 10 dBA LOWER THAN Sound of Interest Level. Check your measurement location. There may be a sound source close to your measurement locations that is influencing the results.";

    var resultMessage = $("#resultMessage");
    if (!estSoundLevel || !soundOfInterest || estSoundLevel <= 0) {
        resultMessage.css("display", "none");
    }
    else {
        if (Math.abs(estSoundLevel - soundOfInterest) <= 10) {
            $("#resultMessageText").text(resultOkMessage);
            $("#resultIcon").attr("src", "/images/check-32.png");
        }
        else if (estSoundLevel < soundOfInterest) {
            $("#resultMessageText").text(resultTooNegativeMessage);
            $("#resultIcon").attr("src", "/images/warning-32.png");
        }
        else {
            $("#resultMessageText").text(resultTooPositiveMessage);
            $("#resultIcon").attr("src", "/images/warning-32.png");
        }

        resultMessage.css("display", "block");
    }


    /*
     *  private const string ResultOkMessage = @"Estimated sound level and Sound of Interest are within 10 dBA which is expected.";
		private const string ResultsTooNegativeMessage = @"Estimated Sound Level is more than 10 dBA HIGHER THAN Sound of Interest Level. Check your measurement location. There may be a barrier or other object blocking the sound path.";
        private const string ResultsTooPositiveMessage = @"Estimated Sound Level is less than 10 dBA LOWER THAN Sound of Interest Level. Check your measurement location. There may be a sound source close to your measurement locations that is influencing the results.";

     */
}

function ResetValues() {
    $("input").val("");
    UpdateResultMessageArea();
}