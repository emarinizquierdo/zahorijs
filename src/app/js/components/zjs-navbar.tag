<zjs-navbar>

    <nav>
        <div class="nav-wrapper black">
            <ul id="nav-mobile" class="right">
                <li class="{'active' : (('/' + url) == active) }" each={ links } if="{showEver || (users.isUserLogged && auth) || (!users.isUserLogged && !auth)}">
                    <a href="/{ url }">{ name }</a>
                </li>
                <li if="{users.isUserLogged}"><img src="{users.me.image}" alt="" id="profileImage" class="circle">
                </li>
            </ul>

        </div>
    </nav>

    <script>

        import users from '../model/users';

        /* Binding */
        var that = this;

        /* Public Variables */
        this.users = users;
        this.links = [

            {
                name: "Home",
                url: "home",
                auth: false,
                showEver: true
            }, {
                name: "Docs",
                url: "docs",
                auth: false,
                showEver: true
            },{
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
        this.active = 'algo';

        /* Private Methods */
        function isActive() {
            that.active = location.pathname;
            riot.update();
        }

        /* Init */

        riot.route('*', isActive);

        that.on("mount", function () {
            users.getMe();
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
