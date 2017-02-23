Ext.define('TheaterTool.model.Theaterakte', {
    extend: 'Ext.data.Model',
    fields:[ {
        name: 'name', type: 'string'
    }, {
        name: 'date', type: 'string'
    }, {
        name: 'details1', type: 'string'
    }, {
        name: 'details1', type: 'string'
    }, {
        name: 'workKey', type: 'string'
    }, {
        name: 'createContent', type: 'auto'
    }, {
        name: 'persons', type: 'auto'
    }, {
        name: 'anmerkung', type: 'string'
    }, {
        works: 'works', type: 'auto'
    }
    ]
});