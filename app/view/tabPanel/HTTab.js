/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
/*Ext.define('TheaterTool.view.tabPanel.HTTab', {
	extend: 'Ext.panel.Panel',

requires:[
	'Ext.layout.container.VBox'],
	flex: 1,
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},

	bodyPadding: 10,
	autoScroll: true,

	closable: true,
	
	repertoireNavigation: null,
	repertoireDetails: null,
	
	initComponent: function () {
	
		this.callParent();
	}
});*/
/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.HTTab', {
	extend: 'Ext.panel.Panel',
requires:[
	'Ext.layout.container.VBox'],
	//xtype: 'layout-vertical-box',
	flex: 1,
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},


bodyPadding: 10,

border:false,
bodyBorder: true,
	
	closable: true,
	
	activeMenuItemId: null,

	/*defaults: {
		frame: true,
		autoScroll: true
	},*/
	
	/* style: {
     // borderRight: '5px solid #A80016'
      borderLeft: '1px solid #FFF',
      borderTop: '1px solid #FFF',
      borderBottom: '1px solid #FFF'
    },*/
	
	
	//bodyPadding: 5,
	//border: false,
	
	autoScroll: true,
	
	repertoireNavigation: null,
	repertoireDetails: null,
	isMenuAdded: null,
	
	initComponent: function () {
	
	var me = this;
	
	//this.repertoireNavigation = new TheaterTool.view.tabPanel.repertoire.RepertoireAlphNavigation();
	
	//this.repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel();
		
	//	this.items =[
		//this.repertoireNavigation,
	//	this.repertoireDetails
	//	];
	
	
	me.listeners = {
            beforeclose: function( panel, eOpts ){
                var historyButton = Ext.getCmp('historyButton'); 
                var menuItems = historyButton.menu.items;
                var itemsToDelete = new Array();
                for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];
                         
                        if (existItem.text === panel.title) {
                        itemsToDelete.push(existItem);
            }
        }
               for(i = 0; i < itemsToDelete.length; i++){
                    var itemToDelete = itemsToDelete[i];
                   historyButton.menu.remove(itemToDelete, true);
               }
               if(menuItems.items.length === 0){
                   historyButton.setDisabled(true);
               }
               var toolBar = Ext.getCmp('toolbar'); 
               toolBar.handleHistoryButtons(); 
               var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
               var openTabs = navTreeGlobal.items;
               for (i = 0; i < openTabs.items.length; i++) {
                  var openTab = openTabs.items[i];  
                  openTab.setMenuAdded(true);      
                }    
            }
            
        }
	
		
		this.callParent();
	},
	
	setActiveMenuItemId: function(activeMenuItemId){
	 this.activeMenuItemId = activeMenuItemId;
	// console.log("Set in HTTab : "+ activeMenuItemId);
	    
	},
	
	setMenuAdded: function(isMenuAdded){
	    this.isMenuAdded = isMenuAdded;
	}
});