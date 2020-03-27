
// Required Packages
var Spotify = require( 'node-spotify-api' );


// Required Variables
var keys = require( "./keys.js" );
var liriType = process.argv[2]
var Search = 

// Spotify

var spotify = new Spotify( {
    id: keys.spotify.id,
    secret: keys.spotify.secret
} );




// Spotify Search

var getSpotify = function(songSearch) {



    spotify.search( { type: 'track', query: songSearch}, function ( err, data )
    {
        if ( err )
        {
            return console.log( 'Error occurred: ' + err );
        }

        var song = data.tracks.items[ 0 ]
        console.log( song );
    } );

}




// Liri Search Function
