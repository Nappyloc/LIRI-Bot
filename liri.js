
// Required Packages
var Spotify = require( 'node-spotify-api' );
var axios = require( 'axios' )


// Required Variables
var keys = require( "./keys.js" );
var liriType = process.argv[ 2 ]
var search = process.argv[ 3 ]

// Spotify


// @ts-ignore
var spotify = new Spotify( {
    id: keys.spotify.id,
    secret: keys.spotify.secret
} );




// Spotify Search

var getSpotify = function ( songSearch )
{



    spotify.search( { type: 'track', query: songSearch }, function ( err, data )
    {
        if ( err )
        {
            return console.log( 'Error occurred: ' + err );
        }


        var song = data.tracks.items;
        for ( var i = 0; i < song.length; i++ )
        {
            console.log( i );
            // console.log( 'artists: ' + song[ i ].artists.name ) Need to get artist name working
            console.log( 'Song Name: ' + song[ i ].name )
            console.log( 'Album Name: ' + song[ i ].album.name )
            console.log( 'Track Number: ' + song[ i ].track_number )
            console.log( 'Populairty: ' + song[ i ].popularity )
            console.log( 'Preview Link: ' + song[ i ].preview_url )
            console.log( '___________________________________________' )
        }




        // console.log( song );
    } );

}




var getMovie = function ( movieSearch )
{
    // @ts-ignore
    axios.get( "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=" + keys.movieKey ).then(
        function ( response )
        {
            // console.log( response );
            console.log( "Movie Title: " + response.data.Title );
            console.log( "Release Year: " + response.data.Year );
            console.log( "IMDB Rating: " + response.data.imdbRating );
            // console.log( "Rotten Tomatoes Rating: " + response.data.Ratings[ 0 ] );   Need to get Rotten Rating working
            console.log( "Counrty of Production: " + response.data.Country );
            console.log( "Language: " + response.data.Language );
            console.log( "Movie Plot: " + response.data.Plot );
            console.log( "Actors: " + response.data.Actors );
        } )
        .catch( function ( error )
        {
            if ( error.response )
            {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log( "---------------Data---------------" );
                console.log( error.response.data );
                console.log( "---------------Status---------------" );
                console.log( error.response.status );
                console.log( "---------------Status---------------" );
                console.log( error.response.headers );
            } else if ( error.request )
            {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log( error.request );
            } else
            {
                // Something happened in setting up the request that triggered an Error
                console.log( "Error", error.message );
            }
            console.log( error.config );
        } );









}










// Liri Search Function
var letsPlay = function ( liriType, search )
{
    if ( liriType === 'spotify-this-song' )
    {
        getSpotify( search )
    }
    if ( liriType === 'movie-this' )
    {
        getMovie( search )
    } else
    {
        console.log( 'LIRI don\'t know that' )
    }
}


letsPlay( liriType, search )
