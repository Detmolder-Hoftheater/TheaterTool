/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.abo.AboTabXML', {
 extend: 'Ext.panel.Panel',
	
border: false,

flex:1,

autoScroll: true,

    title: '<b style="color:gray;">XML</b>',

	regieName: null, 
	
    initComponent: function() {

	var me = this;

me.listeners = {
        	activate: function (eOpts) {
        	console.log("activate");

Ext.Ajax.request({           
    			url:'resources/xql/getAboXML.xql', 
			method: 'GET',
            params: {
				regieName: me.regieName
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