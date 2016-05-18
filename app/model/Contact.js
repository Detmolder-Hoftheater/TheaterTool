Ext.define('TheaterTool.model.Contact', {
    extend: 'Ext.data.Model',

    fields: [
{name: 'einheit', mapping: 'titleStmt/title[@type ="uniform"]'},
{name: 'title', mapping: 'titleStmt/title'},
{name: 'alternativ', mapping: 'titleStmt/title[@type ="alt"]'},
{name: 'untertitel', mapping: 'titleStmt/title[@type ="sub"]'}

       /* {name: 'title', mapping: 'titleStmt > title/@analog'},*/
//        {name: 'last', mapping: 'titleStmt/title[@type ="uniform"]'},
//{name: 'title', type: 'auto', mapping:'titleStmt/title[@type ="sub"]'}
//{name: 'instrVoice', type: 'auto', mapping: 'instrumentation/instrVoice'
/*convert: function(data, model) {
                // Ensure that roles is always returned as an array of values. This is necessary
                // because if this model is populated with values from a form, the roles property
                // may be set to a single string instead of an array. But when this model is
                // saved back to the server, its fields will be "read" out, and this converter fcn
                // will have a chance to ensure 'roles' is returned as an array.
console.log(data);
console.log(model);
                //data = ( data && !Ext.isArray(data) ) ? [data] : data;
                return data;
            }*/

//}


/*,
        'company', 'email', 'state',
        {name: 'dob', type: 'date', dateFormat: 'm/d/Y'}*/
    ]
});