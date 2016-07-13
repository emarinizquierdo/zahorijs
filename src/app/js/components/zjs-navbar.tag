<zjs-navbar>

    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li each={ links }>
                    <a href="/{ url }" class={ selected: parent.selectedId===url }>{ name }</a>
                </li>
            </ul>
        </div>
    </nav>

    <script>

        var self = this;

        this.links = [
            {
                name: "Home",
                url: "home"
            }, {
                name: "Admin",
                url: "admin"
            }, {
                name: "Login",
                url: "login"
            }
        ];

    </script>

    <style scoped></style>

</zjs-navbar>
