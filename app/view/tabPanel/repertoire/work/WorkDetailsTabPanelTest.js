/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanelTest', {
	extend: 'Ext.panel.Panel',
	
	//frame: true,
    //title: 'Form Fields',
   // width: 400,
	flex:1,
    //bodyPadding: 10,
   // layout: 'form',
border: false,
column: 2,
layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},


initComponent: function () {
	this.items = [

			{				
				layout: {
					type: 'vbox',
					pack: 'start',

					align: 'stretch'
				},
				
				bodyPadding: 10,
				flex:1,
				defaults: {
					frame: true,
					bodyPadding: 10
				},
				
				border: false,
				items: [
					{
        xtype: 'textfield',
		fieldLabel: "Einheitstitel",
		width: 400,
		value: 'Der Bettelstudent'
        /*name: "einheit"
		render: function(value){
             return title[1];
        }*/
        }, {
            fieldLabel: 'Title',
			width: 400,
			xtype: 'textfield',
            //name: 'title',
			value: 'Der Bettelstudent oder Das Donnerwetter (de)'
        },
		{
            fieldLabel: 'Altenativtitel',
			width: 400,
			xtype: 'textfield',
            //name: 'alternativ',
			value: 'Der reisende Student (de)'
        },
		{
            fieldLabel: 'Untertitel',
			width: 400,
			xtype: 'textfield',
            //name: 'untertitel',
			value: 'Operette in 2 Akten (de)'
        },
{
            xtype: 'label',
			margin: '10 0 0 0'
        },
{
        xtype: 'textfield',
		fieldLabel: "Komponist",
		width: 400,
		value: 'Winter, Peter von'
        /*name: "einheit"
		render: function(value){
             return title[1];
        }*/
        }, {
            fieldLabel: 'Librettist',
			width: 400,
			xtype: 'textfield',
            //name: 'title',
			value: 'Weidmann, Paul'
        }


]
				},


{				
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				flex:1,
				bodyPadding: 10,
				
				defaults: {
					frame: true,
					bodyPadding: 10
				},
				
				border: false,
				items: [
			{
            fieldLabel: 'Vorhandene Sprache',
			width: 400,
			xtype: 'textfield',
            //name: 'untertitel',
			value: 'German'
        },

{
            fieldLabel: 'Geschichte',
			width: 400,
			xtype: 'textarea',
			grow: true,
            //name: 'title',
			value: 'First Performance: 17. April 1773, Wien'
        },		

{
            fieldLabel: 'Instrumentierung',
			width: 400,
			xtype: 'textarea',
			grow: true,			
            //name: 'alternativ',
			value: 'Brandheim, Hannchen, Jacob, Margareth, Tollberg'
        }
]
				}


		
		
    ]

	this.callParent();
	}

	
	/*initComponent: function () {
	
	this.textTab = new TheaterTool.view.tabPanel.repertoire.work.TabTextWork({
			title: 'Text',
			workID: this.workID
		});
		
		this.xmlTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({
			title: 'XML',
			workID: this.workID
		});
	
	this.items =[
		//this.slursItem,
		this.textTab,
		this.xmlTab
		//this.dynamsItems,
		//this.dirsItems
		
		],
		
		this.callParent();
	},*/

	
	/*setTextInfo: function(infoText){
		this.textTab.setTextInfo(infoText);
		this.xmlTab.setTextInfo(infoText);
		
	}*/



});