Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab', {
extend: 'Ext.panel.Panel',
/*layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    border: false,*/
    extend: 'Ext.panel.Panel',
    
    requires:['Ext.layout.container.Border'],
    layout: 'border',
    flex: 1,
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
    
        //var me = this;
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree();
        var navTreeStore = new TheaterTool.store.work.ExtWork();
        navTreeStore.getProxy().extraParams.workName = this.selection;
        navTreeStore.load();       
        navTree.getView().bindStore(navTreeStore);
        navTree.setRepertoirePanel(this);
        navTree.setWorkSelection(this.selection);
        
        var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();       
        navTree.setRepertoirePanel(repertoirePanel);
        
        var workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails({workID: this.selection});
	    repertoirePanel.add(workPanel);
        
        this.items =[
        repertoirePanel,
            navTree
            
        ]
        this.callParent();
    }
});