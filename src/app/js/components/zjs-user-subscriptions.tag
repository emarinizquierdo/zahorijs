<zjs-user-subscription>

    <!-- Basic Card -->
    <div>

        <div class="row">
            <div class="row">
                <h5>Upgrade plans</h5>

                Si nece
            </div>
            <div class="col s12 l12">

                <div class="row">

                    <ul class="collection with-header">

                        <li class="collection-header">
                            <h6>Subscripción actual:
                              <strong>
                                <span if="{subscriptions.data.planType == 'm97r'}">{subscriptions.data.planType}</span>
                                <span if="{!subscriptions.data}">basic</span>
                              </strong>
                            </h6>
                        </li>
                        <li class="collection-header">
                            <h6>Max application user tours:
                                <span if="{subscriptions.data.planType == 'm97r'}">10</span>
                                <span if="{!subscriptions.data}">1</span>
                            </h6>
                        </li>
                        <li class="collection-item">
                            <div class="row" if="{!subscriptions.data}">
                                <div>
                                    <span>Subscribe Today</span>
                                </div>

                                <div layout="row">
                                    <p>Choose a plan below to get started.</p>
                                </div>

                                <div layout="row">
                                    <p>Your credit card information will not interact with our servers.</p>
                                </div>
                                <a id="paypal-button" class="waves-effect waves-light white btn">
                                    <img src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg"></img>
                                </a>
                            </div>
                            <a class="waves-effect waves-light btn" if="{subscriptions.data}" onclick="{cancelSubscriptions}">Anular subscripción</a>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    </div>

    <script>

        import subs from '../model/subscriptions';
        import superagent from 'superagent';
        import properties from '../properties';

        /* Binding */
        var self = this;

        /* Private Vars */
        var oldKey;

        /* Public Variables */
        this.subscriptions = subs;
        this.data = subs.data;
        this.cancelSubscriptions = _cancelSubscriptions;

        /* Private Methods */
        function _setup(token) {

            braintree.client.create({
                authorization: token
            }, function (clientErr, clientInstance) {
                braintree.paypal.create({
                    client: clientInstance
                }, function (paypalErr, paypalInstance) {

                    // Wire up your very own PayPal button
                    var myButton = document.querySelector('#paypal-button');

                    myButton.addEventListener('click', function (event) {

                        event.preventDefault();
                        // Because this opens a popup, this has to be called as a result of customer action, like clicking a button—you cannot call this at any time.
                        paypalInstance.tokenize({
                            // Your PayPal options
                            flow: 'vault'
                        }, function (tokenizeErr, payload) {
                            // Submit payload.nonce
                            self.subscriptions.billing(payload.nonce, _getSubscriptions);
                        });

                    }, false);
                });
            });

        }

        function _getSubscriptions() {

            self.subscriptions.get(function () {

                self.update();

                if (!self.subscriptions.data) {
                    _paintPaypal();

                } else {}

            });
        }

        function _cancelSubscriptions() {

            self.subscriptions.cancel(function () {

                self.update();

                if (!self.subscriptions.data) {
                    _paintPaypal();

                } else {}

            });
        }

        function _paintPaypal() {

            var token = self.subscriptions.token;

            if (token) {

                _setup(token);

            } else {

                self.subscriptions.on("token_ready", function (data) {
                    _setup(self.subscriptions.token);
                });

            }

        }

        /* Initialization */
        this.on("mount", function (a) {
            _getSubscriptions();
        });

    </script>
    <style scoped>

        #paypal-button img {
            width: 75px;
            vertical-align: middle;
        }

    </style>
</zjs-user-subscription>
