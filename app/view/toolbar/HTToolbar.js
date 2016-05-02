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
		
		this.tbar = new Ext.Toolbar({
			
			style: {
				background: '#A80016'
			},
			
			items:[ {

				xtype: 'label',
        		html: '<b style="color:#CC9FA7;">Theatre Tool</b>',
        		margin: '0 10 0 10'

			},
			/*{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #CC9FA7',
					borderLeft: '1px solid #CC9FA7'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, 
			
			this.extendWorkButton, */
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
				text: '<font size = "1"><b style="color:#CC9FA7;">Tabs anordnen</b></font>',
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

			
'->',



{

				xtype: 'label',
        		html: '<font size = "1"><b style="color:#CC9FA7;">Suche</b></font>',
        		margin: '0 10 0 10'

			},
this.searchField,

{

				xtype: 'label',
        		html: '<font size = "1"><b style="color:#CC9FA7;">Erweitert</b></font>',
        		margin: '0 10 0 10'

			}

]
		});
		
		
		
		this.callParent()
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