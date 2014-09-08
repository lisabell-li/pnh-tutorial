var english = '';
var german = '';
var currentVoc= '';
var vocs = [];
var count = 0; 
var direction=0;
var vocNum = 0;

// DOM 
$(document).ready(function() {

	 createCardEnglish();
	$('#englishRadio').on('click', createCardEnglish);
	$('#germanRadio').on('click', createCardGerman);
	 $('#icon').on('click', flipit);
    $('#flipbox').on('click', flipit);
    $('#nextButton').on('click', nextCard);
    $(".tooltip-examples a").tooltip({
        placement : 'top'
    });
  
   

});

//FUNCTIONS
function nextCard(){
	//get next from the list created in createCard and assigns german and english variable new
	count += 1;
	
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
	
    // AJAX jQuery Call to JSON
    $.getJSON( '/tutorial/cards/getvocs', function( item ) {  
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
	direction = 1;
	count =0;
    // AJAX jQuery Call to JSON
    $.getJSON( '/tutorial/cards/getvocs', function( item ) {  
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