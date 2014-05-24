      function addSocial( smArray ){

        this.social = document.createElement('div');
        this.social.id = 'social';
        document.body.appendChild( this.social );

        window.titleEP  = document.createElement('a');
        window.titleEP.href = 'https://soundcloud.com/autografmusic/magicstick';
        window.titleEP.target = '_blank';
        window.titleEP.id = 'titleEP';
        window.titleEP.innerHTML = 'Autograf - Magic Stick';


        this.social.appendChild( window.titleEP  );

        for( var i  = 0; i < smArray.length; i ++ ){

          var a = document.createElement('a');

          if( i != smArray.length -1 ){
            a.href = smArray[i][2];
            if( i != 0 )
              a.target = '_blank';
          }else{
            a.onClick = "function(){ console.log('hello')}";
            a.id = "information"
          }



          a.style.background = 'url( icons/'+smArray[i][1]+')';
          a.style.backgroundSize = '100%';
          a.style.backgroundSize ="25px";
          a.style.backgroundPosition="center";
          a.style.backgroundRepeat="no-repeat";
          a.className += 'social';
          a.INFO_TEXT = smArray[i][0];

          this.social.appendChild( a );

        }

      }

      $('.social').hover( function( e ){

        //console.log( e );

        if( e.type == 'mouseenter' ){



          titleEP.innerHTML = e.toElement.INFO_TEXT;

        }else{

          titleEP.innerHTML = 'Rioux - System Preferences';
          

        }


      });

      $("#information").click( function(){

          $("#informationSection").toggle();

      });

