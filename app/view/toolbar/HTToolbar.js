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
		borderLeft: '3px solid #A80016',
		borderTop: '5px solid #A80016',
		borderBottom: '3px solid #A80016'
	},
	bodyBorder: false,
	border: false,
	
	htPanel: null,
	extendWorkButton: null,
	
	
	initComponent: function () {
		
		this.extendWorkButton = this.createCEButton('Teiferschließung');
		
		this.tbar = new Ext.Toolbar({
			
			style: {
				background: '#A80016'
			},
			
			
			//border-color:#18181a;
			//background-color:#393d4e;
			
			//bodyBackground:{"color":"#A80016"},
			items:[ {
				html: '<b style="color:#A87678;">la vita di teatro</b>',
				style: {
					"background-color": "#A80016"
				}
			},
			/*		{ xtype: 'tbseparator',
			style: {
			borderRight: '1px solid black',
			borderLeft: '1px solid black'
			// borderTop: '1px solid black',
			// borderBottom: '1px solid black'
			}
			},*/
			'->',
			'->',
			'->',
			this.extendWorkButton, {
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #A87678',
					borderLeft: '1px solid #A87678'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, {
				xtype: 'button',
				text: 'Tabs anordnen',
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
			'->']
		});
		
		
		
		this.callParent()
	},
	
	
	setViewPanel: function (htPanel) {
		this.htPanel = htPanel;
	},
	
	/**
	 * Create button with menu
	 * @param {string} ceSource: name.
	 * @param {string} ceId.
	 * @param {object} ceMenu.
	 * @param {object} ceHandler.
	 */
	createCEButton: function (htText) {
		
		var me = this;
		var ceButton = Ext.create('Ext.button.Button', {
			xtype: 'button',
			text: htText,
			scope: this,
			//handler: ceHandler,
			menu:[],
			scale: 'medium'
		});
		
		var storeField = new Array("Aschenbrödel: Isouard", "Der Bettelstudent: v. Winter", 'Des Teufels Anteil: Auber');
		
		for (var i = 0; i < storeField.length; i++) {
			var menuItem = Ext.create('Ext.menu.Item', {
				text: storeField[i],
				icon: 'resources/images/Books1-17.png',
				listeners: {
					
					click: function (item, e, eOpts) {
						if (item.text === 'Aschenbrödel: Isouard') {
							var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
								title: 'Repertoire: A-B-C',
								icon: 'resources/images/Library-17.png'
							});
							
							var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel();
							repertoireTab.add(repertoireDetails);
							
							me.htPanel.getHTTabPanel().add(repertoireTab);
							me.htPanel.getHTTabPanel().setActiveTab(repertoireTab);
						}
					}
				}
			});
			ceButton.getMenu().add(menuItem);
		}
		
		return ceButton;
	},
	
	/**
	 * Create login button
	 * @param {string} ceSource: name.
	 */
	createLoginButton: function (ceSource) {
		var ceButton = Ext.create('Ext.button.Button', {
			xtype: 'button',
			scale: 'medium',
			text: ceSource
		});
		
		return ceButton;
	},
	
	/**
	 * Create button-icon
	 * @param {string} ceId.
	 * @param {string} ceIcon: icon path.
	 * @param {object} ceHandler.
	 */
	createCEIcon: function (ceId, ceIcon, ceHandler) {
		var ceIcon = Ext.create('Ext.button.Button', {
			id: ceId,
			icon: ceIcon,
			scale: 'medium',
			handler: ceHandler
		});
		return ceIcon;
	},
	
	/**
	 * Create button
	 * @param {object} ceAutoEl: icon.
	 * @param {object} ceOnItemToggle: handler.
	 * @param {boolean} ceEnableToggle.
	 */
	createCEBox: function (ceAutoEl, ceOnItemToggle, ceEnableToggle) {
		var ceBox = Ext.create('Ext.button.Button', {
			autoEl: ceAutoEl,
			id: 'test',
			enableToggle: ceEnableToggle,
			toggleHandler: ceOnItemToggle
		});
		return ceBox;
	}
});