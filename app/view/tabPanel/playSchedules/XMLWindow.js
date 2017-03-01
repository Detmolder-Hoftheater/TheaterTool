Ext.define('TheaterTool.view.tabPanel.playSchedules.XMLWindow', {
	extend: 'Ext.window.Window',
	
	border: false,
	height: 500, 
	width: 500,
	maximizable: true,
	
	autoScroll: true,
	
	bodyStyle:{"background-color":"white"},
	

	 month: null, 
	 year: null,
	
	initComponent: function () {
	
	var me = this;
	
	if (me.month === 'Januar') {
                    me.monthNumber = '01';
                } else if (me.month === 'Februar') {
                    me.monthNumber = '02';
                } else if (me.month === 'März') {
                    me.monthNumber = '03';
                } else if (me.month === 'April') {
                    me.monthNumber = '04';
                } else if (me.month === 'Mai') {
                    me.monthNumber = '05';
                } else if (me.month === 'Juni') {
                    me.monthNumber = '06';
                } else if (me.month === 'Juli') {
                    me.monthNumber = '07';
                } else if (me.month === 'August') {
                    me.monthNumber = '08';
                } else if (me.month === 'September') {
                    me.monthNumber = '09';
                } else if (me.month === 'Oktober') {
                    me.monthNumber = '10';
                } else if (me.month === 'November') {
                    me.monthNumber = '11';
                } else if (me.month === 'Dezember') {
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
                    success: function (response) {
                        me.setTextInfo(response.responseText);
                        //console.log( me.sectionSize);
                       // me.height = me.sectionSize;
                        //me.repertoireTab.setTextInfo(response.responseText);
                    }
                });
	
	
	
	
	
	
	
	
		
		
		/*this.items =[ {
			html: this.text,
bodyPadding: 10
//margin: '10 10 10 10'
		}],*/
		
		
		me.callParent()
	},
	
	 setTextInfo: function (infoText) {
        
        var me = this;
        
        var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = infoText;
        
        
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        
        $('#' + me.id + '-innerCt').html('<pre>' + tmp + '</pre>');
        me.setHeight(me.sectionSize);
    },
    
    setSectionSize: function(sectionSize){
        this.sectionSize = sectionSize;
    }
});