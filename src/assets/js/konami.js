var keys = [];
    var konami = '38,38,40,40,37,39,37,39,66,65';
    
    $(document).keydown(function(e){
        keys.push( e.keyCode );
        if ( keys.toString().indexOf( konami ) >=0 ){
            
            keys = [];
            
           $('body').css('background', 'pink').append ('<iframe width="0" height="0" src="https://www.youtube.com/embed/kH9v8CaaK6Y?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
        }
    });
