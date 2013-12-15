module NetPaste {
    export class SendPasteView {
        private listElementId = '#recipients-list';

        public updateRecipients(recipients: Array<server.UserProfile>) {
            var list = $(this.listElementId);
            list.empty();

            for (var i = 0; i < recipients.length; i++) {
                list.append('<div class="checkbox">' +
                    '<label>' +
                    '<input type="checkbox" data-user-id="' + recipients[i].UserId + '" />' + recipients[i].UserId + ' (' + recipients[i].HostAddress + ')' +
                    '</label>' +
                    '</div>');
            }
        }

        public getSelectedRecipientUserIds(): Array<string> {
            var userIds = new Array<string>();

            $(this.listElementId).find('input').each(function () {
                if (this.checked) {
                    userIds.push($(this).data('user-id'));
                }
            });

            return userIds;
        }
    }
}