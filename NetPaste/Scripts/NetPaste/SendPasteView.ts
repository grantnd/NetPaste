module NetPaste {
    export class SendPasteView {
        private listElementId = '#recipients-list';

        public updateRecipients(recipients: Array<server.UserProfile>) {
            var list = $(this.listElementId);
            list.empty();

            for (var i = 0; i < recipients.length; i++) {
                list.append(Handlebars.templates.SendPasteRecipientView(recipients[i]));
            }
        }

        public getSelectedRecipientUserIds(): Array<string> {
            var userIds: Array<string> = [];

            $(this.listElementId).find('input').each(function() {
                if (this.checked) {
                    userIds.push($(this).data('user-id'));
                }
            });

            return userIds;
        }
    }
}