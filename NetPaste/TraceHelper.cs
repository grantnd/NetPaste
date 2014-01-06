namespace NetPaste
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class TraceHelper
    {
        public static string FormatErrorMessage(
            string message, 
            Exception ex,
            Dictionary<string, object> data = null)
        {
            return string.Format("{0}: {1}\r\n{2}{3}", message, ex.Message, ex.StackTrace, FormatData(data));
        }

        private static string FormatData(Dictionary<string, object> data)
        {
            if(data == null)
            {
                return string.Empty;
            }

            StringBuilder sb = new StringBuilder();

            foreach(var datum in data)
            {
                sb.AppendFormat("{0} = {1}\r\n", datum.Key, datum.Value);
            }

            return sb.ToString();
        }
    }
}