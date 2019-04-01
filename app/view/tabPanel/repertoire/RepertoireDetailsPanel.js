Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires:[ 'Ext.layout.container.Border'],
    layout: 'border',
    flex: 1,
    bodyBorder: false,
    border: false,
    /*style: {
        borderRight: '7px solid white',
        borderLeft: '7px solid white',
        borderTop: '7px solid white',
        borderBottom: '7px solid white'
    },*/
    
    defaults: {
        autoScroll: true,
        split: true
    },
    
    navTreetitle: null,
    
    selection: null,
    
    initComponent: function () {
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree({
            //title: this.navTreetitle
        });
        
        var navTreeStore = new TheaterTool.store.work.Works();
        navTreeStore.getProxy().extraParams.selection = this.selection;
        navTreeStore.load();
        navTree.getView().bindStore(navTreeStore);
        navTreeStore.sort([ {
            sorterFn: function (event1, event2) {
                //console.log('sorter 1');
                var data1 = event1. get ('name').valueOf().toString();
                var data2 = event2. get ('name').valueOf().toString();
                
                var data1_substrArray = data1.split(' ');
                var data1_substr = data1_substrArray[0] + ' ';
                if (data1_substr.indexOf('Der ') !== -1 || data1_substr.indexOf('Die ') !== -1 || data1_substr.indexOf('Das ') !== -1 || data1_substr.indexOf('Des ') !== -1 || data1_substr.indexOf('der ') !== -1 || data1_substr.indexOf('die ') !== -1 || data1_substr.indexOf('das ') !== -1 || data1_substr.indexOf('des ') !== -1 || data1_substr.indexOf('The ') !== -1 || data1_substr.indexOf('Les ') !== -1 || data1_substr.indexOf('Le ') !== -1 || data1_substr.indexOf('La ') !== -1 || data1_substr.indexOf("L' ") !== -1) {
                    var tmp = data1.split(data1_substr);
                    data1 = tmp[1];
                }
                
                var data2_substrArray = data2.split(' ', 2);
                
                var data2_substr = data2_substrArray[0] + ' ';
                if (data2_substr.indexOf('Der ') !== -1 || data2_substr.indexOf('Die ') !== -1 || data2_substr.indexOf('Das ') !== -1 || data2_substr.indexOf('Des ') !== -1 || data2_substr.indexOf('der ') !== -1 || data2_substr.indexOf('die ') !== -1 || data2_substr.indexOf('das ') !== -1 || data2_substr.indexOf('des ') !== -1 || data2_substr.indexOf('The ') !== -1 || data2_substr.indexOf('Les ') !== -1 || data2_substr.indexOf('Le ') !== -1 || data2_substr.indexOf('La ') !== -1 || data2_substr.indexOf("L' ") !== -1) {
                    var tmp_1 = data2.split(data2_substr);
                    data2 = tmp_1[1];
                }
                
                return data1.localeCompare(data2);
            },
            direction: 'ASC'
        }]);
        
        var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
        navTree.setRepertoirePanel(repertoirePanel);
        
        this.items =[
        navTree,
        repertoirePanel];
        
        this.callParent();
    }
});