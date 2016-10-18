<zjs-main>
    <zjs-navbar></zjs-navbar>
    <div id="content"></div>

    <script>

        import './zjs-home.tag';
        import './zjs-users.tag';
        import './zjs-admin.tag';
        import './zjs-login.tag';
        import '../components/zjs-navbar.tag';
        import users from '../model/users';

        /* Binding */
        var that = this;

        /* Public Variables */
        this.users = users;

        /* Private Variables */
        var _currentPage = null;

        /* Initialization */
        _routing();

        /* Private Methods */
        function _routing(){
          riot.route('/auth/*', _auth);
          riot.route('/admin/*', _goTo);
          riot.route('*', _goTo);
          riot.route('', _goTo);
        }

        function _auth(path) {

            if (path == "logout") {
                users.logout();
                that.update();
            }

            window.location.href = '/auth/' + path;

        }

        function _goTo(path) {

            if (_currentPage) {
                _currentPage.unmount(true);
            }

            if (!path || (path == "admin" && !users.isUserLogged)) {
                riot.route("home");
            }

            _currentPage = riot.mount('div#content', 'zjs-' + path)[0];
        }

    </script>

    <style scoped>
        #content {
            padding-top: 64px;
        }
/*
        #content p{
          font-family: 'Abel', sans-serif;
          font-size: 21px;
        }
  */      
        .black {
            background-color: #111!important;
        }

        .in-middle{
          margin-left: auto;
          margin-right: auto;
        }

        .pointer{
          cursor: pointer;
        }

    </style>

</zjs-main>
