namespace NetPaste.Models
{
    public class PasteData
    {
        public string Type { get; set; }

        public string Value { get; set; }

        public PasteData(string type, string value)
        {
            this.Type = type;
            this.Value = value;
        }
    }
}