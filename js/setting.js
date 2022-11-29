$(document).ready(function(){
	if($(".count.blocks").length){
		$('.count.blocks').each(function(){
			var userscounter = 0;
			$(this).parent('div').next('div').find('div.row').each(function(){

				$(this).find('> div').each(function(){
					userscounter++
				});
			})
			if ( userscounter > 1){
				$(this).text(userscounter + ' Representatives');
			}
			else{
				$(this).text(userscounter + ' Representative');
			}
		})
	}
	
	if($("#select-country").length){
		$select_country = $('#select-country').selectize({
			valueField: 'name',
			labelField: 'name',
			searchField: ['name']
		});
		var select_country, $select_country
		select_country  = $select_country[0].selectize;
	}
	
	
	//Animate scroll
	if($(".wow").length){
		new WOW().init();
	}

	//Placeholder
	$("input, textarea").placeholder();

	//Activ nav
	$("#nav li a").each(function(){
		var location = window.location.href;
		var link = this.href;
		if(location == link){
			$(this).addClass("active");
		}
	});
	
	//Setting calculator
	percent 	= [3, 		3.5];
	period	 	= [70, 		70];
	minMoney 	= [1, 	2500];
	maxMoney 	= [2500, 	100000];
	$("#money1").val(minMoney[0]);
	$("#money2").val(minMoney[1]);
	
	//Calculator
	function calc(obj){
		money = parseFloat($(obj).val());
		type = $(obj).data("calc");
		if(type == 1) {
			id = $(obj).data("id") - 1;
		} else {
			id = $("input[name=h_id]:checked").data("id") - 1;
		}
		if(money > maxMoney[id]){
			money = maxMoney[id];
			$(obj).val(money);
		}
		if(id == 1){
			summa = money  / 100 * percent[id] * period[id];
		} else {
			summa = money / 100 * percent[id] * period[id];
		}
		summa = summa.toFixed(0);
		
		if(money < minMoney[id] || isNaN(money) == true){
			if(type == 1){
				$(obj).parent().parent().find(".profit").text("Error!");
			} else {
				$("#profit").text("Error!")
			}
		} else {
			if(type == 1){
				$(obj).parent().parent().find(".profit").text(summa + " USD");
			} else {
				$("#selected").text($(".plans .box:eq(" + id + ") .percent").text() + " " + $(".plans .box:eq(" + id + ") .txt").text());
				$("#percent").text($(".plans .box:eq(" + id + ") .total_p").text());
				$("#profit").text("" + summa);
			}
		}
	}
	function minSum(id){
		money = parseFloat($(".money").val());
		if(money < minMoney[id] || isNaN(money) == true){
			$(".money").val(minMoney[id]);
		}
	}
	
	if($("#money1, #money2").length){
		calc("#money1");
		calc("#money2");
	}
	if($("#money").length){
		calc("#money");
	}
	$(".money").keyup(function(){
		calc($(this));
	});
	
	
	//Radio plan
	$(".plans input").change(function(){
		$(".plans .box").removeClass("active");
		var id = $(this).data("id");
		$(this).parent(".box").addClass("active");
		
		id = $(this).data("id") - 1;
		minSum(id);
		calc("#money");
	});
	
	//Gallery
	if($(".gallery").length){
		$(".gallery").click(function(){
			$("body").css({ height: "auto" });
		});
		$(".gallery").fancybox({
			helpers		: {
				title	: { type : 'inside' },
				buttons	: {}
			}
		});
	}
	
	//Accordion faq
	if($(".faq").length){
		$(".faq").accordion({
			collapsible: true,
			heightStyle: "content"
		});
	}
	
	//Accordion
	if($(".accordion").length){
		$(".accordion").accordion({
			collapsible: true,
			heightStyle: "content",
			active: false
		});
	}
	
	//Select
	if($(".select").length){
		$(".select select").each(function (i) {
			var SelectText = $(this).find("option:selected").text();
			$(this).parent().find(".int").text(SelectText);
		});
		$(".select .int").show();
		$(".select select").css({ opacity: 0 });
		$(".select select").change(function(){
			var SelectText = $(this).find("option:selected").text();
			$(this).parent().find(".int").text(SelectText);
		});
	}

	//Checkbox
	if($(".checkbox").length){
		$(".checkbox input").css({ opacity: 0 });
		$(".checkbox input").change(function(){
			if($(this).prop("checked") == true) {
				$(this).parent(".checkbox").addClass("check_act");
			} else {
				$(this).parent(".checkbox").removeClass("check_act");
			}
		});
		$('.checkbox input[type="checkbox"]:checked').parent(".checkbox").addClass("check_act");
	}

	//Radio
	if($(".radio").length){
		$(".radio input").css({ opacity: 0 });
		$(".radio input").change(function(){
			name = $(this).attr("name");
			$('input[name="' + name + '"]').parent(".radio").removeClass("radio_act");
			$(this).parent(".radio").addClass("radio_act");
		});
		$('.radio input[type="radio"]:checked').parent(".radio").addClass("radio_act");
	}
	
	//Tabs
	$(".tabs div").click(function(){
		id = $(this).index();
		$(".tabs div").removeClass("active");
		$(this).addClass("active");
		$("#tabs .box").removeClass("active");
		$("#tabs .box").eq(id).addClass("active");
	});
	
	if($(".other").length){
		$(".deposit-process").addClass("btn").css({ lineHeight: "50px", marginTop: "15px" });
		$(".deposit-cancel").addClass("btn btn_orange").css({ lineHeight: "50px", marginTop: "15px" });
	}
	
	//function send form
	function send_form(){
		$.ajax({
			type: "POST",
			async: false,
			url: "mail.php",
			data: $(".form_v").serializeArray(),
			success: function(html) {
				$(".result").html(html);
				$(".form_v").trigger("reset");
			}
		});
	}
	function send_form2(){
		$.ajax({
			type: "POST",
			async: false,
			url: "mail2.php",
			data: $(".form_v2").serializeArray(),
			success: function(html) {
				$(".result").html(html);
				$(".form_v").trigger("reset");
			}
		});
	}
	
	//Form
	if($(".form_v").length){
		$(".form_v").validate({
			rules:{
				name: { required: true, },
				username: { required: true },
				city: { required: true },
				country: { required: true },
				languages: { required: true },
				email: { required: true, email: true }
			},
			messages:{
				name: { required: '' },
				username: { required: '' },
				city: { required: '' },
				country: { required: '' },
				languages: { required: '' },
				email: { required: '', email: '' }
			},
			submitHandler: function(){
				send_form();
			}
		});
	}
	if($(".form_v2").length){
		$(".form_v2").validate({
			rules:{
				name: { required: true, },
				username: { required: true },
				city: { required: true },
				country: { required: true },
				languages: { required: true },
				email: { required: true, email: true }
			},
			messages:{
				name: { required: '' },
				username: { required: '' },
				city: { required: '' },
				country: { required: '' },
				languages: { required: '' },
				email: { required: '', email: '' }
			},
			submitHandler: function(){
				send_form2();
			}
		});
	}
});