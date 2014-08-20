var english = '';
var german = '';
var currentVoc= '';
var vocs = [];
var count = 0; 
// DOM 
$(document).ready(function() {

	 createText();
	 
    $('#SubmitVoc').on('click', checkit);
    $('#nextButton').on('click', nextVoc);
    
   

});

function nextVoc(){
	//increase the voc count and get the next voc from the array vocs
	count += 1;
	var tableText = vocs[count].english;
    english= vocs[count].english;
    german = vocs[count].german;
 
//chenge the voc
$('#english').text(tableText);
	
	
}

//check whether the entered voc is correct or not
function checkit(){
	var letter=document.getElementById('germanTr').value;
   if(letter !== "") {
	if(letter.toLowerCase()==german.toLowerCase()){
    	alert("Correct. Congratulations\n\n"+"english: "+ english +"\n\ngerman: "+german+"\n\nNext one?");	
    	nextVoc();
	}
    else {
    	alert("I'm sorry. But your answer is wrong");	
    	
    }
	
    	
    
}
  
   else{
	   alert("Please enter something");	  
   }
   var elem = document.getElementById("germanTr");
	elem.value = "";
}

//Fill table with data
function createText() {

   

    // AJAX jQuery Call to JSON
    $.getJSON( '/tutorial/cards/getvocs', function( item ) {  
      vocs=item;
        // For each item in our getJSON a row is added and cells to tableText
       
        	var tableText = item[0].english;
            english= item[0].english;
            german = item[0].german;
            currentVoc=1;
      

        // The entire content, created with the data from db is added to HTML-table
        $('#english').text(tableText);
        
    });
    


};