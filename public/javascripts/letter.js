var varFeel ='';
var letterDext='';
var feelingData = [];
var counter = 0;


// DOM 
$(document).ready(function() {
	
	userName = prompt("Please enter your name:", "");
	var currUser = getCookieName("username");
    if (currUser == userName) {
        //alert("Welcome back " + user);
        start();
    } else if (userName != "" && userName != null) {
            setTheCookie("username", userName, 365);
            setTheCookie("letter", "", 365);
            start();
        }
    else{
    	history.back();
    }
       
    
	
}); 

//FUNCTIONS to be started at page load
function start(){
	
    fillTable();
    
    createLetter();

    $('#vocTable #feeltz').on('click', 'td a.linkChangeFeelNext', changeFeelNext);
    $('#vocTable #feeltz').on('click', 'td a.linkChangeFeelPrev', changeFeelPrev);
    $('#vocTable ').on('click', 'td a.addToLetter', addToLetter);
    $('#letter').on('click', 'td a.deleteFromLetter', deleteSentenceFromLetter);
    $('#deleteall').on('click',  deleteAllSentenceFromLetter);
  

}


//FUNCTIONS
function setTheCookie(cookieName, cookieValue, exDate) {
    var date = new Date();
    date.setTime(date.getTime() + (exDate*24*60*60*1000));
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




// Fill Sentence table on the right side with data
function fillTable() {

    // empty String
    var tableText = '';

    // AJAX jQuery Call to JSON
    $.getJSON( '/tutorial/lettercreation/vocGreet', function( item ) {  

        // For each item in our getJSON a row is added and cells to tableText
        $.each(item, function(){
        	tableText += '<tr>';
        	tableText += '<td class="voc">' + this.english+ '</td>';
        	tableText += '<td class="voc">' + this.german + '</td>';
        	tableText += '<td class="delete"><a href="#" class="addToLetter" rel="' + this.german + '">Add</a></td>';
        	tableText += '</tr>';
       
        	
        });

        // The entire content, created with the data from db is added to HTML-table
        $('#greet').html(tableText);
        
    });
    // empty String
    var tableText2 = '';
  

$.getJSON( '/tutorial/lettercreation/vocFeeling ', function( item ) {
	feelingData = item;
	// For each item in our getJSON a row is added and cells to tableText2
    $.each(item, function(){
    	
    	tableText2 += '<tr>';
    	tableText2 += '<td class="voc">' + this.english+ '&nbsp'+' <FONT style="BACKGROUND-COLOR: yellow"><u>' +this.VEOne+'</u></FONT>'+'</td>';
    	tableText2 += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + this.german + '<FONT style="BACKGROUND-COLOR: yellow"><u>'+ this.VGOne +'</u></FONT>'+ this.point + '</td>';
    	tableText2 += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + this.english + '" title="Prev">Prev</a></td>';
    	tableText2 += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + this.english + '" title="Next">Next</a></td>';
    	tableText2 += '<td class="delete"><a href="#" class="addToLetter" rel="' + this.german + this.VGOne + this.point + '">Add</a></td>';
    	tableText2 += '</tr>';

    });

    // The entire content, created with the data from db is added to HTML-table
    $('#fee1').html(tableText2);
   
});

};

//change word in sentence NEXT
function changeFeelNext() {

    //get english word from rel attribute of the link
    var englishWord = $(this).attr('rel');

    // Get Index of word based on rel attribute
    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem.english; }).indexOf(englishWord);

    // Get the object
    var thisUserObject = feelingData[arrayPosition];
    if (counter < thisUserObject.counter-1){ 
    counter += 1;
    }
    var varFeeli ='';
    var varEnglish ='';
    var varGerman ='';
    
  //set german and english word
  switch(counter){
    case 1:
    	varGerman = thisUserObject.VGTwo;
    	varEnglish = thisUserObject.VETwo;
      break;
     case 2:
    	 varGerman = thisUserObject.VGThree;
    	 varEnglish = thisUserObject.VEThree;
       break;
      case 3:
    	  varGerman = thisUserObject.VGFour;
    	  varEnglish = thisUserObject.VEFour;
       break;
}

  varFeeli += '<td class="voc">' + thisUserObject.english+ '&nbsp'+' <FONT style="BACKGROUND-COLOR: yellow">' +'<u>'+varEnglish+ '</u>'+ '</td>';
  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + thisUserObject.german +'<FONT style="BACKGROUND-COLOR: yellow">'+'<u>'+ varGerman+ '</u>'+ thisUserObject.point + '</td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + thisUserObject.english + '" title="Prev">Prev</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + thisUserObject.english + '" title="Next">Next</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="addToLetter" rel="' + thisUserObject.german + varGerman + thisUserObject.point + '">Add</a></td>';

    //change the html of the relating row
    $(this).parent().parent().html(varFeeli);

};

//change word in sentence PREV
function changeFeelPrev() {

	//get english word from rel attribute of the link
    var englishWord = $(this).attr('rel');

    // Get Index of object based on rel attribute
    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem.english; }).indexOf(englishWord);

    // Get the object
    var thisUserObject = feelingData[arrayPosition];
    var varEnglish ='';
    if (counter > 0){ 
        counter -= 1;
        }
    var varFeeli ='';
    var varEnglish ='';
    var varGerman ='';
    
  //set german and english word
  switch(counter){
    case 0:
    	varGerman = thisUserObject.VGOne;
	    varEnglish = thisUserObject.VEOne;
    break;
    case 1:
    	varGerman = thisUserObject.VGTwo;
	    varEnglish = thisUserObject.VETwo;
      break;
     case 2:
    	 varGerman = thisUserObject.VGThree;
 	   varEnglish = thisUserObject.VEThree;
       break;
      case 3:
    	 varGerman = thisUserObject.VGFour;
	    varEnglish = thisUserObject.VEFour;
       break;
}
  
  varFeeli += '<td class="voc">' + thisUserObject.english+ '&nbsp'+'<FONT style="BACKGROUND-COLOR: yellow">'+'<u>'+varEnglish+'</u>'+ '</td>';
  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + thisUserObject.german +'<FONT style="BACKGROUND-COLOR: yellow">'+'<u>'+ varGerman+'</u>' + thisUserObject.point + '</td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + thisUserObject.english + '" title="Prev">Prev</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + thisUserObject.english + '" title="Next">Next</a></td>';
  varFeeli += '<td class="delete"><a href="#" class="addToLetter" rel="' + thisUserObject.german + varGerman + thisUserObject.point + '">Add</a></td>';

   //change the html of the relating row 
    $(this).parent().parent().html(varFeeli); 

};


//Fill letter with sentences (from cookie)
function createLetter() {
	
	var currCookie= getCookieName("letter");
	var sentences = currCookie.split("+");
    var letterText="";
	
	if(sentences==""){
		letterText += "Create your one letter by adding sentences from the right."
        document.getElementById("deleteall").style.visibility="hidden";
		
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
	   setTheCookie("letter", currCookie, 365);
	   createLetter();
	  
   
};


//Delete sentence from Letter= delete sentence from cookie letter
function deleteSentenceFromLetter() {

  
    var confirmation = confirm('Are you sure you want to delete this sentence from your letter?');
    
    if (confirmation == true) {
    var sentenceToDelete =	$(this).attr('rel')+"+";
    var currCookie= getCookieName("letter");
    var newCookie = currCookie.replace(sentenceToDelete,"");
    setTheCookie("letter", newCookie, 365);
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
        setTheCookie("letter", currCookie, 365);
        createLetter();
        }
        else {

        	//no confirmation = do nothing
            return false;
        }
};

