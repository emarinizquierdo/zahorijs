<zjs-howto>

    <div>
        <h4>how to use</h4>
        <h5>Add the dependency</h5>
        <pre><code id="codigo" class="html">&lt;script src=&quot;//zahorijs/lib/zahorijs.min.js&quot;&gt;&lt;/script&gt;</code></pre>
        <h5>Generate your API KEY</h5>
        <p>You have to sign up, generate your API KEY, and create an APP ID. You have one tour for free!! Try ZahoriJS and check our prices!</p>
        <h5>Setup your tour:</h5>
        <pre><code id="codigo2" class="html">&lt;button onclick=&quot;initTour()&quot;&gt;init tour&lt;/button&gt;
&lt;script&gt;
zahorijs.init({apiKey: 'API_KEY', appId: 'APP_ID'});
&lt;/script&gt;</code></pre>

        <div>
          <h5>Install the ZahoriJs Chrome Extension Editor</h5>
          <div class="row valign-wrapper">
            <div class="col s1 center-align">
            <a class="s-wa  e-f-s" href="https://chrome.google.com/webstore/detail/zahorijs/fnpgnienaolefadnnahnhjimnflmkcha" target="_blank">
                <div class="od-s-wa"><img alt="Extensión" aria-label="Extensión" src="https://lh3.googleusercontent.com/Ny4KyKFibvV4XGfTRTfjJn6mh09DA5axdvC9qWKcpomz8l46Fg22QUCNONfku7UpDeJx3DJO1KU=s26-h26-e365-rw" class="e-f-s" style=" width:26px; height:26px;"></div>
            </a>
          </div>
          <div class="col s11">
            With the ZahoriJs Chrome Extension Editor, you only have to execute in the application you want to include your tour, configure with the API_KEY and APP_ID the editor, and you only have to select the elements you want to highlight. Easy!
          </div>
        </div>
    </div>

    <script>
        hljs.highlightBlock(this.codigo);
        hljs.highlightBlock(this.codigo2);
    </script>

    <style scoped>
        .html {}

        pre {
            display: block;
            padding: 9.5px;
            margin: 0 0 10px;
            font-size: 13px;
            line-height: 1.42857143;
            color: #333;
            word-break: break-all;
            word-wrap: break-word;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .hljs {
            background: none;
        }

        .hljs-deletion,
        .hljs-number,
        .hljs-quote,
        .hljs-selector-class,
        .hljs-selector-id,
        .hljs-string,
        .hljs-template-tag,
        .hljs-type {
            color: #4d90fe;
        }

        .od-s-wa {
          display: inline-block;
            position: relative;
            height: 64px;
            width: 64px;
            background: no-repeat url("https://ssl.gstatic.com/chrome/webstore/images/sprites/common-64d82d8bc25b46502043dc430960d017.png") 0 0;
        }

        .od-s-wa > .A-Ce-ze-k,
        .od-s-wa > img {
            position: absolute;
            top: 19px;
            left: 19px;
            right: auto;
            height: 26px;
            width: 26px;
            margin: 0;

            width: 26px;
            height: 26px;
        }

        h5{
          margin-top: 30px;
        }

    </style>

</zjs-howto>
