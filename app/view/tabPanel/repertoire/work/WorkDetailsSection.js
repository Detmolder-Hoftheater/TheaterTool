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

    extend: 'Ext.panel.Panel',
 //bodyPadding: 5,
   // collapsible: true,
   //	collapsed: false,
border:true,
    title: '<b style="color:gray;">Details</b>',

	//flex:1,
    
    repertoireTab:null,
personSection: null,
	planSection: null,
journalSection: null,
	regieSection: null,
	roleSection: null,
	revenueSection: null,
	issueSection: null,

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

this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.workID, type:'work'});
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();

this.journalSection = new TheaterTool.view.tabPanel.repertoire.work.WorkJournalSection();

 	this.regieSection  = new TheaterTool.view.tabPanel.repertoire.work.WorkRegieSection();

	this.roleSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRoleSection();

	this.revenueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRevenueSection();

	this.issueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkIssueSection();
    
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
		me.repertoireTab,
{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>'
        		//margin: '15 0 15 0'

			},
			this.personSection
	
			/*this.planSection,			
			this.journalSection,
     		this.regieSection,
			this.roleSection,
			this.issueSection,
			this.revenueSection*/
		],



        me.callParent();
        
        }


});