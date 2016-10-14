<zjs-navbar>

    <nav>
        <div class="nav-wrapper black">
            <ul id="nav-mobile" class="right">
                <li class="{'active' : (('/' + url) == active) }" each={ links } if="{showEver || (zsjUserPhantom.isUserLogged && auth) || (!zsjUserPhantom.isUserLogged && !auth)}">
                    <a href="/{ url }">{ name }</a>
                </li>
                <li if="{zsjUserPhantom.isUserLogged}"><img src="{user.image}" alt="" id="profileImage" class="circle">
                </li>
            </ul>

        </div>
    </nav>

    <script>

        var self = this;

        /* Public Variables */
        this.links = [
            {
                name: "Home",
                url: "home",
                auth: false,
                showEver: true
            }, {
                name: "Admin",
                url: "admin",
                auth: true,
                showEver: false
            }, {
                name: "Login",
                url: "login",
                auth: false,
                showEver: false
            }, {
                name: "Logout",
                url: "auth/logout",
                auth: true,
                showEver: false
            }
        ];

        /* Public Methods */
        this.zsjUserPhantom = _shared.zsjUserPhantom;
        self.user = {};
        self.active = 'algo';

        /* Private Methods */
        function isActive() {
            self.active = location.pathname;
            riot.update();
        }

        /* Init */

        riot.route('*', isActive);

        self.on("mount", function () {

        });

        _shared.zsjUserPhantom.on('update', function (value) {
            self.user = _shared.zsjUserPhantom.user;
        });

    </script>

    <style scoped>
        nav {
            z-index: 1;
            position: absolute;
        }
        nav ul li.active {
            background-color: rgba(245, 245, 245, 0.22);
        }

        #profileImage {
            width: 32px;
            margin-right: 14px;
            margin-top: 15px;
        }

    </style>

</zjs-navbar>
