/*Ext.define('TheaterTool.view.tabPanel.repertoire.work.XmlFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-xml',
    
    onLoadClick: function() {
        this.getView().getForm().load({
            url: 'data/xml-form-data.xml',
            waitMsg: 'Loading...'
        });
    }
});*/
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection', {
 /*extend: 'Ext.form.Panel',
    xtype: 'form-xml',
    //controller: 'form-xml',
    
    
    title:'XML Form',
    frame: true,
    width: 340,
height: 300,
    bodyPadding: 5,
    waitMsgTarget: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 85,
        msgTarget: 'side'
    },
    
    repertoireTab:null,

	workID: null,

	// configure how to read the XML data, using an instance
   /\* reader: {
        type: 'xml',
        model: 'TheaterTool.model.Contact',
        record: 'work',
        successProperty: '@success'
    },
*\/
  
items: [{
            
		fieldLabel: "Einheitstitel",
		value: 'Der Bettelstudent'
        /\*name: "einheit"
		render: function(value){
             return title[1];
        }*\/
        }, {
            fieldLabel: 'Title',
            //name: 'title',
			value: 'Der Bettelstudent oder Das Donnerwetter'
        },
{
            fieldLabel: 'Altenativtitel',
            //name: 'alternativ',
			value: 'Der reisende Student'
        },
{
            fieldLabel: 'Untertitel',
            //name: 'untertitel',
			value: 'Operette in 2 Akten'
        }

    ]

    /\*buttons: [{
        text: 'Load',
        listeners: {
            click: 'onLoadClick'
        }
    }

]*\/*/

    extend: 'Ext.form.FieldSet',
 
    collapsible: true,
   	collapsed: false,

    title: '<b style="color:gray;">Details</b>',

	flex:1,
    
    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;

if(me.workID === 'H020263'){
	me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanelTest({workID: me.workID});

}
else{
	me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel({workID: me.workID});

	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
			url: 'resources/xql/getWorkText.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },
            success: function(response){
 				me.repertoireTab.setTextInfo(response.responseText);				
     		}        
        });

}
    
   // me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanelTest({workID: me.workID});

	/*Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
			url: 'resources/xql/getWorkText.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },
            success: function(response){
 				me.repertoireTab.setTextInfo(response.responseText);				
     		}        
        });*/
	
	me.items =[
		me.repertoireTab
		],

        me.callParent();
        
        }


});