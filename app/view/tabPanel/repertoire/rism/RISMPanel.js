/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMPanel', {
sourceID: null,
    werkTitle: null,
    
    extend: 'Ext.panel.Panel',
    
   // title: '<b style="color:gray;">Übersicht</b>',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    //bodyPadding: 10,
    flex: 1,
    sourceID: null,
     header:{
   style: {
      backgroundColor:'#FFFFFF',
      backgroundImage:'none'
     // borderBottom: '5px solid #F2EEE1'
   }
},
	/*extend: 'Ext.tab.Panel',

//autoScroll: true,
	
	flex: 1,
border: false,
//bodyPadding:15,

	
	detailSection: null,
	detailSection_xml: null,*/
	
	/*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},*/
				
				//bodyPadding: 15,
				
				/*defaults: {
					frame: true
				},*/
				
	
/*bodyBorder: false,*/
	/*border: false,
autoScroll: true,*/
	
	initComponent: function () {
	var me = this;
	var ovPath = '';
                    if (me.sourceID === 'H020149') {
                        ovPath = 'Einleitung_Mus-n120_Aschenbroedel';
                    } else if(me.sourceID === 'H020263'){
                        ovPath = 'Einleitung_Mus-n237_Bettelstudent';
                    } else{
                        ovPath = 'Einleitung_Mus-n16_TeufelsAnteil';
                    }
		
	
            me.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection({
                path: ovPath
            });
            
             me.items =[
            me.overviewSection
            ]
        

    	this.callParent();
	}
});