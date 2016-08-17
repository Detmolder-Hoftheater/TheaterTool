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
                text: 'Tiefenerschlossene Werke',
                
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
                    { text: 'Spielpläne',
                    icon: 'resources/images/Calendar-17.png',
						children: [
                    	{ leaf:true, text: '1825',
                    	icon: 'resources/images/Calendar-17.png'
						},
                    	{ leaf:true, text: '1826',
                    	icon: 'resources/images/Calendar-17.png'},
                   		{ leaf:true, text: '1827',
                    	icon: 'resources/images/Calendar-17.png' },
                    	{ leaf:true, text: '1828',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1829',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1830',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1831',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1832',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1833',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1834',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1835',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1836',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1837',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1838',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1839',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1840',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1841',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1842',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1843',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1844',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1845',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1846',
                    	icon: 'resources/images/Calendar-17.png'},
                    	{ leaf:true, text: '1847',
                    	icon: 'resources/images/Calendar-17.png'}
                	]
					},
                    { leaf:true, text: '<font style="color:gray;">Aufführungen</font>',
                    icon: 'resources/images/Time-17.png'},
                    { leaf:true, text: '<font style="color:gray;">Theaterzettel</font>',
                    icon: 'resources/images/Day-17.png' }
                ]
            },
            	{ 
            	text: 'Personen',
            	icon: 'resources/images/Mask-19.png',
children: [
                    { leaf:true, text: 'A-B-C',
                    icon: 'resources/images/Mask-19.png'},
                       { leaf:true, text: 'D-E-F',
                    icon: 'resources/images/Mask-19.png'},
                        
                          { leaf:true, text: 'G-H-I',
                    icon: 'resources/images/Mask-19.png'},
                          
                             { leaf:true, text: 'J-K-L',
                    icon: 'resources/images/Mask-19.png'},
                             
                                { leaf:true, text: 'M-N-O',
                    icon: 'resources/images/Mask-19.png'},
                                 
                                   { leaf:true, text: 'P-Q-R',
                    icon: 'resources/images/Mask-19.png'},
                                   
                                      { leaf:true, text: 'S-T-U',
                    icon: 'resources/images/Mask-19.png'},
                                      
                                         { leaf:true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/Mask-19.png'}
                                         
                ]
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
                    { leaf:true, text: '<font style="color:gray;">Linksammlung</font>',
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
                   
                //]
          //  },
            {
                text: 'Finanzwesen',
                icon: 'resources/images/Coins-17.png',
               // expanded: true,
                children: [
 { text: 'Einnahmen',
                    icon: 'resources/images/MoneyBox-17.png',
children: [
                    	{ leaf:true, text: '1825',
                    	icon: 'resources/images/MoneyBox-17.png'
						},
                    	{ leaf:true, text: '1826',
                    	icon: 'resources/images/MoneyBox-17.png'},
                   		{ leaf:true, text: '1827',
                    	icon: 'resources/images/MoneyBox-17.png' },
                    	{ leaf:true, text: '1828',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1829',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1830',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1831',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1832',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1833',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1834',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1835',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1836',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1837',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1838',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1839',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1840',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1841',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1842',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1843',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1844',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1845',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1846',
                    	icon: 'resources/images/MoneyBox-17.png'},
                    	{ leaf:true, text: '1847',
                    	icon: 'resources/images/MoneyBox-17.png'}
                	]


},
                    { text: 'Jährliche Ausgaben',
                    icon: 'resources/images/MoneyTransfer-17.png',
children: [
                    	/*{ leaf:true, text: '1825',
                    	icon: 'resources/images/MoneyTransfer-17.png'
						},*/
                    	{ leaf:true, text: '1826',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                   		{ leaf:true, text: '1827',
                    	icon: 'resources/images/MoneyTransfer-17.png' },
                    	{ leaf:true, text: '1828',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1829',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1830',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1831',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1832',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1833',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1834',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1835',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1836',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1837',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1838',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1839',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1840',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1841',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1842',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1843',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1844',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1845',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1846',
                    	icon: 'resources/images/MoneyTransfer-17.png'},
                    	{ leaf:true, text: '1847',
                    	icon: 'resources/images/MoneyTransfer-17.png'}
                	]

},
{ leaf:true, text: 'Gagenbücher',
                    icon: 'resources/images/Gift-17.png'
}
                   
                    
                ]
            },
 { leaf:true, text: '<font style="color:gray;">Dekoration</font>',
                    icon: 'resources/images/theatre.png' },
                    { text: 'Regiebücher',
                    icon: 'resources/images/Crown-17.png',
children: []},
                    { leaf:true, text: 'Rollen- & Kostümbücher',
                     icon: 'resources/images/carnival.png'},
                    { leaf:true, text: '<font style="color:gray;">Theaterberufe</font>',
                    icon: 'resources/images/theatreB.png'}
        ]

}
]
}
})





Ext.define('TheaterTool.view.navPanel.NavigationTreePublic', {
    extend: 'Ext.tree.Panel',
   
reserveScrollbar: true,
	id: 'NavigationTreeGlobal',
	useArrows: true,
	rootVisible: false,
	store: store,

//	title: '<font style="color:#A87678;">Spielbetrieb</font>',
/*'<b style="color:gray;">Spielbetrieb</b>',*/

	tabPanel: null,
    
border:false,
bodyborder: false,
bodyPadding: 3,
    
    initComponent: function() {
		var me = this;

Ext.Ajax.request({           
    			url:'resources/xql/getRegieMenu.xql', 
			method: 'GET',    
    			success: function (response, options) {
 					var json = jQuery.parseJSON(response.responseText);
					
					//console.log(json);	
				var navTreeStoreRoot = me.store.getRootNode();
				var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[2];

for(i = 0; i < json.names.length; i++){
	var regName = json.names[i];
	regieMenu.appendChild({
					 leaf:true, text: regName,
                    icon: 'resources/images/Crown-17.png'
				}); 
}				   			
    			}
			});

Ext.Ajax.request({           
    			url:'resources/xql/getRollenKostuemMenu.xql', 
			method: 'GET',    
    			success: function (response, options) {
 					var json = jQuery.parseJSON(response.responseText);
					
					//console.log(json);	
				var navTreeStoreRoot = me.store.getRootNode();
				var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[3];
				for(i = 0; i < json.names.length; i++){
					var regName = json.names[i];
					regieMenu.appendChild({
					 leaf:true, text: regName,
                    icon: 'resources/images/carnival.png'
				}); 
				}				   			
    			}
			});

Ext.Ajax.request({           
    			url:'resources/xql/getGagenMenu.xql', 
			method: 'GET',    
    			success: function (response, options) {
 					var json = jQuery.parseJSON(response.responseText);
					
					//console.log(json);	
				var navTreeStoreRoot = me.store.getRootNode();
				var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[0].childNodes[2];
				for(i = 0; i < json.names.length; i++){
					var regName = json.names[i];
					regieMenu.appendChild({
					 leaf:true, text: regName,
                    icon: 'resources/images/Gift-17.png'
				}); 
				}				   			
    			}
			});

Ext.Ajax.request({           
    			url:'resources/xql/getAboMenu.xql', 
			method: 'GET',    
    			success: function (response, options) {
 					var json = jQuery.parseJSON(response.responseText);
					
					//console.log(json);	
				var navTreeStoreRoot = me.store.getRootNode();
				var regieMenu = navTreeStoreRoot.childNodes[0].childNodes[4];
				for(i = 0; i < json.names.length; i++){
					var regName = json.names[i];
					regieMenu.appendChild({
					 leaf:true, text: regName,
                    icon: 'resources/images/Ticket-14.png'
				}); 
				}				   			
    			}
			});

Ext.Ajax.request({           
    			url:'resources/xql/getJournalMenu.xql', 
			method: 'GET',    
    			success: function (response, options) {
 					var json = jQuery.parseJSON(response.responseText);
					
					//console.log(json);	
				var navTreeStoreRoot = me.store.getRootNode();
				var regieMenu = navTreeStoreRoot.childNodes[0].childNodes[5].childNodes[1];
				for(i = 0; i < json.names.length; i++){
					var regName = json.names[i];
					regieMenu.appendChild({
					 leaf:true, text: regName,
                    icon: 'resources/images/Presse-16.png'
				}); 
				}				   			
    			}
			});


this.listeners = {
			itemdblclick: function (record, item, index, e, eOpts) {
				var repertoireTab = null;
				if(item.data.text === 'Aschenbrödel'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Aschenbrödel</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: 'Aschenbrödel'});
				//var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.data.text === 'Des Teufels Anteil'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Des Teufels Anteil</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				
				//var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Des Teufels Anteil'});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: 'Des Teufels Anteil'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.data.text === 'Der Bettelstudent'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Der Bettelstudent</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: 'Der Bettelstudent'});
				//var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
				repertoireTab.add(repertoireDetails);		
				}
				else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'A-B-C'){					
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">A-B-C</font>',
						icon: 'resources/images/Books1-17.png'
					});
				
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 1});
				repertoireTab.add(repertoireDetails);		
				}
			else  if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'D-E-F'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">D-E-F</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 2});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'G-H-I'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">G-H-I</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 3});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'J-K-L'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">J-K-L</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 4});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'M-N-O'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">M-N-O</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 5});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'P-Q-R'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">P-Q-R</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 6});
				repertoireTab.add(repertoireDetails);
			
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'S-T-U'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">S-T-U</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 7});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Repertoire' && item.data.text === 'V-W-X-Y-Z'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">V-W-X-Y-Z</font>',
						icon: 'resources/images/Books1-17.png'
					});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 8});
				repertoireTab.add(repertoireDetails);
				
				}
			else if(item.parentNode.data.text === 'Spielpläne'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Spielpläne: '+item.data.text+'</font>',
						icon: 'resources/images/Calendar-17.png'
					});
				var scheduleDetails = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab({year: item.data.text});
				//var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
				repertoireTab.add(scheduleDetails);
			
				}
			else if(item.data.text === 'Aufführungen'){
					/*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Aufführungen</font>',
						icon: 'resources/images/Time-17.png'
					});*/
				
				}
			else if(item.data.text === 'Theaterzettel'){
					/*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Theaterzettel</font>',
						icon: 'resources/images/Day-17.png'
					});*/
				
				}
			else if(item.parentNode.data.text === 'Personen'){
					var win = new TheaterTool.view.tabPanel.persons.PersonSelectionDialog({selection: item.data.text, tabPanel : this.tabPanel});
					win.show();
					if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
							Ext.getCmp('infoDialog').close();
					}


				/*	repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
				//var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({year: item.data.text});
				var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: item.data.text});
				repertoireTab.add(repertoireDetails);	*/
				}
			else if(item.parentNode.data.text === 'Karten & Abos'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/Ticket-14.png'
					});
				var regieDetails = new TheaterTool.view.tabPanel.abo.AboPanelInTab({regieName: item.data.text});
				repertoireTab.add(regieDetails);
				}
			else if(item.data.text === 'Linksammlung'){
					/*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Linksammlung</font>',
						icon: 'resources/images/Presse-16.png'
					});*/
				
				}
			else if(item.parentNode.data.text === 'Theaterjournal'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/Presse-16.png'
					});
				var regieDetails = new TheaterTool.view.tabPanel.journal.JournalPanelInTab({regieName: item.data.text});
				repertoireTab.add(regieDetails);
				
				}
			else if(item.data.text === 'Dekoration'){
					/*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Dekoration</font>',
						icon: 'resources/images/theatre.png'
					});*/
				
				}
			else if(item.parentNode.data.text === 'Regiebücher'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/Crown-17.png'
					});
				var regieDetails = new TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab({regieName: item.data.text});
				repertoireTab.add(regieDetails);
				
				}
			else if(item.parentNode.data.text === 'Rollen- & Kostümbücher'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/carnival.png'
					});
				var regieDetails = new TheaterTool.view.tabPanel.rolebooks.RoleKostuemPanelInTab({regieName: item.data.text});
				repertoireTab.add(regieDetails);
				
				}
			else if(item.data.text === 'Theaterberufe'){
					/*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Theaterberufe</font>',
						icon: 'resources/images/theatreB.png'
					});*/
				
				}
			else if(item.parentNode.data.text === 'Jährliche Ausgaben'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Gesamte Ausgaben</font>',
						icon: 'resources/images/MoneyTransfer-17.png'
					});
				var issueDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({year: item.data.text});
				repertoireTab.add(issueDetails);				
				}
			else if(item.parentNode.data.text === 'Einnahmen'){
					repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Einnahmen: '+item.data.text+'</font>',
						icon: 'resources/images/MoneyBox-17.png'
					});

				var revenueDetails = new TheaterTool.view.tabPanel.revenue.RevenuePanelInTab({year: item.data.text});
				repertoireTab.add(revenueDetails);
				
				}
			else if(item.parentNode.data.text === 'Gagenbücher'){
				repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+item.data.text+'</font>',
						icon: 'resources/images/Gift-17.png'
					});
				var regieDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({regieName: item.data.text});
				repertoireTab.add(regieDetails);
				}


				if(repertoireTab !== null){
 					if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
							Ext.getCmp('infoDialog').close();
					}
				if(repertoireTab !== null){
					this.tabPanel.add(repertoireTab);
					this.tabPanel.setActiveTab(repertoireTab);	
				}
									
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
	},

	getHTTabPanel: function(){
		return this.tabPanel;
	}
});