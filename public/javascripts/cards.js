var english = '';
var german = '';
var currentVoc= '';
var vocs = [];
var count = 0; 

// DOM 
$(document).ready(function() {

	 createCard();
	 
    $('#flipbox').on('click', flipit);
    $('#nextButton').on('click', nextCard);
    
  
   

});

//FUNCTIONS
function nextCard(){
	//get next from the list created in createCard and assigns german and english variable new
	count += 1;
	var tableText = vocs[count].english;
    english= vocs[count].english;
    german = vocs[count].german;
    currentVoc=1;

    // The new content is added to the flipbox/flashcard
$('#flipbox').text(tableText);
	
	
}

//flip card
function flipit(){
    if(currentVoc==1){
    	$("#flipbox").flip({
    		direction:'tb',
    		content: german,
    		color: 'lightblue',
    		speed: 100

    	})
    	currentVoc=0;
	}
    else if(currentVoc==0){
    	$("#flipbox").flip({
    		direction:'tb',
    		content: english,
    		color: 'lightgrey',
    		speed: 100

    	})
    	currentVoc=1;
    }
    	
    
}


//Fill flashcard with data
function createCard() {

    // AJAX jQuery Call to JSON
    $.getJSON( '/tutorial/cards/getvocs', function( item ) {  
      vocs=item;
       
        	var tableText = item[0].english;
            english= item[0].english;
            german = item[0].german;
            currentVoc=1;

            // The new content is added to the flipbox/flashcard
        $('#flipbox').text(tableText);
        
    });
    


};