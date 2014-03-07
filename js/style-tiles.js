$( function() {
  // setHeight() keeps the swatches as squares by setting each swatch's 
  // height on document load, and updating it when the viewport is resized.
  var swatchGrids = $( ".swatchgrid" );
  
  function setHeight( elements ) {
    $( elements ).each( function() {
      var $firstChild = $( this ).find( ":first-child" );

      $( this ).children().each( function() {
        $( this ).height( $firstChild.width() );
      } );
    } );
  }

  function getFontName( sample ) {
    // Get the first font-family from the font stack
    var fontName = sample.css( "font-family" ).split( "," )[ 0 ];

    if ( fontName.charAt( 0 ) == "\'" | "\"" ) {
      // Remove quotation marks from around the font-family name,
      // if there are any
      return fontName.substring( 1, fontName.length - 1 );
    } else {
      return fontName;
    }
  }

  // updateFontDetails() changes the HTML of each .font-details-* 
  // on document load to reflect the styles of the immediately preceding 
  // .typography-sample. This allows you to update the styles of the 
  // typography samples on the fly without having to manually enter 
  // these details into the HTML.
  function updateFontDetails() {
    $( ".typography-sample" ).each( function() {
      var fontName = getFontName( $( this ) ),
          fontColor = $( this ).css( "color" ),
          fontDetails = $( this ).next( "[class*=font-details-]" );

      fontDetails.children( ".font-name" ).html( fontName );
      fontDetails.children( ".font-color" ).html( fontColor );
    } );    
  }

  updateFontDetails();
  setHeight( swatchGrids );

  $( window ).resize( function() {
    setHeight( swatchGrids );
  } );  
} );