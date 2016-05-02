/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.revenue.RevenueTextSection', {
    extend: 'Ext.form.FieldSet',
 
    collapsible: true,
   collapsed: true,

    title: '<b style="color:gray;">Text</b>',

flex:1,


    repertoireTab:null,

	month: null,
	monthNumber: null,
	year: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel();
	
	me.items =[
		this.repertoireTab
		],

 	me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");

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
 			url: 'resources/xql/getRevenue.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
				year: me.year
              
            },
            success: function(response){
				//var idtemp = me.repertoireTab.getTextTab().id;

				//$('#'+me.id).html(response.responseText);
				
 				me.repertoireTab.setTextInfo(response.responseText);
				//me.repertoireTab.setTextInfo1(response.responseText);
			//$('#'+me.id+'-innerCt').html(response.responseText);

     		}
         
        });

         
       }
    },
    
        me.callParent();
        
        }


});


/*if(me.month = 'Januar'){
				me.monthNumber = '01';
			}
			else if(me.month = 'Februar'){
				me.monthNumber = '02';
			}
			else if(me.month = 'März'){
				me.monthNumber = '03';
			}
			else if(me.month = 'April'){
				me.monthNumber = '04';
			}
			else if(me.month = 'Mai'){
				me.monthNumber = '05';
			}
			else if(me.month = 'Juni'){
				me.monthNumber = '06';
			}
			else if(me.month = 'Juli'){
				me.monthNumber = '07';
			}
			else if(me.month = 'August'){
				me.monthNumber = '08';
			}
			else if(me.month = 'September'){
				me.monthNumber = '09';
			}
			else if(me.month = 'Oktober'){
				me.monthNumber = '10';
			}
			else if(me.month = 'November'){
				me.monthNumber = '11';
			}
			else if(me.month = 'Dezember'){
				me.monthNumber = '12';
			}

console.log(me.month);
console.log(me.monthNumber);
console.log(me.year);*/