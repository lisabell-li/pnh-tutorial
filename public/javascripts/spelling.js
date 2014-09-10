var english = '';
var german = '';
var currentVoc= '';
var vocs = [];
var vocNum = 0;
var count = 0; 
var direction =0;
var data =0;
// DOM 
$(document).ready(function() {

	createTextEnglish();

	 
	$('#englishRadio').on('click', createTextEnglish);
    $('#germanRadio').on('click', createTextGerman);
    $('#SubmitVoc').on('click', checkit);
    $('#nextButton').on('click', nextVoc);
    $('#solveButton').on('click', solve);
   

});

function nextVoc(){
	//increase the voc count and get the next voc from the array vocs
	count += 1;
	 if(direction==0){
		 var tableText = vocs[count].english;
	   }
	   else{
		   var tableText = vocs[count].german;
	   }
	
    english= vocs[count].english;
    german = vocs[count].german;
 
//change the voc
 $('#english').text(tableText);
 var elem = document.getElementById("germanTr");
 elem.value = "";

 var prozent = (100/vocNum)*count;	
 $("#progressNum").text(count+ " / "+vocNum+" words");
 $(".bar").css("width",prozent+ "%");
	
	
}

//check whether the entered voc is correct or not
function checkit(){
	var transl;
   if(direction==0){
	   transl = german.toLowerCase();
   }
   else{
	   transl = english.toLowerCase();
   }
   var letter=document.getElementById('germanTr').value;
   if(letter !== "") {
	if(letter.toLowerCase()==transl){
    	alert("Correct. Congratulations\n\n"+"english: "+ english +"\n\ngerman: "+german+"\n\nNext one?");	
    	nextVoc();
	}
    else {
    	alert("I'm sorry. But your answer is wrong"+letter+"+"+transl);	
	
    }

}
   else{
	   alert("Please enter something");	  
   }
   var elem = document.getElementById("germanTr");
	elem.value = "";
}

//Fill table with data german-> english
function createTextGerman() {
	var elem = document.getElementById("germanTr");
	elem.value = "";
	
    direction = 1;
    count = 0; 
    
    var url =document.URL;
	var split = url.split('?');
	var id =split[1];
	data= "/tutorial/cards/getvocs/"+id;
    // AJAX jQuery Call to JSON
    $.getJSON( data, function( item ) {  
     vocs=item;
     vocNum = vocs.length;
  	 var prozent = (100/vocNum)*count;
  	
     $("#progressNum").text(count+ " / "+vocNum+" words");
  	 $(".bar").css("width",prozent+ "%");
        // For each item in our getJSON a row is added and cells to tableText
       
        	var tableText = item[0].german;
            english= item[0].english;
            german = item[0].german;
            currentVoc=1;
      

        // The entire content, created with the data from db is added to HTML-table
        $('#english').text(tableText);
        
    });
    



};



//Fill table with data english -> german
function createTextEnglish() {
	var elem = document.getElementById("germanTr");
	elem.value = "";
	count = 0; 
	direction = 0;
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
        // For each item in our getJSON a row is added and cells to tableText
       
        	var tableText = item[0].english;
            english= item[0].english;
            german = item[0].german;
            currentVoc=1;
      

        // The entire content, created with the data from db is added to HTML-table
        $('#english').text(tableText);
        
    });
    
  


};


//solve
function solve() {
	var solved="";
	 if(direction==0){
		 solved = german;
	   }
	   else{
		   solved = english;
	   }
	
	var elem = document.getElementById("germanTr");
	elem.value = solved;

};