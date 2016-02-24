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
    extend: 'Ext.Container',
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

    defaults: {
        xtype: 'treepanel',
      // width: 260,
        
        
       // height: 200,
      
        rootVisible: false,
        // Sharing the store synchronizes the views:
        store: store
        
    },
    
    initComponent: function() {
        this.items = [
            {
                title: 'Verwaltung',
                useArrows: true
               // colspan: 2
            }
        ];

        this.callParent();
    }
});