(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ReceivedPasteView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "﻿<div id=\"paste";
  if (stack1 = helpers.Id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.Id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-info\">\r\n    <div class=\"panel-heading\">\r\n        <p><b>From:</b> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Sender)),stack1 == null || stack1 === false ? stack1 : stack1.UserId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Sender)),stack1 == null || stack1 === false ? stack1 : stack1.HostAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</p>\r\n        <p><b>On:</b> "
    + escapeExpression(helpers['format-date'].call(depth0, "dddd, MMM Do YYYY [at] h:mm:ssa", (depth0 && depth0.Received), {hash:{},data:data}))
    + "</p>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n        <div id=\"pastePreview";
  if (stack2 = helpers.Id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.Id); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"pull-left\"></div>\r\n        <div class=\"pull-right\"><button id=\"copyButton";
  if (stack2 = helpers.Id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.Id); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"btn btn-primary\">Copy</button></div> \r\n    </div>\r\n</div>";
  return buffer;
  });
templates['SendPasteRecipientView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "﻿<div class=\"checkbox\">\r\n    <label>\r\n		<input type=\"checkbox\" data-user-id=\"";
  if (stack1 = helpers.UserId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.UserId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />";
  if (stack1 = helpers.UserId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.UserId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.HostAddress) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.HostAddress); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ")\r\n    </label>\r\n</div>";
  return buffer;
  });
})();