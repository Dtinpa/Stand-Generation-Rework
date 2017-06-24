//Goes through multiple checks to pick a valid ability name, since some show up with weird characters, or is just the help page

//combines all of the stand information into one string to be displayed in the textArea
function concatStandAttributes(standNameJSON, bandName, abilityName, url, powerDescription) {
	
	//Generation of a Stand's stats
	//An Array of Stat values
	//each variable is an index of this array.  No other index but the range index is able to get the index value where Infinite resides
	var Stats = ["A", "B", "C", "D", "E", "Infinite"];
	var power = Math.floor((Math.random() * 5))
	var speed = Math.floor((Math.random() * 5))
	
	//since infinite range can get Over Powered really quick, I made it a 1 out of 100 chance of becoming an infinite ranged stand
	var range = Math.floor((Math.random() * 100))
	if(range == 99) {
		range = 5;
	}
	else {
		range = Math.floor((Math.random() * 5))
	}
	
	var durability = Math.floor((Math.random() * 5))
	var precision = Math.floor((Math.random() * 5))
	var potential = Math.floor((Math.random() * 5))
	
	var name = handleItunesSearchResults(standNameJSON, bandName);
	var nameAndPower = 'Stand Name: ' + name + '\n\nStand Ability: [' + abilityName + '](' + url + ')';
	var stats = '\n\nPower - ' + Stats[power] + '\n\nSpeed - ' + Stats[speed]+ '\n\nRange - ' + Stats[range] + '\n\nDurability - ' + Stats[durability] + '\n\nPrecision - ' + Stats[precision] + '\n\nPotential - ' + Stats[potential];
	var description = '\n\nDescription: ' + powerDescription;
		
	return nameAndPower + stats + description;
}

function validateAbilityName(abilityTitle) {
	var indexOf;
	var gallery = 0;
				
	if(abilityTitle.indexOf("Gallery") != -1)
	{
		indexOf = abilityTitle.indexOf("Gallery") - 1;
		gallery = 0
	}
	else
	{
		indexOf = abilityTitle.indexOf("Superpower");
		gallery = 1
	}
		
	var abilityName;
	if(gallery == 0)
	{
		abilityName = abilityTitle.substr(0, indexOf);
	}
	else if(gallery == 1)
	{
		abilityName = abilityTitle.substr(0, indexOf - 2);
	}
				
	//If there is an "&" sign in the title, make sure it appears
	if(abilityName.indexOf("&amp;") != -1)
	{
		abilityName.replace(/&amp;/g, "&");
	}
	//This was a weird foreign letter that popped up out of nowhere
	if(abilityName.indexOf("?") != -1)
	{
		abilityName.replace("/?", "/");
	}
	//There are a few pages that aren't super power related, so replace them.  This method increases the odds of a few powers coming up, but not by much.  I also really like the first power
	//and the second one is educational so...
	if(abilityName.indexOf("Admins") != -1)
	{
		abilityName == "Resurrection Roulette";
	}
	if(abilityName.indexOf("Official Talk Page") != -1)
	{
		abilityName == "Selkie Physiology";
	}
				
	abilityName = abilityName.trim()
		
	return abilityName;
}

//parses the html source of the website to find the power description.  Multiple steps are needed because its
//pretty tricky getting to just the description
function parsePowerDescription(source) {
	//Finds the meta tag that holds the description of the power.  1 is added to descriptionStart because the first character is a quote
	var metaTagStart = source.indexOf("og:description");
	var contentStart = source.indexOf("content", metaTagStart);
	var descriptionStart = source.indexOf("\"", contentStart) + 1;
				
	//Finds the end of the description and creates a sub-string containing the description.
	var metaTagEnd = source.indexOf("\" />", descriptionStart);
	var powerDescription = source.substring(descriptionStart, metaTagEnd);
		
	return powerDescription;
}