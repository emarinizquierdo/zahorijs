<zjs-admin-sidebar>

    <div>
        <div class="collection">
            <a if="{users.me.role == 'superadmin'}" href="/admin/users" class="collection-item blue-text {'blue darken-3 white-text' : isActive('/admin/users')}">Users</a>
            <a href="/admin" class="collection-item blue-text {'blue darken-3 white-text' : isActive('/admin')}">Account</a>
        </div>
    </div>

    <script>

        import users from '../model/users';

        /* Binding */
        var that = this;

        /*Public Methods */
        this.isActive = isActive;
        this.users = users;

        function isActive(itemName) {
            return location.pathname == itemName;
        }

        this.on('mount', function () {

        });

    </script>

    <style scoped></style>

</zjs-admin-sidebar>
