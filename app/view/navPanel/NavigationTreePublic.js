var store = Ext.create('Ext.data.TreeStore', {
   root: {
        text: 'Ext JS',
        expanded: true,
        children: [
            {
                text: 'Repertoire',
                icon: 'resources/images/Library-17.png',
            
                 children: [
                    { leaf:true, text: 'A-B-C',
                    icon: 'resources/images/Books1-17.png'},
                   /*  { leaf:true, text: 'B',
                    icon: 'null'},
                      { leaf:true, text: 'C',
                    icon: 'null'},*/
                       { leaf:true, text: 'D-E-F',
                    icon: 'resources/images/Books1-17.png'},
                        /*{ leaf:true, text: 'E',
                    icon: 'null'},
                         { leaf:true, text: 'F',
                    icon: 'null'},*/
                          { leaf:true, text: 'G-H-I',
                    icon: 'resources/images/Books1-17.png'},
                          /* { leaf:true, text: 'H',
                    icon: 'null'},
                            { leaf:true, text: 'I',
                    icon: 'null'},*/
                             { leaf:true, text: 'J-K-L',
                    icon: 'resources/images/Books1-17.png'},
                             /* { leaf:true, text: 'K',
                    icon: 'null'},
                               { leaf:true, text: 'L',
                    icon: 'null'},*/
                                { leaf:true, text: 'M-N-O',
                    icon: 'resources/images/Books1-17.png'},
                                 /*{ leaf:true, text: 'N',
                    icon: 'null'},
                                  { leaf:true, text: 'O',
                    icon: 'null'},*/
                                   { leaf:true, text: 'P-Q-R',
                    icon: 'resources/images/Books1-17.png'},
                                   /* { leaf:true, text: 'Q',
                    icon: 'null'},
                                     { leaf:true, text: 'R',
                    icon: 'null'},*/
                                      { leaf:true, text: 'S-T-U',
                    icon: 'resources/images/Books1-17.png'},
                                      /* { leaf:true, text: 'T',
                    icon: 'null'},
                                        { leaf:true, text: 'U',
                    icon: 'null'},*/
                                         { leaf:true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/Books1-17.png'}
                                         /* { leaf:true, text: 'W',
                    icon: 'null'},
                                           { leaf:true, text: 'X',
                    icon: 'null'},
                                            { leaf:true, text: 'Y',
                    icon: 'null'},
                                             { leaf:true, text: 'Z',
                    icon: 'null'}*/
                                             
                 
                ]
               
              /*  children: [
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
                ]*/
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
    extend: 'Ext.tree.Panel',
   //xtype: 'basic-trees',
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
   
  /* defaults: {
        xtype: 'treepanel',
      	//width: 260,
      	
        rootVisible: false,
        store: store
    },*/
    

reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: false,
	store: store ,

	title: '<b style="color:gray;">Spielbetrieb</b>',

	tabPanel: null,
    /* style: {
     
     
      borderTop: '1px solid #A80016',
      borderBottom: '1px solid #A80016'
    },*/
border:false,
    
    initComponent: function() {

this.listeners = {
			
			itemdblclick: function (record, item, index, e, eOpts) {
				var repertoireTab = null;
				if(item.data.text === 'A-B-C'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: A-B-C',
						icon: 'resources/images/Library-17.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel();
				repertoireTab.add(repertoireDetails);

		
				}
			else  if(item.data.text === 'D-E-F'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: D-E-F',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'G-H-I'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: G-H-I',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'J-K-L'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: J-K-L',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'M-N-O'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: M-N-O',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'P-Q-R'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: P-Q-R',
						icon: 'resources/images/Library-17.png'
					});
			
				}
			else if(item.data.text === 'S-T-U'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: S-T-U',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'V-W-X-Y-Z'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Repertoire: V-W-X-Y-Z',
						icon: 'resources/images/Library-17.png'
					});
				
				}
			else if(item.data.text === 'Spielpläne'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Programm: Spielpläne',
						icon: 'resources/images/Calendar-17.png'
					});
			
				}
			else if(item.data.text === 'Aufführungen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Programm: Aufführungen',
						icon: 'resources/images/Time-17.png'
					});
				
				}
			else if(item.data.text === 'Theaterzettel'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Programm: Theaterzettel',
						icon: 'resources/images/Day-17.png'
					});
				
				}
			else if(item.data.text === 'Personen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Personen',
						icon: 'resources/images/Mask-19.png'
					});
				
				}
			else if(item.data.text === 'Karten & Abos'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Karten & Abos',
						icon: 'resources/images/Ticket-14.png'
					});
				
				}
			else if(item.data.text === 'Linksammlung'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Presse: Linksammlung',
						icon: 'resources/images/Link-15.png'
					});
				
				}
			else if(item.data.text === 'Theaterjournal'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: 'Presse: Theaterjournal',
						icon: 'resources/images/Dossier-17.png'
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
                title: 'Spielbetrieb',
                useArrows: true
                //colspan: 2
            }
        ];

        this.callParent();
    },

	setHTTabPanel: function(tabPanel){
		this.tabPanel = tabPanel;
	}
});