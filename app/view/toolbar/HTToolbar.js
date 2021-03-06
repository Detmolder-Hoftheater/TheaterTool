Ext.define('TheaterTool.view.toolbar.HTToolbar', {
	extend: 'Ext.panel.Panel',
	
	requires:[
	'Ext.tip.*',
	'Ext.Button',
	'Ext.window.MessageBox'],
	
	id: 'toolbar',
	
	style: {
		//borderLeft: '3px solid #A80016',
		borderTop: '5px solid #A80016',
		borderBottom: '3px solid #A80016'
	},
	bodyBorder: false,
	border: false,
	
	htPanel: null,
	searchField: null,
	searchFilterButton: null,
	
	createToolbarItems: function(){
	var me = this;
	    if(Ext.getCmp('toolbarItems') !== 'undefined'){
	        me.searchFilterButton = me.creatButtonWithMenu();
	        
	        me.searchField = me.createSearchField(me.searchFilterButton);

	        Ext.getCmp('toolbarItems').add({
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.ordertabs+'</b></font>',
				disabled: true,
				margin: '0 0 0 10',
				menu:[ {
					text: 'Horizontal verteilen',
					icon: 'resources/images/Horizontal-17.png'
				},
				{
					text: 'Vertikal verteilen',
					icon: 'resources/images/Vertical-17.png'
				},
				{
					text: 'Stapeln',
					icon: 'resources/images/Sheets-17.png'
				}]
				//Desktop 173
			},
			{
				xtype: 'button',
                margin: '0 0 0 5',
				text: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.duplicatetab+'</b></font>',
				disabled: true,
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
					click: function (item, e, eOpts) {
					   var activeTab = me.htPanel.getHTTabPanel().getActiveTab();
					   if(activeTab !== null){
					       var clone = activeTab.cloneConfig();
					       var childClone = activeTab.items.items[0].cloneConfig();
					       clone.add(childClone);
					       
					       var historyButton = Ext.getCmp('historyButton'); 
					       var menuItem = historyButton.menu.add({text: clone.title, icon: clone.icon}); 

                            clone.setActiveMenuItemId(menuItem.id);
                            clone.setMenuAdded(true);
					   
					       me.htPanel.getHTTabPanel().add(clone);
					       me.htPanel.getHTTabPanel().setActiveTab(clone);
					       me.htPanel.getHTTabPanel().fireEvent('render', me.htPanel.getHTTabPanel());
				        }
					}
				}
			},		
	'->',
	{
			xtype: 'button',
			icon: 'resources/images/page-prev-disabled.gif',
			id: 'prevHistoryButton',
			disabled: true,
//margin: '0 5 0 0',
style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
            click: function() {                   
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var openTabs = navTreeGlobal.items;
                    
                    var historyButton = Ext.getCmp('historyButton');                   
                    var menuItems = historyButton.menu.items;
                    var itemToSelect = null;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];  
                       console.log(i);
                        if (existItem.text === selectedTab.title && i > 0  &&  selectedTab.activeMenuItemId === existItem.id) {
                             
                            itemToSelect = menuItems.items[i-1];
                            
                            break;
                        }
                    }
                    if(itemToSelect !== null){
                         for (i = 0; i < openTabs.items.length; i++) {
                        var openTab = openTabs.items[i];  
                         console.log(itemToSelect);
                         console.log(openTab);
                        if (openTab.title === itemToSelect.text) {
                             openTab.setMenuAdded(true);
                             navTreeGlobal.setActiveTab(openTab);
                             openTab.setActiveMenuItemId(itemToSelect.id);                           
                        }
                    }    
                    }
                    me.handleHistoryButtons();
                    
            }
        }
		},
	
	{
        xtype: 'button',
        id: 'historyButton',
        selection: null,
        disabled: true,
				text: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.histtabs+'</b></font>',
				margin: '0 5 0 3',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				 menu: {
        xtype: 'menu',
        items: [
            
        ],
        listeners: {
            click: function( menu, item, e, eOpts ) {
                 var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			   var existItems = navTreeGlobal.items;
			   var isFoundItem = navTreeGlobal.isItemFound(existItems, item.text, item.id);
			     menu.hide();
			     me.handleHistoryButtons();
			    if (isFoundItem) {
                      
                }               
            }
        }
    },
    listeners: {
            click: function() {
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var menuItems = this.menu.items;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];
                         //console.log("Get bei offnen existItem : "+ selectedTab);
                        // console.log("Get bei activeMenuItemId: "+ selectedTab.activeMenuItemId);
                        if (existItem.text === selectedTab.title && selectedTab.activeMenuItemId === existItem.id) {
                        //console.log(existItem.hasFocus);                       
                        existItem.focus();
                        selectedTab.setActiveMenuItemId(existItem.id);
            }
        }
        me.handleHistoryButtons();
            }
        }
				
				
    },
    {
			xtype: 'button',
			id: 'naxtHistoryButton',
			disabled: true,
			icon: 'resources/images/page-next-disabled.gif',
//margin: '0 0 0 5',
style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
            click: function() {                   
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var openTabs = navTreeGlobal.items;
                    
                    var historyButton = Ext.getCmp('historyButton');                   
                    var menuItems = historyButton.menu.items;
                    var itemToSelect = null;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];  
                       
                        if (existItem.text === selectedTab.title && i < menuItems.items.length &&  selectedTab.activeMenuItemId === existItem.id) {
                             
                            itemToSelect = menuItems.items[i+1];
                            
                            break;
                        }
                    }
                    if(itemToSelect !== undefined){
                       // selectedTab.setActiveMenuItemId(itemToSelect.id);
                         for (i = 0; i < openTabs.items.length; i++) {
                        var openTab = openTabs.items[i];  
                        if (openTab.title === itemToSelect.text) {
                            openTab.setMenuAdded(true);
                             navTreeGlobal.setActiveTab(openTab);
                             openTab.setActiveMenuItemId(itemToSelect.id);
                        }
                    }    
                    }
                    me.handleHistoryButtons();
                    
            }
        }
		},

			
'->',
 /*{

				xtype: 'label',				
        		html: 
        		'<font size = "1"><b style="color:#CC9FA7;">Suchefilter</b></font>',
        		//'<b style="color:#CC9FA7;">Filter:</b>',
        		margin: '0 10 0 10'
			},*/
			me.searchFilterButton,
	
            me.searchField,

{

				xtype: 'button',
        		html: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.extsearch+'</b></font>',
        		margin: '0 10 0 10',
disabled: true

			},

{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			},
			
			
			{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.help+'</b></font>',
				margin: '0 10 0 10',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				menu:[ 
				
				/*{
				xtype: 'component',
//margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu/Info_Hoftheaterdaten2.pdf',
        html: 'Navigation Hilfe',
		target: "_blank"
    }
    //style:{color: '#CC9FA7'}
    },*/
				{
					text: GUI_NAMES.dataRel,
					
					listeners: {
					
					click: function (item, e, eOpts) {

					var win = new TheaterTool.view.toolbar.DatenRelationWindow();
					win.show();
					}
				}
				},
				{
				xtype: 'component',
//margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheatreTool_1-Dev',
        html: GUI_NAMES.doc,
		target: "_blank"
    }
//style:{color: '#CC9FA7'}
			}
			]
				//Desktop 173
			}
				
			);
	    }
	    
	    
	},
	
	initComponent: function () {
	
	var me = this;
	
  // console.log(this.searchFilterButton);
  // console.log('***************');
    //this.searchField = this.createSearchField(this.searchFilterButton);

		me.tbar = new Ext.Toolbar({
			id: 'toolbarItems',
			style: {
				background: '#A80016'
			},
			
			items:[ 
			
			//homeButton,
		
		/*{
				xtype: 'component',
				 
margin: '0 0 0 5',
style: {
					borderRight: '2px solid #CC9FA7',
					borderLeft: '2px solid #CC9FA7',
					 borderTop: '2px solid CC9FA7',
					 borderBottom: '2px solid CC9FA7'
				},
autoEl: {
        tag: 'a',
        href: 'http://hoftheater-detmold.de',
        html: '<img src="resources/images/TheaterBild.tif" style="width:21px;height:21px;" title="http://hoftheater-detmold.de">',
		target: "_blank"
    }
//style:{color: '#CC9FA7'}
			},*/
			
			{

				xtype: 'label',
        		html: '<b style="color:#CC9FA7;">Theatre Tool</b>',
        		margin: '0 5 0 10'

			}
/*{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			},*/ 

	/*{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">'+"Tabs anordnen"+'</b></font>',
				disabled: true,
				margin: '0 0 0 10',
				menu:[ {
					text: 'Horizontal verteilen',
					icon: 'resources/images/Horizontal-17.png'
				},
				{
					text: 'Vertikal verteilen',
					icon: 'resources/images/Vertical-17.png'
				},
				{
					text: 'Stapeln',
					icon: 'resources/images/Sheets-17.png'
				}]
				//Desktop 173
			},*/
/*{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, 	*/
/*{
				xtype: 'button',
                margin: '0 0 0 5',
				text: '<font size = "1"><b style="color:#CC9FA7;">Tab duplizieren</b></font>',
				disabled: true,
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
					click: function (item, e, eOpts) {
					   var activeTab = me.htPanel.getHTTabPanel().getActiveTab();
					   if(activeTab !== null){
					       var clone = activeTab.cloneConfig();
					       var childClone = activeTab.items.items[0].cloneConfig();
					       clone.add(childClone);
					       
					       var historyButton = Ext.getCmp('historyButton'); 
					       var menuItem = historyButton.menu.add({text: clone.title, icon: clone.icon}); 

                            clone.setActiveMenuItemId(menuItem.id);
                            clone.setMenuAdded(true);
					   
					       me.htPanel.getHTTabPanel().add(clone);
					       me.htPanel.getHTTabPanel().setActiveTab(clone);
					       me.htPanel.getHTTabPanel().fireEvent('render', me.htPanel.getHTTabPanel());
				        }
					}
				}
			},		
	'->',
	{
			xtype: 'button',
			icon: 'resources/images/page-prev-disabled.gif',
			id: 'prevHistoryButton',
			disabled: true,
//margin: '0 5 0 0',
style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
            click: function() {                   
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var openTabs = navTreeGlobal.items;
                    
                    var historyButton = Ext.getCmp('historyButton');                   
                    var menuItems = historyButton.menu.items;
                    var itemToSelect = null;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];  
                       console.log(i);
                        if (existItem.text === selectedTab.title && i > 0  &&  selectedTab.activeMenuItemId === existItem.id) {
                             
                            itemToSelect = menuItems.items[i-1];
                            
                            break;
                        }
                    }
                    if(itemToSelect !== null){
                         for (i = 0; i < openTabs.items.length; i++) {
                        var openTab = openTabs.items[i];  
                         console.log(itemToSelect);
                         console.log(openTab);
                        if (openTab.title === itemToSelect.text) {
                             openTab.setMenuAdded(true);
                             navTreeGlobal.setActiveTab(openTab);
                             openTab.setActiveMenuItemId(itemToSelect.id);                           
                        }
                    }    
                    }
                    me.handleHistoryButtons();
                    
            }
        }
		},
	
	{
        xtype: 'button',
        id: 'historyButton',
        selection: null,
        disabled: true,
				text: '<font size = "1"><b style="color:#CC9FA7;">Verlauf</b></font>',
				margin: '0 5 0 3',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				 menu: {
        xtype: 'menu',
        items: [
            
        ],
        listeners: {
            click: function( menu, item, e, eOpts ) {
                 var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			   var existItems = navTreeGlobal.items;
			   var isFoundItem = navTreeGlobal.isItemFound(existItems, item.text, item.id);
			     menu.hide();
			     me.handleHistoryButtons();
			    if (isFoundItem) {
                      
                }               
            }
        }
    },
    listeners: {
            click: function() {
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var menuItems = this.menu.items;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];
                         //console.log("Get bei offnen existItem : "+ selectedTab);
                        // console.log("Get bei activeMenuItemId: "+ selectedTab.activeMenuItemId);
                        if (existItem.text === selectedTab.title && selectedTab.activeMenuItemId === existItem.id) {
                        //console.log(existItem.hasFocus);                       
                        existItem.focus();
                        selectedTab.setActiveMenuItemId(existItem.id);
            }
        }
        me.handleHistoryButtons();
            }
        }
				
				
    },
    {
			xtype: 'button',
			id: 'naxtHistoryButton',
			disabled: true,
			icon: 'resources/images/page-next-disabled.gif',
//margin: '0 0 0 5',
style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				listeners: {
            click: function() {                   
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var selectedTab = navTreeGlobal.getActiveTab();
                    var openTabs = navTreeGlobal.items;
                    
                    var historyButton = Ext.getCmp('historyButton');                   
                    var menuItems = historyButton.menu.items;
                    var itemToSelect = null;
                    for (i = 0; i < menuItems.items.length; i++) {
                        var existItem = menuItems.items[i];  
                       
                        if (existItem.text === selectedTab.title && i < menuItems.items.length &&  selectedTab.activeMenuItemId === existItem.id) {
                             
                            itemToSelect = menuItems.items[i+1];
                            
                            break;
                        }
                    }
                    if(itemToSelect !== undefined){
                       // selectedTab.setActiveMenuItemId(itemToSelect.id);
                         for (i = 0; i < openTabs.items.length; i++) {
                        var openTab = openTabs.items[i];  
                        if (openTab.title === itemToSelect.text) {
                            openTab.setMenuAdded(true);
                             navTreeGlobal.setActiveTab(openTab);
                             openTab.setActiveMenuItemId(itemToSelect.id);
                        }
                    }    
                    }
                    me.handleHistoryButtons();
                    
            }
        }
		},

			
'->',
 /\*{

				xtype: 'label',				
        		html: 
        		'<font size = "1"><b style="color:#CC9FA7;">Suchefilter</b></font>',
        		//'<b style="color:#CC9FA7;">Filter:</b>',
        		margin: '0 10 0 10'
			},*\/
			this.searchFilterButton,
	
            this.searchField,

{

				xtype: 'button',
        		html: '<font size = "1"><b style="color:#CC9FA7;">Erweitert</b></font>',
        		margin: '0 10 0 10',
disabled: true

			},

{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			},
			
			
			{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">Hilfe</b></font>',
				margin: '0 10 0 10',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				menu:[ 
				
				{
				xtype: 'component',
//margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu/Info_Hoftheaterdaten2.pdf',
        html: 'Navigation Hilfe',
		target: "_blank"
    }
    //style:{color: '#CC9FA7'}
    },
				{
					text: 'Daten Relation',
					
					listeners: {
					
					click: function (item, e, eOpts) {

					var win = new TheaterTool.view.toolbar.DatenRelationWindow();
					win.show();
					}
				}
				},
				{
				xtype: 'component',
//margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu',
        html: 'Dokumentation',
		target: "_blank"
    }
//style:{color: '#CC9FA7'}
			}
			]
				//Desktop 173
			}
			
			
			
			

/\*{
				xtype: 'component',
margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu/Info_Hoftheaterdaten2.pdf',
        html: '<font size = "1"><b style="color:#CC9FA7;">Hilfe</b></font>',
		target: "_blank"
    },
style:{color: '#CC9FA7'}
			},
{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			},*\/


/\*{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">Daten Relationen</b></font>',
				listeners: {
					
					click: function (item, e, eOpts) {

					var win = new TheaterTool.view.toolbar.DatenRelationWindow();
					win.show();
					}
				}

			},	
{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, 	*\/
/\*{
				xtype: 'component',
margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu',
        html: '<font size = "1"><b style="color:#CC9FA7;">Dokumentation</b></font>',
		target: "_blank"
    },
style:{color: '#CC9FA7'}
			}*\/
*/

           

]
		});
		//this.searchField.setDisabled(true);
		this.callParent()
	},

homeOnItemToggle: function () {

		window.location.href = {
				xtype: 'component',
margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'http://hoftheater-detmold.de',
        //html: '<font size = "1"><b style="color:#CC9FA7;">Dokumentation</b></font>',
		target: "_blank"
    },
style:{color: '#CC9FA7'}
			}
		
		
		
		
	},

	createCEBox: function (ceAutoEl, ceOnItemToggle, ceEnableToggle) {
		var ceBox = Ext.create('Ext.button.Button', {
			autoEl: ceAutoEl,
			enableToggle: ceEnableToggle,
			toggleHandler: ceOnItemToggle,
			margin: '0 0 0 5',
			style:{
			borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid #CC9FA7',
					 borderBottom: '1px solid #CC9FA7'
					 }
		});
		return ceBox;
	},
		
	setViewPanel: function (htPanel) {
		this.htPanel = htPanel;
	},
	
	createCEButton: function (htText) {
		
		var me = this;
		var ceButton = Ext.create('Ext.button.Button', {
			xtype: 'button',
			text: htText,
			//scope: this,
			menu:[]
			//scale: 'medium'
		});
		
		var storeField = new Array("Aschenbrödel", "Der Bettelstudent", 'Des Teufels Anteil');
		
		for (var i = 0; i < storeField.length; i++) {
			var menuItem = Ext.create('Ext.menu.Item', {
				text: storeField[i],
				icon: 'resources/images/Books1-17.png',
				listeners: {
					
					click: function (item, e, eOpts) {

							var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
								title: '<font style="color:#A87678;">'+item.text+'</font>',
								icon: 'resources/images/Books1-17.png'
							});
							
							var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 9, workName: item.text});
							repertoireTab.add(repertoireDetails);
							
							me.htPanel.getHTTabPanel().add(repertoireTab);
							me.htPanel.getHTTabPanel().setActiveTab(repertoireTab);
					}
				}
			});
			ceButton.getMenu().add(menuItem);
		}
		
		return ceButton;
	},

createTextField: function (fieldName, fieldLabel) {
		var me = this;
		var ceTextField = Ext.create('Ext.form.field.Text', {
			//name: '<b style="color:#CC9FA7;">'+fieldName+'</b>',
			//id: fieldLabel,
			width: 200,
		//title: '<b style="color:#CC9FA7;">'+fieldName+'</b>',
//margin: '0 10 0 10',
			listeners: {
				focus: function (e, eOpts) {
					//me.handleCreateButton();
				},
				render: function (c) {
					c.getEl().on('keyup', function () {
						//me.handleCreateButton();
					},
					c);
				}
			}
		});
		
		return ceTextField;
	},
	
	creatButtonWithMenu: function () {
		var me = this;
		var menuButton = Ext.create('Ext.button.Button', {
		
		
		xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">'+GUI_NAMES.filter+'</b></font>',
				margin: '0 0 0 10',
				
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
					 
				},
		
		
			/*xtype: 'button',
				width: 110,
				
				//text: '<font size = "1"><b style="color:#CC9FA7;">Filter</b></font>',
				style: {
					borderRight: '3px solid #A80016',
					borderLeft: '3px solid #A80016',
					 borderTop: '3px solid #A80016',
					 borderBottom: '3px solid #A80016',
					 background: 'white'
				},*/
				menu:[ {
					text: GUI_NAMES.filterworks,
					icon: 'resources/images/BooksVert-17.png',
					listeners: {
					
					click: function (item, e, eOpts) {
                        
                        menuButton.setText(item.text);
					
					}
				}
				},
				{
					text: GUI_NAMES.filterpersons,
					icon: 'resources/images/Mask-19.png',
					listeners: {
					
					click: function (item, e, eOpts) {

					
					menuButton.setText(item.text);
					}
				}
				}]
		});
		
		return menuButton;
	},
	
	createSearchField: function (searchFilterButton) {
		
		var searchField = Ext.create('Ext.form.field.Text', {
    labelWidth: 0,
    
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    hasSearch : false,
    paramName : 'query',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });
    },

    onClearClick : function(){
        var me = this,
            activeFilter = me.activeFilter;

        if (activeFilter) {
            me.setValue('');
            //me.store.getFilters().remove(activeFilter);
            me.activeFilter = null;
            me.getTrigger('clear').hide();
            me.updateLayout();
        }
    },

    onSearchClick : function(){
        var me = this,
        value = me.getValue();
        searchType = searchFilterButton.getText();
        console.log(value);
        console.log(searchType);
        /*if(!value.trim()){        
            Ext.MessageBox.show({
            title: 'Suche',
            msg: 'Bitte tragen Sie das Suchwort oder den Suchtext ein!',
            buttons: Ext.MessageBox.OK
        });
            return;
        }
        else if(value.length < 3 && value !== '*'){
         Ext.MessageBox.show({
            title: 'Suche',
            msg: 'Das Suchwiort oder der Suchtext sollte länder als drei Zeichen sein!',
            buttons: Ext.MessageBox.OK
        });
            return;
        }
        else */
        if(searchType === '<font size = "1"><b style="color:#CC9FA7;">Filter</b></font>'){
        Ext.MessageBox.show({
            title: 'Suche',
            msg: GUI_NAMES.search_message,
            buttons: Ext.MessageBox.OK
        });
            return;
        }
         var historyButton = Ext.getCmp('historyButton'); 
        
        var menuItem = historyButton.menu.add({text: '<font style="color:gray;">'+searchType+': '+value+'</font>', icon: 'resources/images/Search-16.png', selection: value});
       
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+searchType+': '+value+'</font>',
						icon: 'resources/images/Search-16.png'
					});
					var regieDetails = new TheaterTool.view.tabPanel.search.SearchPanelInTab({searchValue: value, type: searchType});
				    repertoireTab.add(regieDetails);
				    
				    repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
               
                var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', navTreeGlobal);
					
					historyButton.setDisabled(false);
                    var toolBar = Ext.getCmp('toolbar'); 
                    toolBar.handleHistoryButtons();
                
                 if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
							Ext.getCmp('infoDialog').close();
					}
        


        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            me.activeFilter = new Ext.util.Filter({
                property: me.paramName,
                value: value
            });
            me.getTrigger('clear').show();
            me.updateLayout();
        }
    }
});
		
		return searchField;
	},
	
	foundHistoryitem: function(menuItems, titletext){
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            /*console.log(existItem.text);
            console.log(titletext);*/
            if (existItem.text === titletext) {
                return true;
            }
        }
        return false;
    },
    
    foundHistoryitemWithId: function(menuItems, dbKey){
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            /*console.log(existItem.text);
            console.log(titletext);*/
            if (existItem.dbkey === dbKey) {
                return true;
            }
        }
        return false;
    },
    
    handleHistoryButtons: function(){
        var prevHistoryButton = Ext.getCmp('prevHistoryButton');
        var naxtHistoryButton = Ext.getCmp('naxtHistoryButton');
        var historyButton = Ext.getCmp('historyButton'); 
        var menuItems = historyButton.menu.items;
        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
        var selectedTab = navTreeGlobal.getActiveTab();
        if(selectedTab !== null){
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            
            if (existItem.text === selectedTab.title && existItem.id === selectedTab.activeMenuItemId) {
                if(i === 0){
                    if(menuItems.items.length === 1){
                        prevHistoryButton.setDisabled(true);
                        naxtHistoryButton.setDisabled(true);
                    }
                    else{
                        prevHistoryButton.setDisabled(true);
                        naxtHistoryButton.setDisabled(false);                                                 
                    }
                    
                }
                else if(i === menuItems.items.length-1){
                    if(menuItems.items.length === 1){
                        prevHistoryButton.setDisabled(true);
                        naxtHistoryButton.setDisabled(true);
                    }
                    else{
                        prevHistoryButton.setDisabled(false);
                        naxtHistoryButton.setDisabled(true);                                                 
                    } 
                }
                else{
                    prevHistoryButton.setDisabled(false);
                    naxtHistoryButton.setDisabled(false); 
                }
               
            }
        }
        }
        
    }


});