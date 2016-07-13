
<app-main>

  <div id="content">


  </div>

  <script>

  import Home from './home.tag';
  import Admin from './admin.tag';

    var self = this
    var currentPage = null;

    var r = riot.route.create()
    r('#home',   home      )
    r('#admin', admin)
    r(           home       ) // `notfound` would be nicer!

    function home(){

      if (currentPage) {
        currentPage.unmount(true);
      }

      currentPage = riot.mount('div#content', 'home')[0];
    }

    function admin(){

      if (currentPage) {
        currentPage.unmount(true);
      }

      currentPage = riot.mount('div#content', 'admin')[0];
    }


  </script>

  <style scoped>
    
  </style>

</app-main>
