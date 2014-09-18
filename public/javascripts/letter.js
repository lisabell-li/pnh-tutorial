var varFeel ='';
var letterDext='';
var feelingData = [];
var counter = 1;
var coCa =0;
var data=0;
var letterInLanguage=0;


// DOM 
$(document).ready(function() {
	
	getURL();
    hideCats();
    createLetter();
    $('#catButton').on('click', showCats);
    $('#vocTable #fee1').on('click', 'td a.linkChangeFeelNext', changeFeelNext);
    $('#vocTable #fee1').on('click', 'td a.linkChangeFeelPrev', changeFeelPrev);
    $('#vocTable ').on('click', 'td a.addToLetter', addToLetter);
    $('#letter').on('click', '.deleteFromLetter', deleteSentenceFromLetter);
    $('#deleteall').on('click',  deleteAllSentenceFromLetter);
    $('#showEnglish').on('click', switchEnglish);
 
    $(function() {
        $( "#sortable" ).sortable({    	
    		update: function(event, ui) {
    			var result = $(this).sortable('toArray');
    			var sentences="";
    			var sentences2="";
   				var currCookie= getCookieName("letterEnglish");//returns cookie or ""
   				sentences = currCookie.split("+");
   		 	    var currCookie2= getCookieName("letter");//returns cookie or ""
    	    	sentences2 = currCookie2.split("+");
    	    	//alert("result = "+result);
                var letterText="";
    		    var sentencetoAddGer= "";
      	        var sentencetoAddEng ="";
      	        var cookieEng= "";
      	        var cookieGer= "";
      	        //alert("länge cook "+sentences.length+"länge result "+result.length);
    			for (var i = 0; i < result.length; i++) {
    			  var stelle =result[i];	
    			   cookieEng += sentences[stelle]+"+";
    			   cookieGer += sentences2[stelle]+"+";
    			   //alert(sentences[0]+sentences[result.length]);
    			}
    			
    			   setTheCookie("letter", cookieGer);
    			   setTheCookie("letterEnglish", cookieEng);
    		}	
    	});;
        $( "#sortable" ).disableSelection();
      });

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
tableText += '<tr><td ><input type="text" class="form-control" placeholder="Enter your sponsor\'s name" id ="sponsorName"></td></tr>';

$.getJSON( data, function( item ) {  
	
    // For each item in our getJSON a row is added and cells to tableText
    $.each(item, function(){
    
    	tableText += '<tr>';
    	tableText += '<td class="voc">' + this.english+ '</td>';
    	tableText += '<td class="voc">' + this.german + '</td>';
    
    	tableText += '<td class="delete"><a href="#" style="color: #0099CC;" class="addToLetter" rel="' + this.german + "#"+ this.english +'">Add</a></td>';
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
    	var relattr = this._id+"+"+ 0;
    	var german =  this.germanWords[0];
    	var english =  this.englishWords[0];
    	var laenge = this.englishWords.length;
    	var prev = "";
    	var next = "";
    	var add= "";
    	 if(laenge<=0){
    	   	 varGerman =  '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + this.germanSentence + '</td>';
    		 varEnglish = '<td class="voc">' + this.englishSentence+ '</td>';
    		 prev='<td class="delete"></td>';
    		 next='<td class="delete"></td>';
    		 add='<td class="delete"><a href="#" style="color: #0099CC;" class="addToLetter" rel="' + this.germanSentence +"#"+ this.englishSentence + '">Add</a></td>';
    	   }
    	 
    	   else if(laenge>0){
    	   	varGerman = '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + this.germanSentence + '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' + german+'&nbsp' +  '</a>'+ this.germanSentence2+"." + '</td>';
    	    varEnglish = '<td class="voc">' + this.englishSentence+ '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' +  english +'&nbsp' +  '</a>' + this.englishSentence2+ "."+'</td>';    	   
    	    prev ='<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + relattr + '" title="Previous version of this sentence"><span class="ui-icon ui-icon-circle-arrow-w"></span> </a></td>';
    	    next = '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + relattr + '" title="Next version of this sentence"><span class="ui-icon ui-icon-circle-arrow-e"></span></a></td>';
    	    add ='<td class="delete" ><a href="#" style="color: #0099CC;"  class="addToLetter" rel="' + this.germanSentence + german +  this.germanSentence2+ "." +  "#"+ this.englishSentence + english +  this.englishSentence2+"." +'">Add</a></td>';
    	   }
  
    	tableText2 += '<tr>';
    	tableText2 += prev;
    	tableText2 += varEnglish;
    	
    	
    	tableText2 += varGerman;
    	tableText2 += next;
    	tableText2 += add;
    	tableText2 += '</tr>';
  
    });

    // The entire content, created with the data from db is added to HTML-table
    $('#fee1').html(tableText2);
    $('#changeSentece').html("Use the arrows to change <a style='BACKGROUND-COLOR: #0099CC; color: white;'> &nbsp words &nbsp</a> of the sentences");
   
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
    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem._id; }).indexOf(englishWord);
    
    var currentVoc = feelingData[arrayPosition];
    // Get the object
    var varFeeli ='';
    
    //set german and english word
    var laenge = currentVoc.germanWords.length;
    
    
    if(laenge<=0){
   	 var varGermanSen = "";
	 var varEnglishSen = "";	
	 var varGerman = "";
	 var varEnglish = "";	
   }
   else if((laenge>0) & (count>laenge-1)){
	count =laenge-1;
   	varGermanSen = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' +  currentVoc.germanWords[laenge-1]+'&nbsp' +  '</a>' ;
    varEnglishSen = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+ '&nbsp' + currentVoc.englishWords[laenge-1]+'&nbsp' +  '</a>' ;
    varGerman = currentVoc.germanWords[laenge-1];
	varEnglish = currentVoc.englishWords[laenge-1];	
   }
   else {
   	varGermanSen = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' +  currentVoc.germanWords[count]+ '&nbsp' + '</a>' ;
    varEnglishSen = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' +  currentVoc.englishWords[count]+ '&nbsp' + '</a>' ;
    varGerman = currentVoc.germanWords[count];
	varEnglish = currentVoc.englishWords[count];

   }
    
    
     

  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + currentVoc._id +"+"+ count + '" title="Previous version of this sentence"><span class="ui-icon ui-icon-circle-arrow-w"></span></a></td>';
  varFeeli += '<td class="voc">' + currentVoc.englishSentence +varEnglishSen+ currentVoc.englishSentence2+ "." +  '</td>';
 
  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + currentVoc.germanSentence + varGermanSen+  currentVoc.germanSentence2+"."+ '</td>';
  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + currentVoc._id +"+"+ count + '" title="Next version of this sentence"><span class="ui-icon ui-icon-circle-arrow-e"></span></a></td>';
  
  varFeeli += '<td class="delete"><a href="#" style="color: #0099CC;" class="addToLetter" rel="' + currentVoc.germanSentence + varGerman + currentVoc.germanSentence2 +"." +"#" + currentVoc.englishSentence + varEnglish + currentVoc.englishSentence2  + "." +'">Add</a></td>';
 
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
	    var arrayPosition = feelingData.map(function(arrayItem) { return arrayItem._id; }).indexOf(englishWord);
	    
	    var currentVoc = feelingData[arrayPosition];
	    // Get the object
	    var varFeeli ='';
	    
	    //set german and english word
	    var laenge = currentVoc.germanWords.length;
	    
	    
	    if(laenge<=0){
	    	 var varGerman = "";
		     var varEnglish = "";	
		     var varGerman2 ="";
		     var varEnglish2 ="";
	    }
	    else if((laenge>0) && count<0 ){
	    	count =0;
	    	varGerman = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+'&nbsp' +  currentVoc.germanWords[0]+ '&nbsp' + '</a>' ;
	        varEnglish = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change this word</span>'+ '&nbsp' + currentVoc.englishWords[0]+ '&nbsp' + '</a>' ;
	        varGerman2= currentVoc.germanWords[0];
	        varEnglish2= currentVoc.englishWords[0];
	    }
	    else{
	    	varGerman = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change the word</span>'+ '&nbsp' + currentVoc.germanWords[count]+ '&nbsp' + '</a>' ;
	        varEnglish = '<a  class="tooltips"  style="BACKGROUND-COLOR: #0099CC; color: white"  ><span>Use the arrows -> to change the  word</span>'+ '&nbsp' + currentVoc.englishWords[count]+ '&nbsp' + '</a>' ;
	        varGerman2 = currentVoc.germanWords[count];
	        varEnglish2= currentVoc.englishWords[count];

	    }
	 
	 
	  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelPrev" rel="' + currentVoc._id +"+"+ count + '" title="Previous version of this sentence"><span class="ui-icon ui-icon-circle-arrow-w"></span> </a></td>';
	  varFeeli += '<td class="voc">' + currentVoc.englishSentence+ varEnglish+  currentVoc.englishSentence2+"." +'</td>';
	
	  varFeeli += '<td class="voc">' +'&nbsp' +'&nbsp' +'&nbsp' + currentVoc.germanSentence + varGerman + currentVoc.germanSentence2+"." + '</td>';
	  varFeeli += '<td class="delete"><a href="#" class="linkChangeFeelNext" rel="' + currentVoc._id +"+"+ count + '" title="Next version of this sentence"><span class="ui-icon ui-icon-circle-arrow-e"></span></a></td>';
	  varFeeli += '<td class="delete"><a href="#" style="color: #0099CC;" color: #0099CC class="addToLetter" rel="' + currentVoc.germanSentence + varGerman2 + currentVoc.germanSentence2 +"." + "#" + currentVoc.englishSentence + varEnglish2 + currentVoc.englishSentence2 +"."  + '">Add</a></td>';

   //change the html of the relating row 
    $(this).parent().parent().html(varFeeli); 

};


//Fill letter with sentences (from cookie)
function createLetter() {
	var sentences="";
	if(letterInLanguage==1){
		var currCookie= getCookieName("letterEnglish");//returns cookie or ""
		sentences = currCookie.split("+");
	}
	else{
	var currCookie= getCookieName("letter");//returns cookie or ""
	sentences = currCookie.split("+");
	}
    var letterText="";
	
	if(sentences==""){
		letterText += "Create your own letter by adding sentences from the right."	
		
	}
	else{
	for (var i = 0; i < sentences.length-1; i++) {
		document.getElementById("deleteall").style.visibility="visible";		
	
		letterText += '<li class="ui-state-default" id="'+i+'"><a  class="tooltips"><span  style="font-size: 0.8em;">Drag the sentences to change the order</span> <div class="ui-icon ui-icon-arrowthick-2-n-s"></div></a>'+ '&nbsp' +'&nbsp' + '&nbsp' +'&nbsp' + sentences[i] +'<a href="#" class="deleteFromLetter"  rel="' +  sentences[i] + '"><span class="ui-icon ui-icon-closethick"></span></a></li>';
	
	}
	}

	$('#showEnglish').html("Show letter in <b>English</b>");
	 $('#sortable').html(letterText);
	
	

};


//add sentece to letter = add sentence to cookie letter
function addToLetter() {
	

	   var sentencetoAddBoth= $(this).attr('rel');
	   var sponsorsNameV =document.getElementById('sponsorName').value;
	   var cut = sentencetoAddBoth.split("#")
	   if(sponsorsNameV != undefined){
		   sponsorsName=sponsorsNameV;
	   }
	   else {
		   sponsorsName ="";
	   }
	   var sentencetoAddGer= cut[0]+" "+sponsorsName;
	   var sentencetoAddEng =cut[1]+" "+sponsorsName;
	   var currCookie= getCookieName("letter");
	   var currCookieEn= getCookieName("letterEnglish");
	   currCookie+=sentencetoAddGer+'+';
	   currCookieEn+=sentencetoAddEng+'+';
	   setTheCookie("letter", currCookie);
	   setTheCookie("letterEnglish", currCookieEn);
	   createLetter();
	  
   
};


//Delete sentence from Letter= delete sentence from cookie letter
function deleteSentenceFromLetter() {

    var confirmation = confirm('Are you sure you want to delete this sentence from your letter?');
    
    if (confirmation == true) {
    var sentenceToDelete =	$(this).attr('rel');
    var currCookie= getCookieName("letter");
    var currCookie2= getCookieName("letterEnglish");
    var sentences2 = currCookie2.split("+");
    var sentences = currCookie.split("+");
    var sentenceToDelete2="";
    //english =1
    if(letterInLanguage==1){
    	var index = sentences2.indexOf(sentenceToDelete)
    	sentenceToDelete2= sentenceToDelete;
        sentenceToDelete =sentences[index];
	}
	else{
		var index = sentences.indexOf(sentenceToDelete)
		
	    sentenceToDelete2 =sentences2[index];
	}
    
    
    
    
    var newCookie = currCookie.replace(sentenceToDelete+"+","");
    var newCookieEnglish =currCookie2.replace(sentenceToDelete2+"+","");
    
    setTheCookie("letter", newCookie);
    setTheCookie("letterEnglish", newCookieEnglish);
    
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
        setTheCookie("letterEnglish", currCookie);
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
		 $('#catButton').html("<i class='icon-white icon-chevron-down'></i> Show Categories");
		coCa=0;
	}
	else if(coCa==0){
	document.getElementById("Cattable").style.display="inline";
	 $('#catButton').html("<i class='icon-white icon-chevron-up'></i> Hide Categories");
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
	var idi =split[1];
	var cut = idi.split('#');
	var id = cut[0];
	data= "/tutorial/lettercreation/vocs/"+id;
	
	if(id=="vocGreet"){
	fillTableGreet();	
	}
	else{
	fillTable();
	}
};
function switchEnglish() {
	if(letterInLanguage==0){
	letterInLanguage=1;
	createLetter();
	 $('#showEnglish').html("Show letter in <b>German</b>");
	}
	else{
		letterInLanguage =0;
		createLetter();
		 $('#showEnglish').html("Show letter in <b>English</b>");
		
	}
};




