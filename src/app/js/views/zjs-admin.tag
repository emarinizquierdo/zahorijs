<zjs-admin>

    <div>
        <div class="row">
            <div class="col l2">
                <zjs-admin-sidebar></zjs-admin-sidebar>
            </div>
            <div class="col l10">
                <div class="row">

                    <div class="col s12">
                        <ul class="tabs">
                            <li class="tab col s3">
                                <a href="#test1">Account Info</a>
                            </li>
                            <li class="tab col s3">
                                <a class="active" href="#test2">Apps</a>
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

        this.on('mount', function () {
            $('ul.tabs').tabs();
        })
    </script>
    
</zjs-admin>
