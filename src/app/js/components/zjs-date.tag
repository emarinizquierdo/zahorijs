<zjs-date>

    <span>
        {day}-{month}-{year}
    </span>

    <script>

        var self = this;

        /* Public Vars */
        this.day;
        this.month;
        this.year;

        /*Public Methods */

        this.on('mount', function () {
          self.day = new Date(self.opts.time).getDate();
          self.month = new Date(self.opts.time).getMonth() + 1;
          self.year = new Date(self.opts.time).getFullYear();

        });

    </script>

    <style scoped>

    </style>

</zjs-date>
