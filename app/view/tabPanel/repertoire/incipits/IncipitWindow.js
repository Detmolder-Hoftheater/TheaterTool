Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitWindow', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Incipit</b>',

width: 500,
height:400,


	
 
	border: false,
	
	autoScroll: true,

	
	meiE: null,
	
	/*initComponent: function () {
	
		
		
		
		this.callParent()
	},*/

showNoten: function(meiE){
var me = this;
		var options = JSON.stringify({
					//pageHeight: 350,
					//pageWidth: 259,
					//ignoreLayout: 5,
					//border: 3,
							noLayout: 1,
					scale: 50
				});
				renderer.setOptions(options);

renderer.loadData(meiE);
console.log(me.id);
			var svg_1 = renderer.renderData(meiE, options);
			$('#'+me.id+'-innerCt').html(svg_1);	
	
}
});