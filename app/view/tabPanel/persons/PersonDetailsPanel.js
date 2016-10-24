/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.persons.PersonDetailsPanel', {
	extend: 'Ext.panel.Panel',
  //  xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',
  
	flex: 1,

selection: null,
	
    bodyBorder: false,
   // border: false,
  //  bodyPadding: 5,
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
	
	navTree: null,
	repertoirePanel: null,
	
	initComponent: function () {
	 var me = this;
Ext.Ajax.request({
				 url: 'resources/xql/getPersonsForSelection.xql',
				async: false,
				method: 'GET',
				params: {
					selection: me.selection
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					
					var persons_list = json.persons;
					//console.log(json);
					
					me.navTree = new TheaterTool.view.tabPanel.persons.PersonNavigationTree({persons_list: persons_list});
					

	me.repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
	
	me.navTree.setRepertoirePanel(me.repertoirePanel);
	//me.add(me.navTree);
	//me.add(me.repertoirePanel);
    me.items = [
       me.navTree,
       me.repertoirePanel
    ]

}
});
	
    	me.callParent();
	}
});