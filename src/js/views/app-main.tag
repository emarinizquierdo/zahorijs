
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
    :scope {
      display: block;
      font-family: sans-serif;
      margin-right: 0;
      margin-bottom: 130px;
      margin-left: 50px;
      padding: 1em;
      text-align: center;
      color: #666;
    }
    ul {
      padding: 10px;
      list-style: none;
    }
    li {
      display: inline-block;
      margin: 5px;
    }
    a {
      display: block;
      background: #f7f7f7;
      text-decoration: none;
      width: 150px;
      height: 150px;
      line-height: 150px;
      color: inherit;
    }
    a:hover {
      background: #eee;
      color: #000;
    }
    @media (min-width: 480px) {
      :scope {
        margin-right: 200px;
        margin-bottom: 0;
      }
    }
  </style>

</app-main>