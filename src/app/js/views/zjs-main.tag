<zjs-main>

    <div id="content"></div>

    <script>

        import './zjs-home.tag';
        import './zjs-admin.tag';
        import './zjs-login.tag';

        var self = this;
        var currentPage = null;

        riot.route('/auth/*', auth);
        riot.route('*', goTo);

        function auth(path) {

          window.location.href = '/auth/' + path;

        }

        function goTo(path) {

            if (currentPage) {
                currentPage.unmount(true);
            }

            currentPage = riot.mount('div#content', 'zjs-' + path)[0];
        }

    </script>

    <style scoped></style>

</zjs-main>
