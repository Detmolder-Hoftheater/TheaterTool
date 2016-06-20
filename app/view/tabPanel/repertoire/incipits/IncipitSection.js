/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection', {
	extend: 'Ext.panel.Panel',

minHeight: 50,
   
    //resizable: true,

/*autoScroll: true,
reserveScrollbar: true,

border: false,*/

/*width: 850,
height:450,*/

height:100,

border: true,
autoScroll: true,


	setTextInfo: function(meiE){

var options = JSON.stringify({
					//pageHeight: 450,
					//pageWidth: 850,
					//ignoreLayout: 25,
					//border: 0,
							noLayout: 1,
					scale: 10
				});
				renderer.setOptions(options);

renderer.loadData(meiE);

			var svg_1 = renderer.renderData(meiE, options);
			$('#'+this.id+'-innerCt').html(svg_1);	

	}
	
	
	
});