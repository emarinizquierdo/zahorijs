<zjs-user-apps>

    <!-- Basic Card -->
    <div class="card">
        <div class="card-content ">
            <div class="row">
                <form class="col s12">
                    <div class="row">

                        <table>
                            <thead>
                                <tr>
                                    <th data-field="id">AppId</th>
                                    <th data-field="name">App Name</th>
                                    <th data-field="price">Creation Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr each={ apps }>
                                    <td>{appId}</td>
                                    <td>{appName}</td>
                                    <td>{timestamp}</td>
                                </tr>
                                <tr if="{adding}">
                                    <td><input placeholder="App Id" id="app_id" type="text" class="validate"></td>
                                    <td><input placeholder="App Name" id="app_name" type="text" class="validate"></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="waves-effect waves-light btn blue" if="{!adding}" onclick="{addNew}">Add new</a>
                        <a class="waves-effect waves-light btn green" if="{adding}" onclick="{saveNew}">Save</a>
                        <a class="waves-effect waves-light btn red darken-4" if="{adding}" onclick="{cancelNew}">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
        <div class="card-action" if="{hasToSave}">
            <a class="waves-effect  btn-flat" onclick="{save}">Save</a>
        </div>
    </div>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';

        /* Binding */
        var self = this;

        /* Public Variables */
        this.user = _shared.zsjUserPhantom.user;
        this.apps = [];
        this.adding = false;
        this.addNew = addNew;
        this.cancelNew = cancelNew;
        this.saveNew = saveNew;

        /* Initialization */
        this.on("mount", function (a) {
            window._shared.zsjUserApps = self;
            loadApps();
        });

        function saveNew() {

            var _appId = self["app_id"].value,
                _appName = self["app_name"].value;

            superagent.put(properties.services.apps).send({appId: _appId, appName : _appName}).end(function (err, res) {

              if(res && res.body){
                self.apps = res.body;
              }

              self.adding = false;
              self["app_id"].value = null;
              self["app_name"].value = null;
              self.update();

            });

        }

        function loadApps() {
            superagent.get(properties.services.apps).end(function (err, res) {
                if (res && res.body) {
                    self.apps = res.body;
                }
                self.update();
            });
        }

        function addNew(){
          self.adding = true;
        }

        function cancelNew(){
          self.adding = false;
        }

    </script>

</zjs-user-apps>
