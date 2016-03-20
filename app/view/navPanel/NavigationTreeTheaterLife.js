var store = Ext.create('Ext.data.TreeStore', {
   root: {
        text: 'Verwaltung',
        expanded: true,
icon: 'resources/images/portfolio-17.png',
        children: [
           // {
               /* text: 'Theater Organisation',
                icon: 'resources/images/Audience-17.png',
                expanded: true,
                children: [*/
                    { leaf:true, text: 'Dekoration',
                    icon: 'resources/images/theatre.png' },
                    { leaf:true, text: 'Regiebücher',
                    icon: 'resources/images/Crown-17.png'},
                    { leaf:true, text: 'Rollen- & Kostümbücher',
                     icon: 'resources/images/carnival.png'},
                    { leaf:true, text: 'Theaterberufe',
                    icon: 'resources/images/theatreB.png'},
                //]
          //  },
            {
                text: 'Finanzwesen',
                icon: 'resources/images/Coins-17.png',
               // expanded: true,
                children: [
                    { leaf:true, text: 'Ausgaben',
                    icon: 'resources/images/MoneyTransfer-17.png'

},
                    { leaf:true, text: 'Einnahmen',
                    icon: 'resources/images/MoneyBox-17.png'
},
                    { leaf:true, text: 'Gagenbücher',
                    icon: 'resources/images/Gift-17.png'
}
                ]
            }
        ]
    }
})





Ext.define('TheaterTool.view.navPanel.NavigationTreeTheaterLife', {
    extend: 'Ext.tree.Panel',
  //  xtype: 'basic-trees',
  //  width: 640,
    //flex: 1,
   // autoScroll: true,
  // strech: true,

  //  layout: {
   //     type: 'table'
       // columns: 2
        //tdAttrs: { style: 'padding: 10px;' }
  //  },



    reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: true,
	store: store ,
	tabPanel: null,

//style: {
    // borderRight: '1px solid #A80016',
     // borderLeft: '1px solid #A80016',
     // borderTop: '1px solid gray'
     // borderBottom: '1px solid #A80016'
//    },
border:false,
bodyborder: false,
bodyPadding: 3,

	//title: '<font style="color:#A87678;">Verwaltung</font>',

/*'<b style="color:gray;">Verwaltung</b>',*/
    
    initComponent: function() {

this.listeners = {
			
			itemdblclick: function (record, item, index, e, eOpts) {
				var repertoireTab = null;
				if(item.data.text === 'Dekoration'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Dekoration</font>',
						icon: 'resources/images/theatre.png'
					});
				
				}
			else if(item.data.text === 'Regiebücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Regiebücher</font>',
						icon: 'resources/images/Crown-17.png'
					});
				
				}
			else if(item.data.text === 'Rollen- & Kostümbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Rollen- & Kostümbücher</font>',
						icon: 'resources/images/carnival.png'
					});
				
				}
			else if(item.data.text === 'Theaterberufe'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Theaterberufe</font>',
						icon: 'resources/images/theatreB.png'
					});
				
				}
			else if(item.data.text === 'Ausgaben'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Finanzwesen: Ausgaben</font>',
						icon: 'resources/images/MoneyTransfer-17.png'
					});
				
				}
			else if(item.data.text === 'Einnahmen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Finanzwesen: Einnahmen</font>',
						icon: 'resources/images/MoneyBox-17.png'
					});
				
				}
			else if(item.data.text === 'Gagenbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:#A87678;">Finanzwesen: Gagenbücher</font>',
						icon: 'resources/images/Gift-17.png'
					});
				
				}
				
				
				if(repertoireTab !== null){
					this.tabPanel.add(repertoireTab);
					this.tabPanel.setActiveTab(repertoireTab);
				}
			}
		};

        this.items = [
            {
                title: 'Verwaltung',
                useArrows: true
               // colspan: 2
            }
        ];



        this.callParent();
    },

	setHTTabPanel: function(tabPanel){
		this.tabPanel = tabPanel;
	}
});