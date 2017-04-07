var parser = parser || new SwaggerParser();
var defs = null;
var editor = null;

parser.dereference("https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json")
    .then(function(api) {
        defs  = api.definitions;
        for (var item in defs) {
            var parts = item.split('.');
            var lastSegment = parts.pop() || parts.pop();
            $('#resource').append($('<option>', {value:item, text: lastSegment}));
        }
    });


$(document).ready(function() {
    $('#resource').change(function(){
        var key = $('#resource').val();
        create_editor(defs[key]);
    });
});



function create_editor(schema) {
    editor && editor.destroy();
    editor = new JSONEditor(document.getElementById('editor_holder') ,{
        schema: schema,
        theme: 'jqueryui'
    });
}

