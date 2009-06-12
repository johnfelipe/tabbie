$(document).ready(function() {
	
	function displaystriketable(xml){
		$('#striketable').html("<tr><th>Team/University</th></tr>");
		$('strike',xml).each(function() {
			univ_name=$(this).find("univ_name").text();
			univ_code=$(this).find("team_code").text();
			strike_id=$(this).find("strike_id").text();
			$('#striketable').append("<tr><td>"+univ_name+" "+univ_code+"</td><td id="+strike_id+" class='remove'>Delete</td</tr>");
		});
	};
	
	function failuremsg(text){
		$('failure').html(text);
	}
	
	$("#addstrike").click(function(){
	 	$.ajax({
			url: "controller/input/strike.php",
			data: {
				adjud_id: $("#adjud_id").val(),
				univ_id: $("#add_univ_id").val(),
				team_code: $("#add_team_code").val(),
				action: "ADD",
			}, 
			type: 'POST',
			success: displaystriketable,
			failure: failuremsg,
		});
	});
	
	$.post("controller/input/strike.php",{adjud_id: $("#adjud_id").val()}, displaystriketable);
	$('.remove').live("click", (function(){
	 	$.post("controller/input/strike.php",
			{
				adjud_id: $("#adjud_id").val(),
				strike_id: $(this).attr("id"),
				action: "DELETE",
			},
			displaystriketable
		);
	}));
	
});


