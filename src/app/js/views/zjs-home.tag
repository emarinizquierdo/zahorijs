<zjs-home>
    <div>
        <div id="blackmainwrapper" class="blackmainwrapper">
            <div id="blackmain" class="parallax black">
                <div class="promo__wrap">
                    <div class="site__centered black">

                        <!-- promo__content -->
                        <div class="promo__content black">

                            <!-- promo__topic -->
                            <h2 class="promo__topic white-text main-logo">ZahoriJs.</h2>
                            <!-- /promo__topic -->

                            <p class="white-text logo-subtitle">Step-by-step guide and feature introduction</p>
                        </div>
                        <!-- /promo__content -->

                        <!-- promo__logo -->
                        <div class="promo__logo" id="logov8"></div>
                        <!-- /promo__logo -->

                        <!-- btn -->
                        <a href="#sharpest-icons" class="btn  blue darken-3 white-text" onclick="{start}">
                            <span>Show Me More</span>
                        </a>
                        <!-- /btn -->

                    </div>
                </div>

            </div>

        </div>
        <div class="section white">
            <div class="row container">
              <zjs-intro></zjs-intro>
              <zjs-features></zjs-features>
              <zjs-howto></zjs-howto>
            </div>
        </div>
        <div class="footer">


        </div>
    </div>

    <script>

      import './zjs-intro.tag';
      import './zjs-features.tag';
      import './zjs-howto.tag';

        var self = this;

        this.on("mount", function () {
            window.addEventListener('resize', function () {
                self['blackmain'].height = window.innerHeight + "px";
                self['blackmainwrapper'].style.height = window.innerHeight + "px";
            }, true);
            self['blackmain'].height = window.innerHeight + "px";
            self['blackmainwrapper'].style.height = window.innerHeight + "px";
            $('.parallax').parallax();
        })

        self.start = function () {
            zahorijs.init({apiKey: "KEYe0e2880ef57022a887e4143f5cea2", appId: "testing"});
        }

    </script>

    <style>
        .main-logo {
            font-family: 'Oswald', sans-serif;
        }

        .logo-subtitle {
            font-family: 'Abel', sans-serif;
            font-size: 22px;
        }
        .parallax {
            z-index: 0;
        }
        .blackmainwrapper {
            position: inherit;
        }

        .site__centered {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 1248px;
            padding: 0 20px;
            margin: 0 auto;
            text-align: center;
        }

        .promo__wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            width: 100%;
            height: 100vh;
        }

        .promo__content {
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 18px;
        }

        .footer{
          height: 100px;
          background: #111;
        }
    </style>
</zjs-home>
