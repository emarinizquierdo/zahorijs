<zjs-user-card>

    <!-- Basic Card -->
    <div class="card">
        <div class="card-content ">
            <div class="row">
                <form class="col s12">
                    <div class="row">

                        <ul class="collection with-header">
                            <li class="collection-header">
                                <h6>{user.email}</h6>
                            </li>
                            <li class="collection-item">
                                <a class="waves-effect waves-light btn {'red darken-4' : user.apiKey, 'blue' : !user.apiKey}" onclick="{generateApiKey}"><span if="{user.apiKey}">Re</span>Generate API KEY</a>
                            </li>
                            <li if="{user.apiKey}" class="collection-item grey-text">{user.apiKey}</li>
                        </ul>

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
        this.save = save;
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
                if(res && res.body){
                  _shared.zsjUserPhantom.user = res.body;
                }
                self.hasToSave = false;
                self.update();
            });

        }

        function generateApiKey() {
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
