<zjs-users-list>

    <!-- Basic Card -->

    <ul class="collection with-header">
        <li class="collection-header">
            <h4>Users</h4>
        </li>
        <li each={ users } class="collection-item avatar">
<img src="{image}" alt="" id="profileImage" class="circle">
          {displayName}</li>
    </ul>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';

        /* Binding */
        var self = this;

        /* Public Variables */
        this.user = _shared.zsjUserPhantom.user;
        this.users = [];

        /* Initialization */
        this.on("mount", function (a) {
            loadUsers();
        });


        function loadUsers() {
            superagent.get(properties.services.users).end(function (err, res) {
                if (res && res.body) {
                    self.users = res.body;
                }
                self.update();
            });
        }


    </script>

</zjs-users-list>
