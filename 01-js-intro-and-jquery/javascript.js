$(document).ready(function() {

	//$('.hidden').css('display','initial').fadeIn('slow');
	$('.hidden').fadeIn("slow");
	$(".alias").focus();
});

$("#button").click(function (){

	$.ajax({
		url: "http://bootcamp.aws.af.cm/welcome/David",
		success: function(result){
			$(".answer").html(result);
		},
		error: function(){
			$(".hidden").css("color","red");
		},
	});

	$(".answer").css("background-color","yellow");

	/*
	$(".answer").load("http://bootcamp.aws.af.cm/welcome/David", function (responseText, textStatus, req) {

		if (textStatus == "error"){
			$(".hidden").css("color","red");
        	return "ERROR!!";
		}

	});
	*/
});

