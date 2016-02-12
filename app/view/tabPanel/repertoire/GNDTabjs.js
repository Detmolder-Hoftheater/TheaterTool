/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.GNDTab', {
	extend: 'Ext.form.Panel',
	layout: 'absolute',
	border: true,
	flex: 2,
	
	defaults: {
		bodyPadding: 15,
		height: 200,
		frame: true
	},
	
	initComponent: function () {
	
	
	
	

	
	/*var objects = $('<div></div>');
	
	var tmp = hljs.highlightAuto($(objects).html()).value;
		
		
			$('#'+this.id+'-body').html(tmp);*/
		
		
		/*this.items =[
		{text: data/hairpin.xml}
		]*/
		
		this.callParent()
	}
	
	
//requires:[
//	'Ext.layout.container.VBox'],
//	//xtype: 'layout-vertical-box',
//	//flex: 1,
//	
//	layout: {
//		type: 'vbox',
//		pack: 'start',
//		align: 'stretch'
//	},
//	
//	//closable: true,
//	
//	defaults: {
//		frame: true,
//		autoScroll: true
//	},
//	
//	
//	//bodyPadding: 15,
//	//border: false,
//	
//	autoScroll: true,
//	
//	
//	searchField: null,
//	
//	initComponent: function () {
//	
//	//this.searchField = this.createTextField('Suche1', 'Suche1');
//	//this.searchField.setDisabled(true);
//	
//	
//	
//	this.items =[
//		
//			//this.searchField
//			
//			
//			/*{
//            xtype      : 'fieldcontainer',
//           // fieldLabel : 'Size',
//            defaultType: 'radiofield',
//            defaults: {
//                flex: 1
//            },
//            margin: '10 10 0 10',
//            layout: 'vbox',
//            items: [
//                {
//                    boxLabel  : 'Werk',
//                    name      : 'option',
//                    inputValue: 'w',
//                    id        : 'radio1'
//                }, {
//                    boxLabel  : 'Person',
//                    name      : 'option',
//                    inputValue: 'p',
//                    id        : 'radio2'
//                }
//            ]
//        }*/
//			
//    
//		];
//		
//		/*this.items =[
//		 {
//			id: 'card-0',
//			xtype: 'fieldset',
//			title: 'Suche',
//			margin: '10 10 10 10',
//			layout: {
//					type: 'vbox',
//					pack: 'start',
//					align: 'stretch'
//				},
//			items:[
//			this.searchField,
//			
//    {
//        xtype: 'label',
//        //forId: 'myFieldId',
//        text: 'Erweiterte Suche',
//        margin: '20 0 10 0'
//    }
//			]
//		}
//		
//		
//		];*/
//		
//		this.callParent();
//	},
//	
//	/**
//	 * Create mandatory text field.
//	 * @param {string} fieldName - text name and id.
//	 * @param {string} fieldLabel - field label.
//	 */
//	createTextField: function (fieldName, fieldLabel) {
//		var me = this;
//		var ceTextField = Ext.create('Ext.form.field.Text', {
//			//name: fieldName,
//			id: fieldName,
//			width: 235,
//			//fieldLabel: fieldLabel,
//			listeners: {
//				focus: function (e, eOpts) {
//					me.handleCreateButton();
//				},
//				render: function (c) {
//					c.getEl().on('keyup', function () {
//						me.handleCreateButton();
//					},
//					c);
//				}
//			}
//		});
//		
//		return ceTextField;
//	}
});