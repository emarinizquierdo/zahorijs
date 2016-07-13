<zjs-main>

    <div id="content"></div>

    <script>

        import './zjs-home.tag';
        import './zjs-admin.tag';
        import './zjs-login.tag';

        var self = this;
        var currentPage = null;

        var r = riot.route(goTo);

        function goTo(path) {

            if (currentPage) {
                currentPage.unmount(true);
            }

            currentPage = riot.mount('div#content', 'zjs-' + path)[0];
        }

        goTo('home');

    </script>

    <style scoped></style>

</zjs-main>
