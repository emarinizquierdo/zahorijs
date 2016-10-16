<zjs-user-apps>

    <!-- Basic Card -->
    <div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <table if="{apps.apps.length || adding}">
                        <thead>
                            <tr>
                                <th data-field="id" class="col s3 l3">AppId</th>
                                <th data-field="name" class="col s5 l5">App Description</th>
                                <th data-field="price" class="col s3 l3">Creation Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr each={ apps.apps }>
                                <td class="col s3 l3 {'disabled-row':!active}">{appId}</td>
                                <td class="col s5 l5 grey-text {'disabled-row':!active}">{appName}</td>
                                <td class="col s3 l3 grey-text {'disabled-row':!active}">
                                    <zjs-date time="{timestamp}"></zjs-date>
                                </td>
                                <td class="col s1 l1 {'disabled-row':!active}">
                                    <i class="pointer fa fa-times red-text text-darken-4" aria-hidden="true" onclick="{openModal}"></i>
                                </td>
                            </tr>
                            <tr if="{adding}">
                                <td class="col s3 l3"><input placeholder="App Id" id="app_id" type="text" class="validate"></td>
                                <td class="col s5 l5"><input placeholder="App Name" id="app_name" type="text" class="validate"></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row"></div>
                    <div if="{!apps.apps.length}">Add a new tour for your application.<div class="row"></div>
                    </div>
                    <a class="waves-effect waves-light btn blue darken-3" if="{!adding}" onclick="{addNew}">Add new</a>
                    <a class="waves-effect waves-light btn green" if="{adding}" onclick="{saveNew}">Save</a>
                    <a class="waves-effect waves-light btn red darken-4" if="{adding}" onclick="{cancelNew}">Cancel</a>
                </div>
            </form>
        </div>
        <div if="{hasToSave}">
            <div class="row"></div>
            <a class="waves-effect  btn-flat" onclick="{save}">Save</a>
        </div>
        <zjs-modal id="deleteModal" message="Are you sure you want to remove this item?"></zjs-modal>
    </div>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';
        import users from '../model/users';
        import apps from '../model/apps';
        import './zjs-modal.tag';
        import './zjs-date.tag';

        /* Binding */
        var that = this;

        /* Public Variables */
        this.users = users;
        this.apps = apps;
        this.adding = false;

        /* Public Methods */
        this.addNew = addNew;
        this.cancelNew = cancelNew;
        this.saveNew = saveNew;
        this.openModal = openModal;

        /* Initialization */
        this.on("mount", function (a) {
            apps.get();
        });

        /* Private Methods */
        function saveNew() {

            var _appId = that["app_id"].value,
                _appName = that["app_name"].value;

            apps.add(_appId, _appName, function () {
                that.adding = false;
                that["app_id"].value = null;
                that["app_name"].value = null;
                that.update();
            });

        }

        function removeApp(_appId) {

            apps.remove(_appId);

        }

        function addNew() {
            that.adding = true;
        }

        function cancelNew() {
            that.adding = false;
        }

        function openModal(e) {
            that['deleteModal']._tag.open(function () {
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
