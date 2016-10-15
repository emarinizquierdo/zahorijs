<zjs-modal>

    <div id="genericmodal" class="modal">
        <div class="modal-content">
            <h4>{message}</h4>
        </div>
        <div class="modal-footer">
            <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="{close}">Cancel</a>
            <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="{onAgree}">Yes</a>
        </div>
    </div>

    <script>

        var self = this;

        /* Public Vars */
        self.message = '';

        /*Public Methods */
        this.open = open;
        this.onAgree;
        this.close = close;

        /* Private Methods */
        function open(callback) {
            self.onAgree = callback;
            $('#genericmodal').openModal();
        }

        function close() {
            $('#genericmodal').closeModal();
        }

        this.on('mount', function () {
            self.message = self.opts.message;
        });
        
    </script>

    <style scoped></style>

</zjs-modal>
