$(document).ready(function() {
	
	$("#txtName").focus();

	$("#btnName").click(function (){


		var name = document.getElementById("txtName").value;

		$.ajax({
			url: "http://bootcamp.aws.af.cm/welcome/yourname",
			data: {name},
			success: function(result){
				$(".answer").html(result);
				$(".answer").css("background-color","yellow");
			},
			error: function(){
				$(".answer").html("ERROR!!!");
				$("section").css("color","red");
			},
		});
		$('.answer').fadeIn("slow");
	});


	$("#btnSearch").click(function (){

		var search = document.getElementById("txtSearch").value;
		var searchType = "track";
		$.ajax({
			url: "https://api.spotify.com/v1/search",			
			data: {q: search, type: searchType},
			success: function(result){
				console.log(result);
				if(result){
					$('.answerSongs').fadeIn("slow");
	                var len = result.tracks.items.length;
	                if(len > 0){	                   
	                    for(var i=0;i<len;i++){
	                        $("#albums").append("<li> Track Name: "+result.tracks.items[i].name+"</br> Artist: "+result.tracks.items[i].artists[0].name+"</br>Duration: "+result.tracks.items[i].duration_ms+"</li>");
	                    }
	                }
            	}
			},
			error: function(){
				$(".answer").html("ERROR!!!");
				$("section").css("color","red");
			},

		});

	});

	
});

/* ALBUMS
if(result){
					$('.answerSongs').fadeIn("slow");
	                var len = result.albums.items.length;
	                if(len > 0){	                   
	                    for(var i=0;i<len;i++){
	                        $("#albums").append("<li>"+result.albums.items[i].name+"</li>");
	                    }
	                }
            	}

*/