/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSectionXML', {
    //extend: 'Ext.form.FieldSet',
 extend: 'Ext.panel.Panel',
    //collapsible: true,
   //collapsed: true,



//flex:1,

    title: '<b style="color:gray;">XML</b>',
//+ '<img src="resources/images/Download.png" style="width:17px;height:17px;">',

/*{
				/\*xtype: 'label',
        		html: 'Load XML'*\/
xtype: 'image', src: 'resources/images/Download.png', width: 26,
			height: 26

				},*/

	//flex:1,


//style: {
		//borderLeft: '3px solid #A80016',
		//borderTop: '2px solid #fff'
		//borderBottom: '1px solid #fff'
//	},
	/*bodyBorder: false,
	border: false,*/

//bodyPadding: 3,
    
    repertoireTab:null,

	sourceID: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.source.TabXMLSource({sourceID: me.sourceID});
	
	me.items =[
		me.repertoireTab
		],

 	me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			Ext.Ajax.request({           
    			url:'resources/xql/getXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
               uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'
            },        
    			success: function (response, options) {
        			var object = response.responseText;
					me.repertoireTab.setTextInfo(object);       			
    			}
			});

         
        }
    },
    
        me.callParent();
        
        }


});