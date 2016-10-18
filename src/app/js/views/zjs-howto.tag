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

    </div>

    <script>
        hljs.highlightBlock(this.codigo);
        hljs.highlightBlock(this.codigo2);
    </script>

    <style scoped>
        .html {
            }

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

    </style>

</zjs-howto>
