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
    
    sourceId: null,
    
    initComponent: function () {
    
        var me = this;
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree();
        var navTreeStore = new TheaterTool.store.work.ExtWork();
        navTreeStore.getProxy().extraParams.workName = me.selection;
        navTreeStore.load();       
        navTree.getView().bindStore(navTreeStore);
        navTree.setRepertoirePanel(me);
        navTree.setWorkSelection(me.selection);
        
        
        
        var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();       
        navTree.setRepertoirePanel(repertoirePanel);
        
        var workPanel = null;
        
        if(me.sourceId === null){
        workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails({workID: me.selection, title:'<font size="2" face="Arial" style="color:#A87678;">Werk: '+me.workName+'</font>', icon: me.workIcon});
	    repertoirePanel.add(workPanel);
	    
	   // workPanel.setTitle('<font size="2" face="Arial" style="color:#A87678;">Werk: '+me.workName+'</font>');
		//workPanel.setIcon(me.workIcon);
		}
		else{
		    workPanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel({sourceID: me.sourceId, werkTitle:'<font size="2" face="Arial" style="color:#A87678;">Werk: '+me.workName+'</font>'});
					repertoirePanel.add(workPanel);
					
					
					 
					
		}
        
        me.items =[
        repertoirePanel,
            navTree
            
        ]
        me.callParent();
    }
});