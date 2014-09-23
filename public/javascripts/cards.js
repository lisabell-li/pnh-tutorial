var english = '';
var german = '';
var currentVoc= '';
var vocs = [];
var count = 0; 
var direction=0;
var vocNum = 0;
var data= "";

// DOM 
$(document).ready(function() {

	createCardEnglish();
	$('#englishRadio').on('click', createCardEnglish);
	$('#germanRadio').on('click', createCardGerman);
	$('#icon').on('click', flipit);
    $('#flipbox').on('click', flipit);
    $('#nextButton').on('click', nextCard);
   
   

});


//FUNCTIONS

function nextCard(){
	//get next from the list created in createCard and assigns german and english variable new
	count += 1;
	if(count<vocs.length){
	var transl;
	   if(direction==0){
		   transl = vocs[count].english;
	   }
	   else{
		   transl = vocs[count].german;
	   }
	var tableText = transl;
    english= vocs[count].english;
    german = vocs[count].german;

    $("#flipbox").css("background-color","lightgrey");
    currentVoc=1;
    $('#flipbox').text(tableText);
 	var prozent = (100/vocNum)*count;   	
    $("#progressNum").text(count+ " / "+vocNum+" words");
    $(".bar").css("width",prozent+ "%");
	}
	else{
		$(".bar").css("width",100+ "%");
		$("#progressNum").text(vocNum+ " / "+vocNum+" words");
		window.setInterval(function(){window.location.href = "/tutorial/spellingvoc/end"},2000);
		
	}
	
	
}


//With thanks to the creators of the Flip! Plugin
//flip card
function flipit(){
	var contentFlippi;
	var contentFlippiBack;
	  if(direction==0){
		  contentFlippi = english;
	     contentFlippiBack=german;
	   }
	   else{
		   contentFlippi=german;
		   contentFlippiBack=english;
	   }
    if(currentVoc==1){
    	$("#flipbox").flip({
    		direction:'tb',
    		content: contentFlippiBack,
    		color: 'lightblue',
    		speed: 100

    	})
    	currentVoc=0;
	}
    else if(currentVoc==0){
    	$("#flipbox").flip({
    		direction:'tb',
    		content: contentFlippi,
    		color: 'lightgrey',
    		speed: 100

    	})
    	currentVoc=1;
    }
    	
    
}


//Fill flashcard with data English
function createCardEnglish() {
	direction = 0;
	count =0;
	$('#check').html("<div style='margin-top: -30px; font-weight: bold; color: #0099CC; font-size: 18px;'><img src='/images/arrow.png' , alt='flip card',  width='100', height='100'></img>Click on the card to see the german word</div>");

	var url =document.URL;
	var split = url.split('?');
	var id =split[1];
	data= "/tutorial/cards/getvocs/"+id;
	 // AJAX jQuery Call to JSON
    $.getJSON( data , function( item ) { 
	 
      vocs=item;
      vocNum = vocs.length;
   	  var prozent = (100/vocNum)*count;   	
      $("#progressNum").text(count+ " / "+vocNum+" words");
   	  $(".bar").css("width",prozent+ "%");
   	  
        	var tableText = item[0].english;
            english= item[0].english;
            german = item[0].german;
            currentVoc=0;
            flipit();
            count=0;

         // The new content is added to the flipbox/flashcard
        $('#flipbox').text(tableText);
        
    });
    


};

//Fill flashcard with data German
function createCardGerman() {
	$('#check').html("<div style='margin-top: -30px; font-weight: bold; color: #0099CC; font-size: 18px;'><img src='/images/arrow.png' , alt='flip card',  width='100', height='100'></img>Click on the card to see the english word</div>")
	direction = 1;
	count =0;	
	var url =document.URL;
	var split = url.split('?');
	var id =split[1];
	data= "/tutorial/cards/getvocs/"+id;
	 // AJAX jQuery Call to JSON
    $.getJSON( data , function( item ) { 
      vocs=item;
      vocNum = vocs.length;
   	  var prozent = (100/vocNum)*count;   	
      $("#progressNum").text(count+ " / "+vocNum+" words");
   	  $(".bar").css("width",prozent+ "%");
   	  
        	var tableText = item[0].german;
            english= item[0].english;
            german = item[0].german;
            currentVoc=0;
            flipit();
            count=0;

            // The new content is added to the flipbox/flashcard
        $('#flipbox').text(tableText);
        
    });
    


};