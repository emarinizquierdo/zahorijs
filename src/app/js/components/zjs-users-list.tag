<zjs-users-list>

    <!-- Basic Card -->

        <table>
       <thead>
         <tr>
             <th data-field="id">Name</th>
             <th data-field="name">Email</th>
             <th data-field="name">BraintreeId</th>
             <th data-field="price">Num Apps</th>
         </tr>
       </thead>

       <tbody class="stripped">
         <tr each={ users } class="{'green lighten-5' : apps.length > 1}">
           <td><div class="chip white"><img src="{image}" alt="" id="profileImage" class="circle">{displayName}</div></td>
           <td>{email}</td>
           <td><a href="https://sandbox.braintreegateway.com/merchants/9y2st4x3h54t8n58/customers/{customerId}" target="_blank">{customerId}</a></td>
           <td>{apps.length}</td>
         </tr>
       </tbody>
     </table>


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
