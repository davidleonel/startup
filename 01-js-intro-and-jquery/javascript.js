$(document).ready(function() {
	
	$("#txtName").focus();

	$("#btnName").click(function (){
		/*
		$(".answer").load("http://bootcamp.aws.af.cm/welcome/David", function (responseText, textStatus, req) {

			if (textStatus == "error"){
				$(".hidden").css("color","red");
	        	return "ERROR!!";
			}

		});
		*/
		var name = document.getElementById("txtName").value;

		$.ajax({
			url: "http://bootcamp.aws.af.cm/welcome/"+name,
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


	$("#btnName").click(function (){

		var search = document.getElementById("txtSearch").value;

		$.ajax({
			url: " https://api.spotify.com/v1/"+search,
			success: function(result){
				console.log(result);
			},
		});

	});



	
});
