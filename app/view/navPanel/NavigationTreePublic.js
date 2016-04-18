var store = Ext.create('Ext.data.TreeStore', {

 root: {
        text: 'Start',
   		children: [{
        	text: 'Spielbetrieb',
			icon: 'resources/images/Library-17.png',
        	expanded: true,
        	children: [
            	{
                text: 'Repertoire',
                icon: 'resources/images/Folder-17.png',
                 children: [
                    { leaf:true, text: 'A-B-C',
                    icon: 'resources/images/BooksVert-17.png'},
                   /*  { leaf:true, text: 'B',
                    icon: 'null'},
                      { leaf:true, text: 'C',
                    icon: 'null'},*/
                       { leaf:true, text: 'D-E-F',
                    icon: 'resources/images/BooksVert-17.png'},
                        /*{ leaf:true, text: 'E',
                    icon: 'null'},
                         { leaf:true, text: 'F',
                    icon: 'null'},*/
                          { leaf:true, text: 'G-H-I',
                    icon: 'resources/images/BooksVert-17.png'},
                          /* { leaf:true, text: 'H',
                    icon: 'null'},
                            { leaf:true, text: 'I',
                    icon: 'null'},*/
                             { leaf:true, text: 'J-K-L',
                    icon: 'resources/images/BooksVert-17.png'},
                             /* { leaf:true, text: 'K',
                    icon: 'null'},
                               { leaf:true, text: 'L',
                    icon: 'null'},*/
                                { leaf:true, text: 'M-N-O',
                    icon: 'resources/images/BooksVert-17.png'},
                                 /*{ leaf:true, text: 'N',
                    icon: 'null'},
                                  { leaf:true, text: 'O',
                    icon: 'null'},*/
                                   { leaf:true, text: 'P-Q-R',
                    icon: 'resources/images/BooksVert-17.png'},
                                   /* { leaf:true, text: 'Q',
                    icon: 'null'},
                                     { leaf:true, text: 'R',
                    icon: 'null'},*/
                                      { leaf:true, text: 'S-T-U',
                    icon: 'resources/images/BooksVert-17.png'},
                                      /* { leaf:true, text: 'T',
                    icon: 'null'},
                                        { leaf:true, text: 'U',
                    icon: 'null'},*/
                                         { leaf:true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/BooksVert-17.png'}
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
                text: 'Tiefenerschließung',
                
                icon: 'resources/images/AddFolder-16.png',
				children: [
                    { leaf:true, text: 'Aschenbrödel',
                    icon: 'resources/images/BookBlau-16.png'},
//icon: 'resources/images/BookTiefWerk.png'},
                    { leaf:true, text: 'Des Teufels Anteil',
                    icon: 'resources/images/BookBlau-16.png'},
                    { leaf:true, text: 'Der Bettelstudent',
                    icon: 'resources/images/BookBlau-16.png' }
                ]
            },
            	{
                text: 'Programm',
                
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
                    icon: 'resources/images/Presse-16.png' 
 /*icon: 'resources/images/Link-15.png'*/ 
 },
                    { leaf:true, text: 'Theaterjournal',
                    icon: 'resources/images/Presse-16.png'
/*icon: 'resources/images/Dossier-17.png'*/ 
}
                ]
            }
        	]
    	},
		{
 		text: 'Verwaltung',
		icon: 'resources/images/portfolio-17.png',
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
]
}
})





Ext.define('TheaterTool.view.navPanel.NavigationTreePublic', {
    extend: 'Ext.tree.Panel',
   //xtype: 'basic-trees',
   // width: 200,
   // flex: 0.23,
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

//	title: '<font style="color:#A87678;">Spielbetrieb</font>',
/*'<b style="color:gray;">Spielbetrieb</b>',*/

	tabPanel: null,
    // style: {
     
     /* borderRight: '1px solid #A80016',
      borderLeft: '1px solid #A80016',*/
     // borderTop: '1px solid gray'
      //borderBottom: '1px solid #A80016'
   // },
border:false,
bodyborder: false,
bodyPadding: 3,
    
    initComponent: function() {

this.listeners = {
			
			itemdblclick: function (record, item, index, e, eOpts) {
				var repertoireTab = null;
				if(item.data.text === 'Aschenbrödel'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Aschenbrödel</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.data.text === 'Des Teufels Anteil'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Des Teufels Anteil</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Des Teufels Anteil'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.data.text === 'Der Bettelstudent'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Der Bettelstudent</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.data.text === 'A-B-C'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">A-B-C</font>',
						icon: 'resources/images/Books1-17.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 1});
				repertoireTab.add(repertoireDetails);

		
				}
			else  if(item.data.text === 'D-E-F'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">D-E-F</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 2});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'G-H-I'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">G-H-I</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 3});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'J-K-L'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">J-K-L</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 4});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'M-N-O'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">M-N-O</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 5});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'P-Q-R'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">P-Q-R</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 6});
				repertoireTab.add(repertoireDetails);
			
				}
			else if(item.data.text === 'S-T-U'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">S-T-U</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 7});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'V-W-X-Y-Z'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">V-W-X-Y-Z</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 8});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.data.text === 'Spielpläne'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Spielpläne</font>',
						icon: 'resources/images/Calendar-17.png'
					});
			
				}
			else if(item.data.text === 'Aufführungen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Aufführungen</font>',
						icon: 'resources/images/Time-17.png'
					});
				
				}
			else if(item.data.text === 'Theaterzettel'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Theaterzettel</font>',
						icon: 'resources/images/Day-17.png'
					});
				
				}
			else if(item.data.text === 'Personen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Personen</font>',
						icon: 'resources/images/Mask-19.png'
					});
				
				}
			else if(item.data.text === 'Karten & Abos'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Karten & Abos</font>',
						icon: 'resources/images/Ticket-14.png'
					});
				
				}
			else if(item.data.text === 'Linksammlung'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Linksammlung</font>',
						icon: 'resources/images/Presse-16.png'
					});
				
				}
			else if(item.data.text === 'Theaterjournal'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Theaterjournal</font>',
						icon: 'resources/images/Presse-16.png'
					});
				
				}
			else if(item.data.text === 'Dekoration'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Dekoration</font>',
						icon: 'resources/images/theatre.png'
					});
				
				}
			else if(item.data.text === 'Regiebücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Regiebücher</font>',
						icon: 'resources/images/Crown-17.png'
					});
				
				}
			else if(item.data.text === 'Rollen- & Kostümbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Rollen- & Kostümbücher</font>',
						icon: 'resources/images/carnival.png'
					});
				
				}
			else if(item.data.text === 'Theaterberufe'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Theaterberufe</font>',
						icon: 'resources/images/theatreB.png'
					});
				
				}
			else if(item.data.text === 'Ausgaben'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Ausgaben</font>',
						icon: 'resources/images/MoneyTransfer-17.png'
					});
				
				}
			else if(item.data.text === 'Einnahmen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Einnahmen</font>',
						icon: 'resources/images/MoneyBox-17.png'
					});
				
				}
			else if(item.data.text === 'Gagenbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Gagenbücher</font>',
						icon: 'resources/images/Gift-17.png'
					});
				
				}


				if(repertoireTab !== null){
 					if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
							Ext.getCmp('infoDialog').close();
					}

					this.tabPanel.add(repertoireTab);
					this.tabPanel.setActiveTab(repertoireTab);					
				}
				
			}
		};

        this.items = [
            {
                title: 'Spielbetrieb',
                useArrows: true
            }
        ];

        this.callParent();
    },

	setHTTabPanel: function(tabPanel){
		this.tabPanel = tabPanel;
	}
});