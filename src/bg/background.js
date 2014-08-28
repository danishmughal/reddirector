//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
});

chrome.omnibox.onInputEntered.addListener(function(text) {

		var text_clean = text.replace(/[^\w\s]/g,''); // Removes weird characters

		// Redirect to user profile
		if ( (text_clean.substring(0,1) == 'u') && (text_clean.substring(1,2) == ' ') )
		{
			var username = text_clean.substring(1).trim();
			var user_url = "http://www.reddit.com/user/" + username;
			chrome.tabs.update({url: user_url});
		}

		// Redirect to subreddit
		else {
			text_clean = text_clean.replace(/\s{2,}/g, ' ');
			var subreddits = text_clean.split(" ");

			// Handle quick multireddit
			if (subreddits.length > 1) {
				var quickmulti = text_clean.replace(/ /g, "+");
				var quickmulti_url = "http://www.reddit.com/r/" + quickmulti;
				chrome.tabs.update({url: quickmulti_url});
			}

			else {
				var subreddit_url = "http://www.reddit.com/r/" + subreddits[0];
				chrome.tabs.update({url: subreddit_url});
			}
		}   

});