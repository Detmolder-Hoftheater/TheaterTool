/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel', {
	extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',
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
	
	
	initComponent: function () {
	

				this.navTreeStore.sort('name');
	
	
	
    this.items = [
    ]
    	this.callParent();
	}
});