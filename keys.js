// console.log( 'this is loaded' );

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var movieKey = process.env.MOVIE_KEY

var bandKey = process.env.BAND_KEY


module.exports = {
  spotify: spotify,
  movieKey: movieKey,
  bandKey: bandKey
}