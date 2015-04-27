
var first_id;
var player;
var done = false;
var ID = location.toString().split("#", 2)[1];
var pl_index = -1;
var pl_list = new Array();

$(document).ready(function(){

    $("#pl_id").text(ID);

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: $(window).height() - 100,
        width: $(window).width(),
//        videoId: 'RuOifc4ZJY8',
        events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
        }
    });

}

function onPlayerReady(event) {
    load_playlist(event.target, ID);
    event.target.setVolume(100);
//    event.target.playVideo();
}

function onPlayerStateChange(event) {

    pl_index = event.target.getPlaylistIndex();
    $("#log").text("state: " + event.data + " / pl_index: " + pl_index );

}

function stopVideo() {
    player.stopVideo();
}


function load_playlist(pl, id)
{
    d = new Date();
    pl_list.length = 0;
    $.getJSON("ajax/getplaylist.php", { id: id, t: d.getTime() } ).done(function(data){
	for (tmp in data) {
	    pl_list.push(data[tmp].id);
	}
	pl.loadPlaylist(pl_list);
    });
}
