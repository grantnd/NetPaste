(function (Handlebars) {

    Handlebars.registerHelper("format-date", function (format, date, options) {
        return moment(date).format(format);
    });

}(window.Handlebars));