/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
	//extend: 'Ext.panel.Panel',

extend: 'Ext.tab.Panel',
	
	/*defaults: {
		autoScroll: true
		
	},
    */
	personSection: null,
	detailSection: null,
	sourcesSection: null,
	overviewSection: null,
	detailSection_xml: null,
//flex:1,
	
	/*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},*/
				
				//bodyPadding: 15,
				
				/*defaults: {
					frame: true
					
				},*/
				
				border: false,
//bodyPadding: 15,
	sourceID: null,
	werkTitle: null,
	
	
	initComponent: function () {

		var app = TheaterTool.getApplication();
        var store = app.createStoreForSource();
		store.getProxy().extraParams.sourceID = this.sourceID;				
		store.load();
	
	//this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID, store: store});

	this.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({sourceID: this.sourceID, store: store});

this.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSectionXML({sourceID: this.sourceID});

	if(storeField.indexOf(this.werkTitle) > -1){
		this.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
	}

	if(this.overviewSection !== null){
		this.items = [
			/*{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '0 0 10 0'

			},*/
       
			this.detailSection,
this.sourcesSection,
			/*{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '0 0 -11 0'
			},*/
			this.detailSection_xml,
			this.overviewSection
    ]
	}
else{
    this.items = [
			
			this.detailSection,
this.sourcesSection,
this.detailSection_xml
			/*{
        		html: '<img src="resources/images/Download.png" style="width:17px;height:17px;">',
				border: false,
				margin: '0 0 -11 0'
			},*/
			
			
    ]
}
    	this.callParent();
	}
});
/*/\**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 *\/
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
	//extend: 'Ext.panel.Panel',

extend: 'Ext.tab.Panel',

xtype: 'navigation-tabs',

 ui: 'navigation',
   /\* tabBar: {
        layout: {
            pack: 'center'
        },
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false
    },*\/

   /\*defaults: {
        iconAlign: 'top',
        bodyPadding: 15
    },*\/


	
	/\*defaults: {
		autoScroll: true
		
	},
    *\/
	personSection: null,
	detailSection: null,
	overviewSection: null,
	detailSection_xml: null,
//flex:1,
	
	/\*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},*\/
				
				//bodyPadding: 15,
				
				/\*defaults: {
					frame: true
					
				},*\/
				
				border: false,
//bodyPadding: 15,
	sourceID: null,
	werkTitle: null,

	
	
	initComponent: function () {

var me = this;
		
	me.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID});

	me.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSectionXML({sourceID: this.sourceID});

	if(storeField.indexOf(this.werkTitle) > -1){
		me.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
	}

me.tbar =  new Ext.Toolbar({
		/\*layout: {
            pack: 'center'
        },*\/
/\*style: {
				background: '#FFFFFF'
			},*\/
	height: 33,
 layout: {
            pack: 'center'
        },
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false,
              // items: [{
                    //xtype: 'segmentedbutton',

					
                    items : [{
        text: 'Detail',
listeners: {
					
					click: function (item, e, eOpts) {

					me.detailSection.show();
me.detailSection.setDisabled(false);
me.detailSection_xml.setDisabled(true);
					}
				}
        //glyph: 72
       /\* html: 'TEST1'*\/
    }, {
        text: 'XML',
listeners: {
					
					click: function (item, e, eOpts) {

					me.detailSection_xml.show();
me.detailSection.setDisabled(true);
me.detailSection_xml.setDisabled(false);
					}
				}
        //glyph: 117
        /\*html: 'TEST2'*\/
    }
     ]
});

	if(this.overviewSection !== null){
		this.items = [
			/\*{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '0 0 10 0'

			},*\/
       
			this.detailSection,
			/\*{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '0 0 -11 0'
			},*\/
			this.detailSection_xml,
			this.overviewSection
    ]
	}
else{
    this.items = [
			
			this.detailSection,
this.detailSection_xml
			/\*{
        		html: '<img src="resources/images/Download.png" style="width:17px;height:17px;">',
				border: false,
				margin: '0 0 -11 0'
			},*\/
			
			
    ]
}
    	this.callParent();
	}
});*/