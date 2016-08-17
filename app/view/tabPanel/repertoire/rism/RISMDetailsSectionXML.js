/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML', {
   //extend: 'Ext.form.FieldSet',
 extend: 'Ext.panel.Panel',
    //collapsible: true,
   //collapsed: true,

/*layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},*/
					//autoScroll: true,
					//border: true,
//height: 400,

//flex:1,
//minHeight: 200,

border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,


    title: '<b style="color:gray;">XML</b>',
    
    repertoireTab:null,

	sourceID: null,

    initComponent: function() {

	var me = this;
    
    /*me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({sourceID: this.sourceID});
	
	me.items =[
		this.repertoireTab
		],
*/
 	me.listeners = {
        	activate: function (eOpts) {
        	console.log("activate");

			//$('#'+me.id).html(me.infoText);

Ext.Ajax.request({           
    			url:'resources/xql/getRismXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
              sourceID: me.sourceID
            },        
    			success: function (response, options) {
 					
        			var object = response.responseText;
					//me.repertoireTab.setTextInfo(object); 
					me.setTextInfo(object);       			
    			}
			});


  }
    }
    
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