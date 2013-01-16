$( document ).ready( function() {

/* setHeight() keeps the swatches as squares by setting each swatch's height on document load, and updating it when the viewport is resized. */
  
  var swatchGrids = $( ".swatchgrid" );
  
  var setHeight = function( elements ) {
    $( elements ).each( function() {
      var firstChild = $( this ).find( ":first-child" );
      $( this ).children().each( function() {
        $( this ).height( $( firstChild ).width() );
      });
    });
  };
  
  setHeight( swatchGrids );
      
  $( window ).resize( function() {
    setHeight( swatchGrids );
  });

/* updateFontDetails() changes the HTML of each .font-details-* on document load to reflect the styles of the immediately preceding .typography-sample. This allows you to update the styles of the typography samples on the fly without having to manually enter these details into the HTML. */
  
  var updateFontDetails = function() {
    $( ".typography-sample" ).each( function() {
      var thisSample = $( this );
      
      var getFontName = function( sample ) {
        var splitFontStack = sample.css( "font-family" ).split( "," );
        
        var justTheName = function() {
          var rawFontName = splitFontStack[ 0 ]; //Get the first font-family from the font stack
          if ( rawFontName.charAt( 0 ) == "\'" | "\"" ) {
            return rawFontName.substring( 1, rawFontName.length - 1 ); //Remove the quotes from around the font-family name, if there are any
          } else {
            return rawFontName;
          }
        };
        
        return justTheName();
      };
      
      var fontName = getFontName( thisSample );
      var fontColor = thisSample.css( "color" );
      
      var fontDetails = thisSample.next( "[class*=font-details-]" );
      fontDetails.children( ".font-name" ).html( fontName );
      fontDetails.children( ".font-color" ).html( fontColor );
    });    
  };
  
  updateFontDetails();
  
});