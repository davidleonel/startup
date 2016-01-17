$(document).ready(function() {
	
	$("#txtName").focus();


	$("#btnSearch").click(function (){

		$('li').fadeOut("slow", function(){$(this).remove();});
		var search = document.getElementById("txtSearch").value;
		var searchType = "track";
		$.ajax({
			url: "https://api.spotify.com/v1/search",			
			data: {q: search, type: searchType},
			success: function(result){
				console.log(result);

				if(result){	
	                var len = result.tracks.items.length;
	                if(len > 0){

	                    for(var i=0;i<len;i++){
	                        $("#tracks").append("<li> Track Name: "+result.tracks.items[i].name+"</br> Artist: "+result.tracks.items[i].artists[0].name+"</br>Duration: "+result.tracks.items[i].duration_ms+"</li>");
	                    }
	                }
	                $('.answerSongs').fadeIn("slow");
            	}
			},
			error: function(){
				$(".answer").html("ERROR!!!");
				$("section").css("color","red");
			},

		});

	});

	
});

