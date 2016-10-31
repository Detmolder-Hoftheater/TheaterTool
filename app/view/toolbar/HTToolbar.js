/**
 * Creates class TheaterTool.view.toolbar.CEToolbar that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.toolbar.HTToolbar', {
	extend: 'Ext.panel.Panel',
	
	requires:[
	'Ext.tip.*',
	'Ext.Button',
	'Ext.window.MessageBox'],
	
	style: {
		//borderLeft: '3px solid #A80016',
		borderTop: '5px solid #A80016',
		borderBottom: '3px solid #A80016'
	},
	bodyBorder: false,
	border: false,
	
	htPanel: null,
	extendWorkButton: null,
	searchField: null,
	
	initComponent: function () {
		
		this.extendWorkButton = this.createCEButton('<font size = "1"><b style="color:#CC9FA7;">Tiefenerschließung</b></font>');

this.searchField = this.createTextField('Suche', 'Suche');

var homeButton = this.createCEBox({
			tag: 'img', 
			src: 'resources/images/TheaterBild.tif', 
			width: 28,
			height: 28
		},
		this.homeOnItemToggle, true);
		
		this.tbar = new Ext.Toolbar({
			
			style: {
				background: '#A80016'
			},
			
			items:[ 
			
			//homeButton,
		
		{
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
			},
			
			{

				xtype: 'label',
        		html: '<b style="color:#CC9FA7;">Theatre Tool</b>',
        		margin: '0 5 0 10'

			},
/*{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			},*/ 

	{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">Tabs anordnen</b></font>',
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
/*{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, 	*/
{
				xtype: 'button',
disabled: true,
margin: '0 0 0 5',
				text: '<font size = "1"><b style="color:#CC9FA7;">Tab duplizieren</b></font>'
			},		
	

			
'->',

 {

				xtype: 'label',				
        		html: '<b style="color:#CC9FA7;">Suche:</b>',
        		margin: '0 10 0 10'
			},
			
			{
				xtype: 'button',
				text: '<font size = "1"><b style="color:#CC9FA7;">Filter</b></font>',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7',
					 borderTop: '1px solid CC9FA7',
					 borderBottom: '1px solid CC9FA7'
				},
				menu:[ {
					text: 'Werke',
					icon: 'resources/images/BooksVert-17.png'
				},
				{
					text: 'Personen',
					icon: 'resources/images/Mask-19.png'
				}]
				//Desktop 173
			},
			
			
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
			
			
			
			

/*{
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
			},*/


/*{
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
			}, 	*/
/*{
				xtype: 'component',
margin: '0 10 0 10',
autoEl: {
        tag: 'a',
        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu',
        html: '<font size = "1"><b style="color:#CC9FA7;">Dokumentation</b></font>',
		target: "_blank"
    },
style:{color: '#CC9FA7'}
			}*/


           

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
	}

});