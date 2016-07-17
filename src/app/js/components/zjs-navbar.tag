<zjs-navbar>

    <nav>{user}
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li each={ links } if="{showEver || (zsjUserPhantom.isUserLogged && auth) || (!zsjUserPhantom.isUserLogged && !auth)}" >
                    <a href="/{ url }" class={ selected: parent.selectedId===url }>{ name }</a>
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

    <style scoped></style>

</zjs-navbar>
