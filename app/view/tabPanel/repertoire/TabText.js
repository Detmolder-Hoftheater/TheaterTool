Ext.define('TheaterTool.view.tabPanel.repertoire.TabText', {
    extend: 'Ext.panel.Panel',
    
    autoScroll: true,
    
    searchField: null,
    
    initComponent: function () {
        
        var me = this;
        
        this.callParent();
    },
    
   createTextField: function (fieldName, fieldLabel) {
        var me = this;
        var ceTextField = Ext.create('Ext.form.field.Text', {
            id: fieldName,
            width: 235,
            listeners: {
                focus: function (e, eOpts) {
                    me.handleCreateButton();
                },
                render: function (c) {
                    c.getEl().on('keyup', function () {
                        me.handleCreateButton();
                    },
                    c);
                }
            }
        });
        
        return ceTextField;
    }
});