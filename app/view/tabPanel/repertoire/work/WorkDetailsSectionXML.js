Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSectionXML', {
    extend: 'Ext.panel.Panel',
 border: true,

//flex:1,

//autoScroll: true,

//height: 400,

   // resizable: true,
    title: '<b style="color:gray;">XML</b>',
    
    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({workID: this.workID});
	
	me.items =[
		me.repertoireTab
		],

/*Ext.Ajax.request({           
    			url:'resources/xql/getXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					me.setTextInfo(object);       			
    			}
			});*/

me.listeners = {
        	activate: function (eOpts) {
        	console.log("activate");

Ext.Ajax.request({           
    			url:'resources/xql/getXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					me.repertoireTab.setTextInfo(object);       			
    			}
			});


  }
    },

 	/*me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			Ext.Ajax.request({           
    			url:'resources/xql/getXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },        
    			success: function (response, options) {
        			var object = response.responseText;
					me.repertoireTab.setTextInfo(object);			
    			}
			});

        }
    },*/
    
        me.callParent();
        
        },

setTextInfo: function(infoText){

var me = this;

 var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText;



 		var tmp = hljs.highlightAuto($(tempDiv).html()).value;

	$('#'+me.id+'-innerCt').html('<pre>' + tmp + '</pre>');

	}


});