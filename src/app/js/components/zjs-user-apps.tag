<zjs-user-apps>

    <!-- Basic Card -->
    <div>
      <div class="row"></div>
      <div class="row"></div>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <table if="{apps.length || adding}">
                            <thead>
                                <tr>
                                    <th data-field="id" class="col s3 l3">AppId</th>
                                    <th data-field="name" class="col s5 l5">App Description</th>
                                    <th data-field="price" class="col s3 l3">Creation Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr each={ apps }>
                                    <td class="col s3 l3 {'disabled-row':!active}">{appId}</td>
                                    <td class="col s5 l5 grey-text {'disabled-row':!active}">{appName}</td>
                                    <td class="col s3 l3 grey-text {'disabled-row':!active}"><zjs-date time="{timestamp}"></zjs-date></td>
                                    <td class="col s1 l1 {'disabled-row':!active}" ><i class="pointer fa fa-times red-text text-darken-4" aria-hidden="true" onclick="{openModal}"></i></td>
                                </tr>
                                <tr if="{adding}">
                                    <td class="col s3 l3"><input placeholder="App Id" id="app_id" type="text" class="validate"></td>
                                    <td class="col s5 l5"><input placeholder="App Name" id="app_name" type="text" class="validate"></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table><div class="row"></div>
                        <div if="{!apps.length}">Add a new tour for your application.<div class="row"></div></div>
                        <a class="waves-effect waves-light btn blue darken-3" if="{!adding}" onclick="{addNew}">Add new</a>
                        <a class="waves-effect waves-light btn green" if="{adding}" onclick="{saveNew}">Save</a>
                        <a class="waves-effect waves-light btn red darken-4" if="{adding}" onclick="{cancelNew}">Cancel</a>
                    </div>
                </form>
            </div>
            <div if="{hasToSave}"><div class="row"></div>
                <a class="waves-effect  btn-flat" onclick="{save}">Save</a>
            </div>
            <zjs-modal id="deleteModal" message="Are you sure you want to remove this item?"></zjs-modal>
        </div>


    <script>

        import superagent from 'superagent';
        import properties from '../properties';
        import './zjs-modal.tag';
        import './zjs-date.tag';

        /* Binding */
        var self = this;

        /* Public Variables */
        this.user = _shared.zsjUserPhantom.user;
        this.apps = [];
        this.adding = false;

        /* Public Methods */
        this.addNew = addNew;
        this.cancelNew = cancelNew;
        this.saveNew = saveNew;
        this.openModal = openModal;

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

        function removeApp( id ){

          superagent.delete(properties.services.apps + "/" + id).end(function (err, res) {

            if(res && res.body){
              self.apps = res.body;
            }

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

        function openModal(e){
          self['deleteModal']._tag.open(function(){
            removeApp(e.item.appId);
          });
        }

    </script>

    <style scoped>

        .disabled-row {
            color: #dcdcdc!important;
        }

    </style>

</zjs-user-apps>
