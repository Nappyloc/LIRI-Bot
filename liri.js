
// Required Packages update funtions to pull all keys from the .env 
require( 'dotenv' ).config()
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

    // Check to make sure user passed a song name if not default song to the sign
    if ( params.length === 0 )
    {
        search = "the sign"
    }


    // Spotify search call
    spotify.search( { type: 'track', query: search }, function ( err, data )
    {

        // If error returned
        if ( err )
        {
            return console.log( 'Error occurred: ' + err );
        }

        // on Return store data in variable song
        var song = data.tracks.items;

        // Loop through the song data to display results
        for ( var i = 0; i < 5; i++ )
        {

            var log = 'Number: ' + i + '\nArtists: ' + song[ i ].artists.map( artistName ) + '\nSong Name: ' + song[ i ].name + '\nAlbum Name: ' + song[ i ].album.name + '\n Preview Link: ' + song[ i ].preview_url + '\n_________________________';
            console.log( log )
            writeLog( log )

        }





    } );

}




// Movie Search Function
var getMovie = function ( movieSearch )
{

    // Check to see if user passed a search option, if not default to Mr. Nobody
    if ( params.length === 0 )
    {
        movieSearch = "Mr. Nobody"
    }

    // @ts-ignore
    axios.get( "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=" + keys.movieKey ).then(
        function ( response )
        {

            var movieData = JSON.stringify( response.data.Ratings[ 0 ].Value )
            var log = "Movie Title: " + response.data.Title + '\nRelease Year: ' + response.data.Year + '\nIMDB Rating: ' + response.data.imdbRating + "\nRotten Tomatoes Rating: " + movieData + "\nCounrty of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nMovie Plot: " + response.data.Plot + "\nActors: " + response.data.Actors + '\n___________________________________________'
            console.log( log )
            writeLog( log )

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

    if ( params.length === 0 )
    {
        bandSearch = "the weekend"
    }

    // @ts-ignore
    axios.get( "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=" + keys.bandKey ).then(
        function ( response )
        {



            var showings = response.data
            for ( var i = 0; i < 10; i++ )
            {
                var date = moment( showings[ i ].datetime ).format( "MM/DD/YY" )
                var log = 'number: ' + i + '\nBand: ' + bandSearch + '\nVenue: ' + showings[ i ].venue.name + '\nLocation: ' + showings[ i ].venue.city + ', ' + showings[ i ].venue.country + '\nDate: ' + date + '\n_______________________________________'
                console.log( log )
                writeLog( log )

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




// Function to write the search to the log file
var writeLog = function ( log )
{
    fs.appendFile( 'log.txt', log, ( err ) =>
    {
        if ( err ) throw err;
    } );



}




letsPlay( liriType, search )
