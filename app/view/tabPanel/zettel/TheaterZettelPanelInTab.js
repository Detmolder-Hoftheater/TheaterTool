Ext.define('TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTab', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},

	//border: true,

	flex:1,
	bodyPadding:7,

	initComponent: function () {

	this.items = [
	{
			html: '<img src="resources/images/Info.png" style="width:15px;height:15px;"> In Suchmaske im "Dokumententyp"-Kombobox einen Parameter "Theaterzettel" auswählen!',
			margin: '10 0 0 10',
			border: false

		},
			
			{
    xtype: 'component',
    margin: '10 0 10 10',
    autoEl: {
        tag: 'a',
        href: 'http://www.llb-detmold.de/webOPACClient_lippe/start.do',
        //href: 'http://www.llb-detmold.de/webOPACClient_lippe/searchHistory.do?searchHistory=Suchanfrage 2  Dokumententyp = Theaterzettel AND Jahr >= 1825 AND Jahr <= 1825',
        //'http://www.llb-detmold.de/webOPACClient_lippe/start.do&id=Dokumententyp&value=15',
        //?methodToCall=submit&Dokumententyp=Theaterzettel&searchRestrictionValue1=1825&searchRestrictionValue2=1825',
        html: 'Theaterzettelsuche in der Lippischen Landesbibliothek',
		target: "_blank"
    }
    }	
    ]
   // http://www.llb-detmold.de/webOPACClient_lippe/search.do?methodToCall=submit&CSId=11938N12S1066a24a08e91bed7d0d9aa0d96d544c4bc1a21b&methodToCallParameter=submitSearch&searchCategories%5B0%5D=-1&searchString%5B0%5D=&combinationOperator%5B1%5D=AND&searchCategories%5B1%5D=100&searchString%5B1%5D=&combinationOperator%5B2%5D=AND&searchCategories%5B2%5D=331&searchString%5B2%5D=&combinationOperator%5B3%5D=AND&searchCategories%5B3%5D=902&searchString%5B3%5D=&submitSearch=Suchen&callingPage=searchParameters&searchRestrictionID%5B0%5D=5&searchRestrictionValue1%5B0%5D=&searchRestrictionID%5B1%5D=4&searchRestrictionValue1%5B1%5D=&searchRestrictionID%5B2%5D=3&searchRestrictionValue1%5B2%5D=15&searchRestrictionID%5B3%5D=1&searchRestrictionValue1%5B3%5D=1825&searchRestrictionValue2%5B3%5D=1825
// http://www.llb-detmold.de/webOPACClient_lippe/searchHistory.do?searchHistory="Suchanfrage 2  Dokumententyp = Theaterzettel AND Jahr >= 1825 AND Jahr <= 1825"
    	this.callParent();
	}
});