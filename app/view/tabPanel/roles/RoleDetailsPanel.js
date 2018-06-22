Ext.define('TheaterTool.view.tabPanel.roles.RoleDetailsPanel', {
    extend: 'Ext.panel.Panel',
    requires:[
    'Ext.layout.container.Border'],
    layout: 'border',
    
    flex: 1,
    
    navTreetitle: null,
    
    bodyBorder: false,
    border: false,
    style: {
        borderRight: '7px solid white',
        borderLeft: '7px solid white',
        borderTop: '7px solid white',
        borderBottom: '7px solid white'
    },
    
    defaults: {
        autoScroll: true,
        split: true
    },
    
    selection: null,
    
    initComponent: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getRolesForSelection.xql',
            async: false,
            method: 'GET',
            params: {
                selection: me.selection
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                
                var persons_list = json.roles;
                
                var navTree = new TheaterTool.view.tabPanel.roles.RolesNavigationTree({
                    persons_list: persons_list, title: me.navTreetitle
                });
                
                var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
                
                navTree.setRepertoirePanel(repertoirePanel);
                
                me.items =[
                navTree,
                repertoirePanel]
            }
        });
        
        me.callParent();
    }
});