/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.TabText', {
	extend: 'Ext.panel.Panel',
/*requires:[
	'Ext.layout.container.VBox'],
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},*/
	
	//closable: true,
	
	/*defaults: {
		frame: true,
		autoScroll: true
	},*/
	
	
	//bodyPadding: 15,
	//border: false,
	
	autoScroll: true,
	
	
	searchField: null,
	
	initComponent: function () {

var me = this;
	
	//this.searchField = this.createTextField('Suche1', 'Suche1');
	//this.searchField.setDisabled(true);


/*Ext.Ajax.request({
            url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/contents/works/H0201xx/H020149.xml',
                type: 'work'
            },
            success: function(response){

$('#'+me.id+'-innerCt').html(response.responseText);


     }
         
        });
	*/
	
			
    
	//	];
		
		/*this.items =[
		 {
			id: 'card-0',
			xtype: 'fieldset',
			title: 'Suche',
			margin: '10 10 10 10',
			layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
			items:[
			this.searchField,
			
    {
        xtype: 'label',
        //forId: 'myFieldId',
        text: 'Erweiterte Suche',
        margin: '20 0 10 0'
    }
			]
		}
		
		
		];*/
		
		this.callParent();
	},
	
	/**
	 * Create mandatory text field.
	 * @param {string} fieldName - text name and id.
	 * @param {string} fieldLabel - field label.
	 */
	createTextField: function (fieldName, fieldLabel) {
		var me = this;
		var ceTextField = Ext.create('Ext.form.field.Text', {
			//name: fieldName,
			id: fieldName,
			width: 235,
			//fieldLabel: fieldLabel,
			listeners: {
				focus: function (e, eOpts) {
					me.handleCreateButton();
				},
				render: function (c) {
					c.getEl().on('keyup', function () {
						me.handleCreateButton();
					},
					c);
				}
			}
		});
		
		return ceTextField;
	}
});