function getFuzzySecAgo(str) {
	var myregex = /(\d+)\s(\w+)\sago/ig
	var result = myregex.exec(str);
	
	if(result === undefined) {
		return -1;
	}
	
	if(result === null) {
		return -1;
	}
	
	if(result.length < 3) {
		return -1;
	}
	
	var timeUnit = result[2].toLowerCase();
	var timeAmount = parseInt(result[1]);
	
	if(timeUnit == 'seconds' || timeUnit == 'second') {
		return timeAmount;
	}
	
	if(timeUnit == 'minutes' || timeUnit == 'minute') {
		return timeAmount * 60;
	}
	
	if(timeUnit == 'hours' || timeUnit == 'hour') {
		return timeAmount * 60 * 60;
	}
	
	if(timeUnit == 'days' || timeUnit == 'day') {
		return timeAmount * 60 * 60 * 24;
	}

	return -1;	
}

function getCommentCount(str) {
    var myregex = /(\d+)\s+comment\s*/ig
	var result = myregex.exec(str);
	
    if(result == null) {
        return 0;
    }
    
    if(result.length < 2) {
        return 0;
    }
    
    return parseInt(result[1]);
}

function colorPost(secSincePost, pointsNum, commentCount, el) {
	 var minutesSince = secSincePost / 60;
	 var postMatched = false;
	 var totalActivity = pointsNum + commentCount;
	 
	 if(minutesSince < 15) {
	 	if(totalActivity > 3) {
	 		postMatched = true;
	 	}
	 } else if(minutesSince < 30) {
	 	if(totalActivity > 3) {
	 		postMatched = true;
	 	}
	 } else if(minutesSince < 45) {
	 	if(totalActivity > 3) {
	 		postMatched = true;
	 	}
	 } else if(minutesSince < 61) {
	 	if(totalActivity > 3) {
	 		postMatched = true;
	 	}
	 }
	 
	 if(postMatched == true) {
	 	$(el).parent().css('background-color', '#CFC');
	 }
}

$("td.subtext").each(function(idx, el) {
    var elText = $(el).text();
    var pointText = $("span", el).text();
    var pointsNum = parseInt(pointText);
    var secSincePost = getFuzzySecAgo(elText);
    var hoursSince = secSincePost / 60 / 60;
    var minutesSince = secSincePost / 60;
    var commentCount = getCommentCount(elText);
    
    var resultObj = {
    	'elText': elText,
    	'pointText': pointText,
    	'pointsNum': pointsNum,
    	'secSincePost': secSincePost,
    	'hoursSince': hoursSince,
    	'commentCount': commentCount,
    }
    
    colorPost(secSincePost, pointsNum, commentCount, el);
    
    var pointsPerHourText = 'NA/pph';
    if(hoursSince > 0) {
    	var pointsPerHour = pointsNum / hoursSince;
    	pointsPerHourText = pointsPerHour.toFixed(2)+'/pph';
    }
    
    var commentsPerHourText = 'NA/cph';
    if(commentCount > 0) {
    	var commentsPerHour = commentCount / hoursSince;
    	commentsPerHourText = commentsPerHour.toFixed(2)+'/cph';
    }
    
    $("span.hnbuddy-cnt", el).remove();
    $('<span class="hnbuddy-cnt">'+pointsPerHourText+' --- '+commentsPerHourText+'</span>').css('padding-left', '15px').appendTo(el);
});

/*
$("span.comhead").each(function(idx, el) {

});
*/