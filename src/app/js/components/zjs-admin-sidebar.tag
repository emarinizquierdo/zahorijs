<zjs-admin-sidebar>

    <div>
        <div class="collection">
            <a if="{user.role == 'superadmin'}" href="/admin/users" class="collection-item {'active' : isActive('/admin/users')}">Users</a>
            <a href="/admin" class="collection-item {'active' : isActive('/admin')}">Account</a>
        </div>
    </div>

    <script>

        var self = this;
        /*Public Methods */
        this.zsjUserPhantom = _shared.zsjUserPhantom;
        this.isActive = isActive;
        self.user;

        function isActive(itemName) {
            return location.pathname == itemName;
        }

        this.on('mount', function () {
            self.user = _shared.zsjUserPhantom.user;
            self.update();
        });
    </script>

    <style scoped></style>

</zjs-admin-sidebar>
