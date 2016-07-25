<zjs-admin>

    <div>
        <zjs-helpme apiKey="KEY8ac63f48cfc8e4052a831d7d8843f" tourId="account-help"></div>
        <div class="row"><div class="row"></div><div class="row"></div>
            <div class="col m2 l2">
                <zjs-admin-sidebar></zjs-admin-sidebar>
            </div>
            <div class="col m10 l10">
                <div class="row">

                    <div class="col s12">
                        <ul class="tabs">
                            <li class="tab col s3">
                                <a class="blue-text" href="#test1">Account Info</a>
                            </li>
                            <li class="tab col s3">
                                <a class="active blue-text" href="#test2">Apps</a>
                            </li>
                        </ul>
                    </div>

                    <div id="test1" class="col s12">
                        <zjs-user-card></zjs-user-card>
                    </div>
                    <div id="test2" class="col s12">
                        <zjs-user-apps></zjs-user-apps>
                    </div>

                </div>

            </div>

        </div>
    </div>

    <script>

        import userCard from '../components/zjs-user-card.tag'
        import userCard from '../components/zjs-user-apps.tag'
        import userCard from '../components/zjs-admin-sidebar.tag'
        import userCard from '../components/zjs-helpme.tag'

        this.on('mount', function () {
            $('ul.tabs').tabs();
        })
    </script>

    <style scoped>
      .indicator{
        background-color: #1565C0;
      }
    </style>
</zjs-admin>
