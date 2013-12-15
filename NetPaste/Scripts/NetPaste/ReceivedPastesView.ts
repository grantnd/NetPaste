/// <reference path="../typings/moment/moment.d.ts" />
/// <reference path="../typings/handlebars/handlebars.d.ts" />
module NetPaste {
    export class ReceivedPastesView {
        private listElementId = '#receivedPastesList';

        constructor(initialPastes: server.Paste[]) {
            if (initialPastes !== null) {
                for (var i = initialPastes.length-1; i >= 0; i--) {
                    this.addPaste(initialPastes[i]);
                }
                $('#deletePastes').show();
            }            
        }

        public addPaste(paste: server.Paste) {
            this.prependPaste(paste, $(this.listElementId));
            $('#deletePastes').show();
        }

        private prependPaste(paste: server.Paste, element: JQuery) {
            element.prepend(
                '<div id="paste' + paste.Id + '" class="panel panel-info">' +
                    '<div class="panel-heading">' +
                        '<p><b>From:</b> ' + paste.Sender.UserId + ' (' + paste.Sender.HostAddress + ')</p>' +
                        '<p><b>On:</b> ' + moment(paste.Received).format('dddd, MMM Do YYYY [at] h:mm:ssa') + ' </p>' +
                    '</div>' +
                    '<div class="panel-body">' +
                        '<div id="pastePreview' + paste.Id + '" class="pull-left"></div>' +
                        '<div class="pull-right"><button id="copyButton' + paste.Id + '" class="btn btn-primary">Copy</button></div>' + 
                    '</div>' +
                '</div>');

            this.appendPreview(paste, element.find('#pastePreview' + paste.Id));
        }

        private appendPreview(paste: server.Paste, element: JQuery) {

            if (paste.Data.Type === "text/plain") {
                if (paste.Data.Value.indexOf("http") == 0) {
                    element.append('<a href="' + paste.Data.Value + '" target="_blank">' + paste.Data.Value + '</a>');
                }
                else {
                    element.append(paste.Data.Value);
                }
            }
            else if (paste.Data.Type === "image/png") {
                var data = atob(paste.Data.Value);

                var byteNumbers = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    byteNumbers[i] = data.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: paste.Data.Type });

                var url = URL.createObjectURL(blob);
                var img = new Image();

                img.src = url;
                img.classList.add('img-thumbnail');
                img.classList.add('img-responsive');
                element.append(img);
            }
            else {
                element.append('Unknown type');
            }
        }

        public deleteAllPastes() {
            $(this.listElementId).empty();
            $('#deletePastes').hide();
        }
    }
}