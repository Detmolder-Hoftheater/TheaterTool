Ext.define('TheaterTool.view.tabPanel.revenue.RevenueMenuItemTree', {
    extend: 'Ext.tree.Panel',
    requires:[
    'Ext.tree.*',
    'TheaterTool.model.MonthNumber'],
    
    reserveScrollbar: true,
    
    useArrows: true,
    rootVisible: false,
    
    bodyPadding: 5,
    
    header: false,
    hideHeaders: true,
    
    border: true,
    
    flex: 1,
    width: 200,
    
    collapsible: true,
    
    workPanel: null,
    sourcePanel: null,
    rismPanel: null,
    repertoirePanel: null,
    beatPanel: null,
    workName: null,
    
    navButton: null,
    year: null,
    
    initComponent: function () {
        
        var me = this;
        
        
        this.listeners = {
            
            selectionchange: function (selected, eOpts) {
                if (typeof eOpts[0] !== 'undefined') {
                    me.repertoirePanel.removeAll(true);
                    me.workPanel = new TheaterTool.view.tabPanel.revenue.RevenuePanelDetails({
                        month: eOpts[0].data.name, year: me.year
                    });
                    me.repertoirePanel.add(me.workPanel);
                    me.navButton.setText('<b style="color:gray;">' + eOpts[0].data.name + '</b>');
                }
            }
        };
       
        this.columns =[ {
            useArrows: true,
            dataIndex: 'name',
            flex: 1,
            menuDisabled: true
        }];
        
        this.callParent();
    },
    
    setRepertoirePanel: function (repertoirePanel) {
        
        this.repertoirePanel = repertoirePanel;
    },
    
    setNavButton: function (navButton) {
        
        this.navButton = navButton;
    }
});