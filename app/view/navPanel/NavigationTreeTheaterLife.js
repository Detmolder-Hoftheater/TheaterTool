var store = Ext.create('Ext.data.TreeStore', {
   root: {
        text: 'Ext JS',
        expanded: true,
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
                    icon: 'resources/images/MoneyTransfer-17.png'},
                    { leaf:true, text: 'Einnahmen',
                    icon: 'resources/images/MoneyBox-17.png'},
                    { leaf:true, text: 'Gagenbücher',
                    icon: 'resources/images/Gift-17.png'}
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
	rootVisible: false,
	store: store ,
	tabPanel: null,

style: {
     
     
     
      borderBottom: '1px solid #A80016'
    },
border:false,

	title: '<b style="color:gray;">Verwaltung</b>',
    
    initComponent: function() {

this.listeners = {
			
			itemdblclick: function (record, item, index, e, eOpts) {
				var repertoireTab = null;
				if(item.data.text === 'Dekoration'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Dekoration',
						icon: 'resources/images/theatre.png'
					});
				
				}
			else if(item.data.text === 'Regiebücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Regiebücher',
						icon: 'resources/images/Crown-17.png'
					});
				
				}
			else if(item.data.text === 'Rollen- & Kostümbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Rollen- & Kostümbücher',
						icon: 'resources/images/carnival.png'
					});
				
				}
			else if(item.data.text === 'Theaterberufe'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Theaterberufe',
						icon: 'resources/images/theatreB.png'
					});
				
				}
			else if(item.data.text === 'Ausgaben'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Finanzwesen: Ausgaben',
						icon: 'resources/images/Transfer-17.png'
					});
				
				}
			else if(item.data.text === 'Einnahmen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Finanzwesen: Einnahmen',
						icon: 'resources/images/MoneyBox-17.png'
					});
				
				}
			else if(item.data.text === 'Gagenbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Finanzwesen: Gagenbücher',
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