
var api_base = "https://www.googleapis.com/youtube/v3";
var key = 'AIzaSyBviXxqFhZqBGocPSTYgluczLNHZvU3rGQ';
var ID = location.toString().split("#", 2)[1];
var pl_index = -1;
var pl_list = new Array();

$(document).ready(function(){
    $("#pl_id").text(ID);
    $("#btn_search").click(function(){
	q = $("#search_q").val();
	//alert(q);
	search_videos(q);
    });
});

function search_videos(q)
{
/*
    GET {base_URL}/search?part=snippet
    &q=YouTube+Data+API
    &type=video
    &videoCaption=closedCaption
    &key={YOUR_API_KEY}
*/


    $("#log").text(q);
    $.getJSON(api_base + "/search", { 
	part: "snippet", q: q, 
	type: "video", 	key: key,
	order: "viewCount", videoEmbeddable: "true",
	maxResults: "25"
    }).done(function(data){
	//alert(data);

	$("#log").html("");
	res = "";

	for (tmp in data.items)
	{
	    i = data.items[tmp];
	    //alert(i.id.videoId);
	    //alert(i.snippet.title);

	    res = res + "<img src='" + i.snippet.thumbnails.medium.url + "' width='320px' height='180px' />\n";
	    res = res + "<p>" + i.snippet.title + "</p><br />\n";
	}

	$("#log").html(res);
    });

}


function load_playlist(id)
{
    d = new Date();
    pl_list.length = 0;
    $.getJSON("ajax/getplaylist.php", { id: id, t: d.getTime() } ).done(function(data){
	for (tmp in data) {
	    pl_list.push(data[tmp].id);
	}
    });
}
