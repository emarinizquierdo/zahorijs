<zjs-user-card>

    <!-- Basic Card -->
    <div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row">
          <h5>API KEY</h5>
            Genera una API KEY para poder crear tours para tus aplicaciones. <br/>Esta KEY tendrás que utilizarla en tu aplicación.
            Si vuelves a generar una nueva API KEY, asegúrate de cambiarla allá donde la uses.
        </div>
        <div class="row">

            <form class="col s12 l12">
                <div class="row">

                    <ul class="collection with-header">
                        <li class="collection-header">
                            <h6>{user.email}</h6>
                        </li>
                        <li class="collection-item">
                            <a class="waves-effect waves-light btn {'red darken-4' : user.apiKey, 'blue' : !user.apiKey}" onclick="{generateApiKey}">
                                <span if="{user.apiKey}">Re</span>Generate API KEY</a>
                        </li>
                        <li if="{user.apiKey}" class="collection-item grey-text">{user.apiKey}</li>
                    </ul>

                </div>
            </form>
            <div class="col s12 l12">

            </div>
        </div>
        <div if="{hasToSave}">
            <a class="waves-effect  btn-flat" onclick="{save}">Save</a>
            <a class="waves-effect  btn-flat" onclick="{cancel}">Cancel</a>
        </div>
        <zjs-user-subscription></zjs-user-subscription>
    </div>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';
        import userCard from '../components/zjs-user-subscriptions.tag'

        /* Binding */
        var self = this;

        /* Private Vars */
        var oldKey;

        /* Public Variables */
        this.save = save;
        this.cancel = cancel;
        this.generateApiKey = generateApiKey;
        this.user = _shared.zsjUserPhantom.user;
        this.hasToSave = false;

        /* Initialization */
        this.on("mount", function (a) {
            window._shared.zsjUserCard = self;
        });

        function save() {

            superagent.put(properties.services.user).send({apiKey: self.user.apiKey}).end(function (err, res) {

                // Calling the end function will send the request
                if (res && res.body) {

                    _shared.zsjUserPhantom.user = res.body;
                    _shared.zsjUserPhantom.persistUser();
                }
                self.hasToSave = false;
                self.update();
            });

        }

        function cancel() {
            self.user.apiKey = oldKey;
            self.hasToSave = false;
        }

        function generateApiKey() {
            oldKey = self.user.apiKey;
            self.user.apiKey = generateUUID();
            self.hasToSave = true;
        }

        function generateUUID() {
            var d = new Date().getTime();

            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();
            }

            var uuid = 'KEYxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x'
                    ? r
                    : (r & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }

    </script>
</zjs-user-card>
