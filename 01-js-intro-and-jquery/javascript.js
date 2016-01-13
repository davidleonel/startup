$(document).ready(function() {

	$(".hidden").hide().fadeIn("slow");
	$(".alias").focus();
});

$("#button").click(function (){
	

	$(".answer").load("http://bootcamp.aws.af.cm/welcome/yourname.html", function (responseText, textStatus, req) {
		
		if (textStatus == "error"){
			$("section").css("color","red");
        	return "ERROR!!";
		}

	});
	
});

