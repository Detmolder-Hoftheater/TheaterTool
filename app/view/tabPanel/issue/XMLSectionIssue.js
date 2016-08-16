/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.issue.XMLSectionIssue', {
   // extend: 'Ext.form.FieldSet',
 
    extend: 'Ext.panel.Panel',
    /*collapsible: true,
   collapsed: true,*/

    title: '<b style="color:gray;">XML</b>',

border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,


    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;
    
    /*me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({workID: this.workID});
	
	me.items =[
		me.repertoireTab
		],*/

 	me.listeners = {
        	activate: function (eOpts) {
        	//console.log("expand");
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
					me.repertoireTab.setTextInfo(object);       			
    			}
			});*/


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