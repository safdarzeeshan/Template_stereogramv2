function apiClientReady(){

	//intitialize google api	
	gapi.client.load('youtube', 'v3',onYouTubeApiLoad );
	//intialize SoundCloud API
	SC.initialize({
	client_id: '822612afaf75e4c948240a76c1afc84d',
	redirect_uri: "http://127.0.0.1:3000/callback.html"
	});
}

function onYouTubeApiLoad() {
      gapi.client.setApiKey('AIzaSyDScS0XbWgnTtadhknXXwv9eqmPu9JNsno');
}

function checkYTAuth() {
    var config = {
		'client_id': '226234146341-fbku1lulb9nr9781g3df0g7ocfo0fjid.apps.googleusercontent.com',
		'scope': 'https://www.googleapis.com/auth/youtube'
    };

    gapi.auth.authorize(config, function() {
		console.log('login complete');
		var token = gapi.auth.getToken().access_token;
		channel(token);
	});
}

function channel(token){

	//get user's youtube history channel ID
	var requestChannel = gapi.client.youtube.channels.list({
	part: 'contentDetails',
	mine:'true',
	key: token,
	});

	requestChannel.execute(function(response) {
		
		var watchHistoryId = response.items[0].contentDetails.relatedPlaylists.watchHistory;
		watchHistory(watchHistoryId, token);
	});
}

function watchHistory(watchHistoryId, token){

	//get users watch History
	var requestHistory = gapi.client.youtube.playlistItems.list({
	part: 'snippet',
	playlistId: watchHistoryId,
	key: token,
	});

	requestHistory.execute(function(response) {

		for(var i in response.items) {
			console.log(response.items[i].snippet.title);
		}
	});
}

function checkSCAuth(){
	SC.connect(function(){
		SC.get("/me/favorites",function(response){

			for(var i in response) {
				console.log(response[i].title);
			}
		});
	});
}

function checkSpotifyAuth(){

	var spotify_client_id = 'f92b340f9354467dab1da5223fb336d6';
	
	var spotifyAuth = $.ajax({
							type: 'GET',
							// dataType: 'json',
							// xhrFields: {withCredentials: true},
							url:'https://accounts.spotify.com/authorize/?' +
							'client_id=' + spotify_client_id +
							'&response_type=code' +
							'&redirect_uri=https://127.0.0.1:3000',
							headers: { 'Access-Control-Allow-Origin': 'https://127.0.0.1:3000'
										// 'Access-Control-Allow-Credentials': 'true'
										}
							});

	spotifyAuth.done(function(response) {
		console.log(response);
	});

}

function drfGET(){

	var get = $.ajax({
				type: 'GET',
				url:'http://localhost:8000',
				dataType: 'json',
				headers: {
				"Authorization": "Basic " + btoa('zeeshan:zeeshan'),
				
				},
			});

	get.done(function(response){
		console.log(response);
	});
}