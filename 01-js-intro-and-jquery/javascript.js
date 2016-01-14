$(document).ready(function() {

	//$('.hidden').css('display','initial').fadeIn('slow');
	$('.hidden').fadeIn("slow");
	$(".alias").focus();
});

$("#button").click(function (){
	

	$(".answer").load("http://bootcamp.aws.af.cm/welcome/yourname", function (responseText, textStatus, req) {

		if (textStatus == "error"){
			$(".hidden").css("color","red");
        	return "ERROR!!";
		}

	});
	
});

