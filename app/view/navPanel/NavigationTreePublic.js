var store = Ext.create('Ext.data.TreeStore', {
   root: {
        text: 'Ext JS',
        expanded: true,
        children: [
            {
                text: 'Repertoire',
                icon: 'resources/images/Library-17.png',
                //expanded: true,
                children: [
                    { text: 'Aschenbrödel: Isouard', 
                     icon: 'resources/images/Books1-17.png',
                     children: [
                    { text: 'Copyist of Detmold',
                    icon: 'resources/images/Book1-16.png',
                    	children: [                   		
                    		{ leaf:true, text: 'RISM',
                    		icon: 'resources/images/Literature-17.png'},
                    		{ leaf:true, text: 'Vertaktung',
                    		icon: 'resources/images/Musical-16.png'}
               			 ]
                    }
                ]},
                    { text: 'Der Bettelstudent: v. Winter',
                    icon: 'resources/images/Books1-17.png',
                     children: [
                    { text: 'Quelle_1',
                    icon: 'resources/images/Book1-16.png',
                    	children: [
                    		
                    		{ leaf:true, text: 'RISM',
                    		icon: 'resources/images/Literature-17.png' },
                    		{ leaf:true, text: 'Vertaktung',
                    		icon: 'resources/images/Musical-16.png' }
               			 ]
                    }
                    ]},
                    { text: 'Des Teufels Anteil: Auber', 
                    icon: 'resources/images/Books1-17.png',
                    children: [
                    { text: 'Quelle_1',
                    icon: 'resources/images/Book1-16.png',
                    	children: [
                    		
                    		{ leaf:true, text: 'RISM',
                    		icon: 'resources/images/Literature-17.png' },
                    		{ leaf:true, text: 'Vertaktung',
                    		icon: 'resources/images/Musical-16.png' }
               			 ]
                    }
                    ]}
                ]
            },
            {
                text: 'Programm',
                expanded: true,
                icon: 'resources/images/Magazine-17.png',
                children: [
                    { leaf:true, text: 'Spielpläne',
                    icon: 'resources/images/Calendar-17.png'},
                    { leaf:true, text: 'Aufführungen',
                    icon: 'resources/images/Time-17.png'},
                    { leaf:true, text: 'Theaterzettel',
                    icon: 'resources/images/Day-17.png' }
                ]
            },
            { 
            	leaf:true, 
            	text: 'Personen',
            	icon: 'resources/images/Mask-19.png'
            	},
            { 
            	leaf:true, 
            	text: 'Karten & Abos',
            	icon: 'resources/images/Ticket-14.png'
            	},
            {
                text: 'Presse',
                icon: 'resources/images/Presse-16.png',
                children: [
                    { leaf:true, text: 'Linksammlung',
                    icon: 'resources/images/Link-15.png'  },
                    { leaf:true, text: 'Theaterjournal',
                    icon: 'resources/images/Dossier-17.png' }
                ]
            }
        ]
    }
})





Ext.define('TheaterTool.view.navPanel.NavigationTreePublic', {
    extend: 'Ext.Container',
   xtype: 'basic-trees',
   // width: 330,
    //flex: 2,
   // autoScroll: true,
  
	//rootVisible: false,
	// store: store,
	
 //  layout: {
  //      type: 'table'
        //columns: 4
       // tdAttrs: { style: 'padding: 10px;' }
 //   },
   
   defaults: {
        xtype: 'treepanel',
      	//width: 260,
      	
        rootVisible: false,
        store: store
    },
    
    
    
    initComponent: function() {
        this.items = [
            {
                title: 'Öffentlichkeit',
                useArrows: true
                //colspan: 2
            }
        ];

        this.callParent();
    }
});