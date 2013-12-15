namespace NetPaste
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Paste
    {
        public int? Id { get; set; }

        public PasteData Data { get; set; }

        public string Sender { get; set; }

        public DateTime Received { get; set; }
    }
}