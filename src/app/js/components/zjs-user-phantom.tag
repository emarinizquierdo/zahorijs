<zjs-user-phantom>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';

        var self = this;
        this.isUserLogged = false;
        this.user = {};

        this.on('logout', function () {
            self.isUserLogged = false;
        });

        function getUser() {

            superagent.get(properties.services.me).end(function (err, res) {

                if (err && (err.status == 403)) {
                    self.isUserLogged = false;
                }

                if (res && res.body) {
                    self.user = res.body;
                    self.isUserLogged = true;
                }

                self.update();

            });
        }

        this.on("mount", function (a) {
            window._shared.zsjUserPhantom = self;
            getUser();
        });
    </script>

</zjs-user-phantom>
