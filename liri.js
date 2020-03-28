
// Required Packages
var keys = require( "./keys.js" );
var Spotify = require( 'node-spotify-api' );
var axios = require( 'axios' )
var moment = require( 'moment' );
var fs = require( 'fs' )


// Required Variables from node process
const [ node, script, liriType, ...params ] = process.argv;
var search = String( params ).replace( /,/g, " " );


// @ts-ignore
var spotify = new Spotify( {
    id: keys.spotify.id,
    secret: keys.spotify.secret
} );


// go through spotify data to get artist name out of object want to update this like band search function to remove
var artistName = function ( artists )
{
    return artists.name

}


// Spotify Search Function 

var getSpotify = function ()
{
    if (params.length === 0) {
        search = "the sign"
    }


    spotify.search( { type: 'track', query: search }, function ( err, data )
    {
        if ( err )
        {
            return console.log( 'Error occurred: ' + err );
        }


        var song = data.tracks.items;
        for ( var i = 0; i < song.length; i++ )
        {

            console.log( i );
            console.log( 'artists: ' + song[ i ].artists.map( artistName ) );
            console.log( 'Song Name: ' + song[ i ].name );
            console.log( 'Album Name: ' + song[ i ].album.name );
            console.log( 'Track Number: ' + song[ i ].track_number );
            console.log( 'Populairty: ' + song[ i ].popularity );
            console.log( 'Preview Link: ' + song[ i ].preview_url );
            console.log( '___________________________________________' );
        }





    } );

}




// Movie Search Function
var getMovie = function ( movieSearch )
{
    // @ts-ignore
    axios.get( "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=" + keys.movieKey ).then(
        function ( response )
        {

            var movieData = JSON.stringify( response.data.Ratings[ 0 ].Value )

            console.log( "Movie Title: " + response.data.Title );
            console.log( "Release Year: " + response.data.Year );
            console.log( "IMDB Rating: " + response.data.imdbRating );
            console.log( "Rotten Tomatoes Rating: " + movieData );
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






// Band Search Function 
var getBand = function ( bandSearch )
{

    // @ts-ignore
    axios.get( "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=" + keys.bandKey ).then(
        function ( response )
        {



            var showings = response.data
            for ( var i = 0; i < showings.length; i++ )
            {
                var date = moment( showings[ i ].datetime ).format( "MM/DD/YY" )
                console.log( i )
                console.log( 'Venue: ' + showings[ i ].venue.name )
                console.log( 'Location: ' + showings[ i ].venue.city + ', ' + showings[ i ].venue.country )
                console.log( 'Date: ' + date )
                console.log( '_______________________________________' )
            }



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





// Liri do-what-it-says Function
var heyLiri = function () 
{
    fs.readFile( "random.txt", 'utf8', function ( err, data )
    {
        if ( err )
        {
            console.error( err )
            return
        }
        var text = data.split( ',' )
        if ( text.length == 2 )
        {
            letsPlay( text[ 0 ], text[ 1 ] )
        } else if ( text.length == 1 )
        {
            letsPlay( text[ 0 ] )
        }

    } )


}






// Liri Function - Runs app-
var letsPlay = function ( liriType, search )
{
    switch ( liriType )
    {
        case 'spotify-this-song': getSpotify()

            break;

        case 'movie-this': getMovie( search )

            break;

        case 'concert-this': getBand( search )

            break;

        case 'do-what-it-says': heyLiri()

            break;

        default: console.log( 'LIRI don\'t know that' )
            break;
    }
}




letsPlay( liriType, search )
