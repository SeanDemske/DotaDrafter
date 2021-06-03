function formatTime(duration) {   
    // Converts seconds to mm:ss
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    var formattedTime = "";

    formattedTime += "" + mins + ":" + (secs < 10 ? "0" : "");
    formattedTime += "" + secs;
    return formattedTime;
}

export default formatTime;