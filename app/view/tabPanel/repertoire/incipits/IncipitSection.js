/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection', {
	extend: 'Ext.panel.Panel',

//minHeight: 50,
   
    resizable: true,

/*autoScroll: true,
reserveScrollbar: true,

border: false,*/

/*width: 850,
height:450,*/

height:173,
//width: 500,




border: true,
autoScroll: true,

meiE: null,

initComponent: function () {
		
		var me = this;

	me.listeners = {
   		'render': function(panel) {
       panel.body.on('click', function() {
           console.log('dbclick');
var win = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitWindow();
					win.show();

win.showNoten(me.meiE);

       });
    }
}
		me.callParent()
	
	},

	setTextInfo: function(meiE){
var me = this;
me.meiE = meiE;
var options = JSON.stringify({
					//pageHeight: 450,
					//pageWidth: 850,
					//ignoreLayout: 5,
					//border: 3,
							noLayout: 1,
					scale: 20
				});
				renderer.setOptions(options);

renderer.loadData(meiE);

			var svg_1 = renderer.renderData(meiE, options);
			$('#'+this.id+'-innerCt').html(svg_1);	
//var me = this;
		/*var options = JSON.stringify({
					//pageHeight: 450,
					//pageWidth: 850,
					//ignoreLayout: 25,
					border: 0,
					scale: 33
				});
				renderer.setOptions(options);*/

				/*renderer.loadData(meiE);
console.log(me.meiId);
			var svg_1 = renderer.renderData(meiE, options);
			$('#'+me.meiId+'-innerCt').html(svg_1);*/	


	}
	
	
	
});