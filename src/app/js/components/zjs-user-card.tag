<zjs-user-card>

    <!-- Basic Card -->
    <div class="card">
        <div class="card-content ">
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate">
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row valign-wrapper">
                        <div class="input-field col s6 valign">
                            <a class="waves-effect waves-light btn" onclick="{generateApiKey}">Generate API KEY</a>
                        </div>
                        <div class="col s6 valign">
                            <span class="valign">{apiKey}</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card-action">
            <a class="waves-effect  btn-flat" onclick="{save}">Save</a>
        </div>
    </div>

    <script>

        import superagent from 'superagent';
        import properties from '../properties';

        var self = this;
        self.email = "";
        self.apiKey = "";

        function save() {
debugger;
            superagent.post(properties.services.user).send({email: self.email.value, apiKey: self.apiKey.value}).end(function (err, res) {
                // Calling the end function will send the request
            });

        }

        function generateApiKey(){
          self.apiKey = new Date().getTime();
        }

        this.save = save;
        this.generateApiKey = generateApiKey;

    </script>
</zjs-user-card>
