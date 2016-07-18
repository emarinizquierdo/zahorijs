<zjs-navbar>

    <nav>{user}
        <div class="nav-wrapper black">
            <a href="#" class="brand-logo hide-on-med-and-up">ZahoriJs</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li each={ links } if="{showEver || (zsjUserPhantom.isUserLogged && auth) || (!zsjUserPhantom.isUserLogged && !auth)}" >
                    <a href="/{ url }" class="">{ name }</a>
                </li>
            </ul>
        </div>
    </nav>

    <script>

        var self = this;
        self.zsjUserPhantom = _shared.zsjUserPhantom;

        this.links = [
            {
                name: "Home",
                url: "home",
                auth: false,
                showEver: true
            }, {
                name: "Admin",
                url: "admin",
                auth : true,
                showEver: false
            }, {
                name: "Login",
                url: "login",
                auth : false,
                showEver: false
            }, {
                name: "Logout",
                url: "auth/logout",
                auth : true,
                showEver: false
            }
        ];

        self.on("mount", function(){
            self.user = 'algo'
        });

    </script>

    <style scoped>
nav{
  z-index: 1;
position: absolute;
}
    </style>

</zjs-navbar>
