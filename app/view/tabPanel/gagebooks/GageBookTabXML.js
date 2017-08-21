/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.gagebooks.GageBookTabXML', {
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
    			url:'resources/xql/getGageBookXML.xql', 
			method: 'GET',
            params: {
				regieName: me.regieName
               /*uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'*/
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					me.setTextInfo(response);       			
    			}
			});


  }
    },

        me.callParent();
        
        },


setTextInfo: function(response){

var me = this;

var testText = response.responseXML;
                    
                    var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                    var personArr = testText.getElementsByTagName('TEI');
                    tempDiv.appendChild(personArr[0]);
      
                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                    
                    $('#'+me.id+'-innerCt').html(htmlVersion);

 /*var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText;
 		var tmp = hljs.highlightAuto($(tempDiv).html()).value;
 
	$('#'+me.id+'-innerCt').html('<pre>' + tmp + '</pre>');*/

	}


});