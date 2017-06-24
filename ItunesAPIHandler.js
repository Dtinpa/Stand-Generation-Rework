//Formats the users request to suite a url
function urlEncode(obj) 
{
	var s = '';
	for (var key in obj) 
	{
		s += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
	}
	if (s.length > 0) 
	{
		s = s.substr(0, s.length - 1);
	}

	return (s);
}
			
//Executes the search based on what the user is searching for and returns the JSON data
function standGeneration(bandName) 
{	
	var params = 
	{
		term: bandName,
	};
	var params = urlEncode(params);
		
	var url = "http://itunes.apple.com/search?" + params + "&callback=?"
	var html = '<script src="' + url + '"><\/script>';
		
	return $.getJSON(url, function(data) {
		return data;
	});	
}
			
//takes the JSON data returned from the standGeneration function and parses it, retrieving a list of song names, and then returning the song name or the band name, depending out the result
function handleItunesSearchResults(arg, bandName) 
{
	standNameList = discographyParser(arg.results);
				
	//generates a random index to get the random name.  If the result is unsatisfactory, we try again, or an alert box is thrown
	index = Math.floor((Math.random() * (standNameList.length - 1)));
	while(standNameList[index] == "Intro")
	{
		index = Math.floor((Math.random() * (standNameList.length - 1)));
	}
				
	//If the search was unsuccessful, then return the band name
	if(typeof standNameList[index] == 'undefined')
	{
		return bandName;
	}
	else
	{
		alert(standNameList[index];
		return standNameList[index];
	}
}

//parses the JSON and returns an array of the song names
function discographyParser(results) {
	standName = []
	var html = '';
	for (var i = 0; i < results.length; i++) 
	{
		var item = results[i];
		var obj =
		{
			source: 0,
			track_name: item.trackCensoredName,
		};
		standName[i] = obj.track_name;	
					
		//gets rid of useless descriptions in parenthesis
		if(standName[i].indexOf("(") != -1)
		{
			standName[i] = standName[i].substr(0,standName[i].indexOf("("))
		}
	}
	
	return standName;
}
