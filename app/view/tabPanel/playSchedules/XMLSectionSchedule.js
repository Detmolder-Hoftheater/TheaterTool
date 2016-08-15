/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.XMLSectionSchedule', {
    //extend: 'Ext.form.FieldSet',
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

	month: null,
	monthNumber: null,
	year: null,

    initComponent: function() {

	var me = this;
    
   /* me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork();
	
	me.items =[
		me.repertoireTab
		],*/

 	me.listeners = {
        	activate: function (eOpts) {
        	if(me.month === 'Januar'){
				me.monthNumber = '01';
			}
			else if(me.month === 'Februar'){
				me.monthNumber = '02';
			}
			else if(me.month === 'März'){
				me.monthNumber = '03';
			}
			else if(me.month === 'April'){
				me.monthNumber = '04';
			}
			else if(me.month === 'Mai'){
				me.monthNumber = '05';
			}
			else if(me.month === 'Juni'){
				me.monthNumber = '06';
			}
			else if(me.month === 'Juli'){
				me.monthNumber = '07';
			}
			else if(me.month === 'August'){
				me.monthNumber = '08';
			}
			else if(me.month === 'September'){
				me.monthNumber = '09';
			}
			else if(me.month === 'Oktober'){
				me.monthNumber = '10';
			}
			else if(me.month === 'November'){
				me.monthNumber = '11';
			}
			else if(me.month === 'Dezember'){
				me.monthNumber = '12';
			}

			Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getScheduleXML.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
				year: me.year
              
            },
            success: function(response){
				me.setTextInfo(response.responseText);
 				//me.repertoireTab.setTextInfo(response.responseText);
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