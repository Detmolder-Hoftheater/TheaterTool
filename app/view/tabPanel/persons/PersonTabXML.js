/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.persons.PersonTabXML', {
 extend: 'Ext.panel.Panel',
	
border: false,

flex:1,

autoScroll: true,

    title: '<b style="color:gray;">XML</b>',

    repertoireTab:null,

	sourceID: null,

    initComponent: function() {

	var me = this;
/*Ext.Ajax.request({           
    			url:'resources/xql/getPersonXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
               /\*uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'*\/
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					me.setTextInfo(object);       			
    			}
			});*/
/*me.repertoireTab = new TheaterTool.view.tabPanel.persons.XMLContent({sourceID: me.sourceID});
	
					me.items =[
							me.repertoireTab
					];*/


me.listeners = {
        	activate: function (eOpts) {
        	console.log("activate");

Ext.Ajax.request({           
    			url:'resources/xql/getPersonXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
               /*uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'*/
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					me.setTextInfo(object);       			
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
               uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'
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