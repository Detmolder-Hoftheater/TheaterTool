Ext.define('TheaterTool.view.tabPanel.issue.IssueTextSection', {
 extend: 'Ext.panel.Panel',
 //xtype: 'layout-border',
  requires:[
	'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
	
 title: '<b style="color:gray;">Übersicht</b>',
 
  layout: 'border',
  
	flex: 1,


    bodyBorder: false,
border: false,
 style: {
      borderRight: '7px solid white',
      borderLeft: '7px solid white',
      borderTop: '7px solid white',
     borderBottom: '7px solid white'
    },
    
   
   defaults: {
		autoScroll: true,
		split: true
	},
 
 
 
/*border: true,
	flex:1,
bodyPadding:10,
autoScroll: true,*/

detailSection: null,

	issueName: null,
	year: null,

    initComponent: function() {

	var me = this;
	
	
   // me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel();

			Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getIssue.xql',
            method: 'GET',
            params: {
                issueName: me.issueName,
				year: me.year
              
            },
            success: function(response){
				//var idtemp = me.repertoireTab.getTextTab().id;

				//$('#'+me.id).html(response.responseText);
				
				var tableView = Ext.create('Ext.panel.Panel', {
						region: 'center',
                        flex: 2,
                        
						setTextInfo: function(infoText){
		                      $('#'+this.id+'-innerCt').html(infoText);

	               }
					});
				me.add(tableView);
 				tableView.setTextInfo(response.responseText);
 				
 				me.detailSection = new TheaterTool.view.tabPanel.issue.FacsimileView();
 				me.add(me.detailSection);
              
     		}
         
        });
	
	
        me.callParent();
        
        }
});