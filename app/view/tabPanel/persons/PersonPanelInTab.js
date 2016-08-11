Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
	extend: 'Ext.panel.Panel',

 /*xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',*/
  
	//flex: 1,


    bodyBorder: false,
   // border: false,
    bodyPadding: 5,
border: false,
 /*style: {
      borderRight: '7px solid white',
      borderLeft: '7px solid white',
      borderTop: '7px solid white',
     borderBottom: '7px solid white'
    },*/
    
   
 /*  defaults: {
		autoScroll: true,
		split: true
	},*/
navButton: null,
year: null,
workPanel: null,

	initComponent: function () {
var me = this;


	me.workPanel = new TheaterTool.view.tabPanel.persons.PersonPanelDetails({year:me.year});
	
    me.items = [
       me.workPanel
    ]
    	this.callParent();
	}

});