var varFeel ='';
var letterDext='';
var feelingData = [];
var counter = 1;
var coCa =0;
var data=0;


// DOM 
$(document).ready(function() {
	
	getURL();
    hideCats();
    createLetter();
    $('#catButton').on('click', showCats);
    $('#vocTable #feeltz').on('click', 'td a.linkChangeFeelNext', changeFeelNext);
    $('#vocTable #feeltz').on('click', 'td a.linkChangeFeelPrev', changeFeelPrev);
    $('#vocTable ').on('click', 'td a.addToLetter', addToLetter);
    $('#letter').on('click', 'td a.deleteFromLetter', deleteSentenceFromLetter);
    $('#deleteall').on('click',  deleteAllSentenceFromLetter);
  

}); 

/* with thank to the tutorial http://www.w3schools.com/js/js_cookies.asp */

//COOKIE FUNCTIONS: A big thanks to the tutorial http://www.w3schools.com/js/js_cookies.asp
function setTheCookie(cookieName, cookieValue) {
    var date = new Date();
    date.setTime(date.getTime() + (172800000));//aktuelles Datum + 2Tage
    var expiry = "expires="+date.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expiry;
}

function getCookieName(cookieName) {
    var name = cookieName + "=";
    var cookieString = document.cookie.split(';');
    for(var i=0; i<cookieString.length; i++) {
        var cooki = cookieString[i];
        while (cooki.charAt(0)==' ') cooki = cooki.substring(1);
        if (cooki.indexOf(name) != -1) return cooki.substring(name.length, cooki.length);
    }
    return "";
}



function fillTableGreet() {
// empty String
var tableText = '';
var url =document.URL;
var split = url.split('?');
var id =split[1];
data= "/tutorial/lettercreation/vocs/"+id;
// AJAX jQuery Call to JSON
$.getJSON( data, function( item ) {  

    // For each item in our getJSON a row is added and cells to tableText
    $.each(item, function(){
    	tableText += '<tr>';
    	tableText += '<td class="voc">' + this.english+ '</td>';
    	tableText += '<td class="voc">' + this.german + '</td>';
    	tableText += '<td class="delete"><a href="#" class="addToLetter" rel="' + this.german + '">Add</a></td>';
    	tableText += '</tr>';
   
    	
    });

    // The entire content, created with the data from db is added to HTML-table
    $('#fee1').html(tableText);
    
});
};

// Fill Sentence table on the right side with data
function fillTable() {

	var tableText2 = '';
	
$.getJSON( data, function( item ) {
	feelingData = item;
	// For each item in our getJSON a row is added and cells to tableText2
    $.each(item, function(){
    	var relattr = this.englishSentence+"+"+ 0;
    	var german =  this.germanWords[0];
    	var english =  this.englishWords[0];
    	tableText2 += '<tr>';
    	tableText2 += '<td class="voc">' + this.englishSentence+ '<FONT style="BACKGROUND-COLOR: yellow">' +english+'</FONT>'+this.englishSentence2+ "."+'</td>';
    	tableText2 += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + this.germanSentence + '<FONT style="BACKGROUND-COLOR: yellow">'+ german+'</FONT>'+ this.germanSentence2+"." + '</td>';
    	tableText2 += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + relattr + '" title="Prev">Prev</a></td>';
    	tableText2 += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + relattr + '" title="Next">Next</a></td>';
    	tableText2 += '<td class="delete"><a href="#" class="addToLetter" rel="' + this.germanSentence + german + "." + '">Add</a></td>';
    	tableText2 += '</tr>';

    });

    // The entire content, created with the data from db is added to HTML-table
    $('#fee1').html(tableText2);
   
});

};

//change word in sentence NEXT
function changeFeelNext() {

    //get english word from rel attribute of the link
    var attrWhole = $(this).attr('rel');
    var attr = attrWhole.split('+');
    var englishWord = attr[0];
    var counti = attr[1]; 
    var count =1+ parseInt(counti);
    // Get Index of word based on rel attribute
    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem.englishSentence; }).indexOf(englishWord);
    
    var currentVoc = feelingData[arrayPosition];
    // Get the object
    var varFeeli ='';
    
    //set german and english word
    var laenge = currentVoc.germanWords.length;
    
    if(count>laenge-1){
    	count =laenge-1;
    	var varGerman = currentVoc.germanWords[laenge-1];
        var varEnglish = currentVoc.englishWords[laenge-1];
    }
    else{
        var varGerman = currentVoc.germanWords[count];
        var varEnglish = currentVoc.englishWords[count];	
    }
   
    


  varFeeli += '<td class="voc">' + currentVoc.englishSentence+  '<FONT style="BACKGROUND-COLOR: yellow">' +varEnglish+ currentVoc.englishSentence2+ "." +  '</td>';
  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + currentVoc.germanSentence +'<FONT style="BACKGROUND-COLOR: yellow">'+'<u>'+ varGerman+ '</u>' + currentVoc.germanSentence2+"."+ '</td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + currentVoc.englishSentence +"+"+ count + '" title="Prev">Prev</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + currentVoc.englishSentence +"+"+ count + '" title="Next">Next</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="addToLetter" rel="' + currentVoc.germanSentence + varGerman  + '">Add</a></td>';

    //change the html of the relating row
    $(this).parent().parent().html(varFeeli);

};

//change word in sentence PREV
function changeFeelPrev() {

	//get english word from rel attribute of the link
	 var attrWhole = $(this).attr('rel');
	    var attr = attrWhole.split('+');
	    var englishWord = attr[0];
	    var counti = attr[1]; 
	    var count = parseInt(counti)-1;
	    // Get Index of word based on rel attribute
	    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem.englishSentence; }).indexOf(englishWord);
	    
	    var currentVoc = feelingData[arrayPosition];
	    // Get the object
	    var varFeeli ='';
	    
	    //set german and english word
	    var laenge = currentVoc.germanWords.length;
	    
	    if(count<0){
	    	count =0;
	    	var varGerman = currentVoc.germanWords[0];
	        var varEnglish = currentVoc.englishWords[0];
	    }
	    else{
	        var varGerman = currentVoc.germanWords[count];
	        var varEnglish = currentVoc.englishWords[count];	
	    }
	   
	    


	  varFeeli += '<td class="voc">' + currentVoc.englishSentence+ '<FONT style="BACKGROUND-COLOR: yellow">' +varEnglish+ currentVoc.englishSentence2+"." +'</td>';
	  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + currentVoc.germanSentence +'<FONT style="BACKGROUND-COLOR: yellow">'+ varGerman+ currentVoc.germanSentence2+"." + '</td>';
	  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + currentVoc.englishSentence +"+"+ count + '" title="Prev">Prev</a></td>';
	  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + currentVoc.englishSentence +"+"+ count + '" title="Next">Next</a></td>';
	  varFeeli += '<td class="delete"><a href="#" class="addToLetter" rel="' + currentVoc.germanSentence + varGerman  + '">Add</a></td>';

   //change the html of the relating row 
    $(this).parent().parent().html(varFeeli); 

};


//Fill letter with sentences (from cookie)
function createLetter() {
	var currCookie= getCookieName("letter");//returns cookie or ""
	var sentences = currCookie.split("+");
    var letterText="";
	
	if(sentences==""){
		letterText += "Create your one letter by adding sentences from the right."	
		
	}
	else{
	for (var i = 0; i < sentences.length-1; i++) {
		document.getElementById("deleteall").style.visibility="visible";		
		
		letterText += '<tr>';
    	letterText += '<td>'+'<strong>' + sentences[i] + '</strong>'+'</td>';
    	letterText += '<td class="delete"><a href="#" class="deleteFromLetter" rel="' +  sentences[i] + '">delete</a></td>';
    	letterText += '</tr>';
	
	}
	}

  
        // The entire content stored in the cookie letter is added to HTML-table
        $('#letter table tbody').html(letterText);


};


//add sentece to letter = add sentence to cookie letter
function addToLetter() {
	

	   var sentencetoAdd= $(this).attr('rel');
	   var currCookie= getCookieName("letter");
	   currCookie+=sentencetoAdd+'+';
	   setTheCookie("letter", currCookie);
	   createLetter();
	  
   
};


//Delete sentence from Letter= delete sentence from cookie letter
function deleteSentenceFromLetter() {

  
    var confirmation = confirm('Are you sure you want to delete this sentence from your letter?');
    
    if (confirmation == true) {
    var sentenceToDelete =	$(this).attr('rel')+"+";
    var currCookie= getCookieName("letter");
    var newCookie = currCookie.replace(sentenceToDelete,"");
    setTheCookie("letter", newCookie);
    createLetter();
    }
    else {
        // no confirmation = do nothing
        return false;
  }
};


//delete all sentence from the letter = set cookie letter to ""
function deleteAllSentenceFromLetter() {
    var confirmation = confirm('Are you sure you want to delete all sentences from your letter?');
    if (confirmation == true) {    	
        var	currCookie='';
        setTheCookie("letter", currCookie);
        createLetter();
        }
        else {

        	//no confirmation = do nothing
            return false;
        }
};


//show cats
function showCats() {
	if(coCa==1){
		document.getElementById("Cattable").style.display="none";
		coCa=0;
	}
	else if(coCa==0){
	document.getElementById("Cattable").style.display="inline";
	coCa =1;
	}
};


//show cats
function hideCats() {
	document.getElementById("Cattable").style.display="none";
};



function getURL() {	
	
	var url =document.URL;
	var split = url.split('?');
	var id =split[1];
	data= "/tutorial/lettercreation/vocs/"+id;
	
	if(id=="vocGreet"){
	fillTableGreet();	
	}
	else{
	fillTable();
	}
};

