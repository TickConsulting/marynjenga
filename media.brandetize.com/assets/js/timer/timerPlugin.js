( function ( $ ) {

  $.fn.timerCountdown = function ( options ) {

    var theList = this;
    // Establish our default settings
    var settings = $.extend( {
      timerEnd: 'February 26, 2020, 12:38:00 UTC',
      complete: null,
      format: "off" // on (01:05:55) | off (1:5:55)
    }, options );

    return this.each( function () {
      var time = settings.timerEnd;

      var calcNewTimer = setInterval( function () {
        dateFuture = new Date( time );
        dateNow = new Date();

        seconds = Math.floor( ( dateFuture - ( dateNow ) ) / 1000 );
        if ( seconds <= 0 ) {
          disablePage();
        }
        minutes = Math.floor( seconds / 60 );
        hours = Math.floor( minutes / 60 );
        days = Math.floor( hours / 24 );

        hours = hours - ( days * 24 );
        minutes = minutes - ( days * 24 * 60 ) - ( hours * 60 );
        seconds = seconds - ( days * 24 * 60 * 60 ) - ( hours * 60 * 60 ) - ( minutes * 60 );

        //logic for the two digits ON setting
        if ( settings.format == "on" ) {
          days = ( String( days ).length >= 2 ) ? days : "0" + days;
          hours = ( String( hours ).length >= 2 ) ? hours : "0" + hours;
          minutes = ( String( minutes ).length >= 2 ) ? minutes : "0" + minutes;
          seconds = ( String( seconds ).length >= 2 ) ? seconds : "0" + seconds;
        }

        theList.html(
          '<li class="days-title"><span>' + days + '</span></li>' +
          '<li class="hours-title"><span>' + hours + '</span></li>' +
          '<li class="minutes-title"><span>' + minutes + '</span></li>' +
          '<li class="seconds-title"><span>' + seconds + '</span></li>' );

      }, 1000 );

      function disablePage() {

        if ( $.isFunction( settings.complete ) ) {
          settings.complete.call( this );
        } else {
          theList.remove();
        }
        clearInterval( calcNewTimer );
      }

    } );

  }

}( jQuery ) );