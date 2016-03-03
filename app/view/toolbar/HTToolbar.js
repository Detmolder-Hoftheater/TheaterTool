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
	
	
	initComponent: function () {
		
		this.extendWorkButton = this.createCEButton('Teiferschließung');
		
		this.tbar = new Ext.Toolbar({
			
			style: {
				background: '#A80016'
			},
			
			items:[ {

				xtype: 'label',
        		html: '<b style="color:#A87678;">la vita di teatro</b>',
        		margin: '0 0 0 10'

			},
			'->',
			'->',

			this.extendWorkButton, 
			{
				xtype: 'tbseparator',
				style: {
					borderRight: '1px solid #A87678',
					borderLeft: '1px solid #A87678'
					// borderTop: '1px solid black',
					// borderBottom: '1px solid black'
				}
			}, 
			{
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
'->'

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
		
		var storeField = new Array("Aschenbrödel: Isouard", "Der Bettelstudent: v. Winter", 'Des Teufels Anteil: Auber');
		
		for (var i = 0; i < storeField.length; i++) {
			var menuItem = Ext.create('Ext.menu.Item', {
				text: storeField[i],
				icon: 'resources/images/Books1-17.png',
				listeners: {
					
					click: function (item, e, eOpts) {
						if (item.text === 'Aschenbrödel: Isouard') {
							var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
								title: 'Aschenbrödel: Isouard',
								icon: 'resources/images/Books1-17.png'
							});
							
							var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel();
							repertoireTab.add(repertoireDetails);
							
							me.htPanel.getHTTabPanel().add(repertoireTab);
							me.htPanel.getHTTabPanel().setActiveTab(repertoireTab);
						}
						else if (item.text === 'Der Bettelstudent: v. Winter') {
							var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
								title: 'Der Bettelstudent: v. Winter',
								icon: 'resources/images/Books1-17.png'
							});
							
							me.htPanel.getHTTabPanel().add(repertoireTab);
							me.htPanel.getHTTabPanel().setActiveTab(repertoireTab);
						}
						else if (item.text === 'Des Teufels Anteil: Auber') {
							var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
								title: 'Des Teufels Anteil: Auber',
								icon: 'resources/images/Books1-17.png'
							});
							
							me.htPanel.getHTTabPanel().add(repertoireTab);
							me.htPanel.getHTTabPanel().setActiveTab(repertoireTab);
						}
					}
				}
			});
			ceButton.getMenu().add(menuItem);
		}
		
		return ceButton;
	}

});