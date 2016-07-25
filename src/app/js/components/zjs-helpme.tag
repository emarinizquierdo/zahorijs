<zjs-helpme class="right-align">

    <span>
        <a id="helpme" class="right-align waves-effect waves-light btn  blue lighten-2" onclick="{init}">Help me!</a>
    </span>

    <script>

        var self = this;

        /* Public Vars */
        this.tourId;
        this.apiKey;

        /*Public Methods */
        self.init = function(){
          zahorijs.init({apiKey:self.apiKey, appId: self.tourId});
        }

        this.on('mount', function () {
          self.tourId = self.opts.tourid;
          self.apiKey = self.opts.apikey;
        });

    </script>

    <style scoped>

      :scope{
        right: 0px;
        position: absolute;
        margin: 10px;
      }

      #helpme{
        height: 25px;
        /* width: 37px; */
        font-size: 14px;
        padding: 0 10px;
        line-height: 27px;
      }
    </style>

</zjs-helpme>
