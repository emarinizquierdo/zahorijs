<zjs-main>
    <zjs-navbar></zjs-navbar>
    <div id="content"></div>

    <script>

        import './zjs-home.tag';
        import './zjs-admin.tag';
        import './zjs-login.tag';
        import '../components/zjs-navbar.tag';

        var self = this;
        var currentPage = null;

        riot.route('/auth/*', auth);
        riot.route('*', goTo);
        riot.route('', goTo);

        function auth(path) {

          if(path == "logout"){
            window._shared.zsjUserPhantom.trigger('logout');
          }

          window.location.href = '/auth/' + path;

        }

        function goTo(path) {

            if (currentPage) {
                currentPage.unmount(true);
            }

            if(!path ||  (path == "admin" && !_shared.zsjUserPhantom.isUserLogged)){
              riot.route("home");
            }

            currentPage = riot.mount('div#content', 'zjs-' + path)[0];
        }

    </script>

    <style scoped></style>

</zjs-main>
