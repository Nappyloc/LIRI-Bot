# LIRI-Bot
LIRI is a Language Interpretation and Recognition Interface designed to 
perform as an assistant when looking for information on local band showings, 
song searches, and movie searches. Liri takes 4 basic commands
* concert-this [band name]
* spotify-this-song [song name]
* movie-this [movie name]
* do-what-it-says

  **concert-this**
 Using the concert-this function will search for showings based on the search entry
 if the user does not supply an entry it will defult to showings for "The Weekend"
 The results will display as follows
  * Name of Venue
  * Venue Location
  * Date of the showing
  
  
  **spotify-this-song**
  Using the spotify-this-song funciton will search for songs containing the search entry
  items. If the user does not supply an entry the search will default to "The Sign"
  The results will display as follows
  * Artist
  * Song Name
  * Spotify preview ling (not always returned)
  * The Album the song is from
  

  **movie-this**
  Using the movie-this function will search for the top movie matching the search entry.
  If the user does not supply an entry the search will default to "Mr. Nobody"
  The results will display as follows
  
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie
    
    
   **do-what-it-says**
   Using the do-what-it-says function performs a spotify search for "I Want It That Way"
   
   
   
   ### Running the application
   requires the use of .emv file that contains the following
   
   ##### Spotify API keys
      SPOTIFY_ID= 
      SPOTIFY_SECRET= 


   ##### Movie Search Key
      MOVIE_KEY= 


   ##### Band Search Key
      BAND_KEY= 
      
      
      
  
  https://nappyloc.github.io/LIRI-Bot/ - LIRIBOT
  [GitHub](http://github.com)
   
   


