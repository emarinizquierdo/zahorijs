<zjs-user-phantom>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';

        var self = this;
        this.isUserLogged = false;
        this.user = {};

        this.on('logout', function () {
            self.isUserLogged = false;
            localStorage.removeItem('zjs.user');
        });

        function getUser() {

          var _localUser = getLocalUser();

            if(_localUser){
              self.user = _localUser;
              self.isUserLogged = true;
              return;
            }

            superagent.get(properties.services.me).end(function (err, res) {

                if(res && res.body){
                  self.user = res.body;
                  persistUser();
                  self.isUserLogged = true;
                  self.update();
                }

            });
        }

        function persistUser() {
            localStorage.setItem('zjs.user', JSON.stringify(self.user));
        }

        function getLocalUser(){
          var _localUser = localStorage.getItem('zjs.user');
          return JSON.parse(_localUser);
        }

        getUser();

        this.on("mount", function(a){
          window._shared.zsjUserPhantom = self;
        });

    </script>

</zjs-user-phantom>
