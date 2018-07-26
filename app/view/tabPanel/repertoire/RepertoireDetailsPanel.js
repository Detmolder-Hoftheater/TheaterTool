Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires:[ 'Ext.layout.container.Border'],
    layout: 'border',
    flex: 1,
    bodyBorder: false,
    border: false,
    style: {
        borderRight: '7px solid white',
        borderLeft: '7px solid white',
        borderTop: '7px solid white',
        borderBottom: '7px solid white'
    },
    
    defaults: {
        autoScroll: true,
        split: true
    },
    
    navTreetitle: null,
    
    selection: null,
    
    initComponent: function () {
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree({
            title: this.navTreetitle
        });
        
        var navTreeStore = new TheaterTool.store.work.Works();
        if (this.selection === 1) {
            navTreeStore.getProxy().extraParams.selection1 = 'A';
            navTreeStore.getProxy().extraParams.selection2 = 'B';
            navTreeStore.getProxy().extraParams.selection3 = 'C';
        } else if (this.selection === 2) {
            navTreeStore.getProxy().extraParams.selection1 = 'D';
            navTreeStore.getProxy().extraParams.selection2 = 'E';
            navTreeStore.getProxy().extraParams.selection3 = 'F';
        } else if (this.selection === 3) {
            navTreeStore.getProxy().extraParams.selection1 = 'G';
            navTreeStore.getProxy().extraParams.selection2 = 'H';
            navTreeStore.getProxy().extraParams.selection3 = 'I';
        } else if (this.selection === 4) {
            navTreeStore.getProxy().extraParams.selection1 = 'J';
            navTreeStore.getProxy().extraParams.selection2 = 'K';
            navTreeStore.getProxy().extraParams.selection3 = 'L';
        } else if (this.selection === 5) {
            navTreeStore.getProxy().extraParams.selection1 = 'M';
            navTreeStore.getProxy().extraParams.selection2 = 'N';
            navTreeStore.getProxy().extraParams.selection3 = 'O';
        } else if (this.selection === 6) {
            navTreeStore.getProxy().extraParams.selection1 = 'P';
            navTreeStore.getProxy().extraParams.selection2 = 'Q';
            navTreeStore.getProxy().extraParams.selection3 = 'R';
        } else if (this.selection === 7) {
            navTreeStore.getProxy().extraParams.selection1 = 'S';
            navTreeStore.getProxy().extraParams.selection2 = 'T';
            navTreeStore.getProxy().extraParams.selection3 = 'U';
        } else if (this.selection === 8) {
            navTreeStore.getProxy().extraParams.selection1 = 'V';
            navTreeStore.getProxy().extraParams.selection2 = 'W';
            navTreeStore.getProxy().extraParams.selection3 = 'X';
            navTreeStore.getProxy().extraParams.selection3 = 'Y';
            navTreeStore.getProxy().extraParams.selection3 = 'Z';
        }
        // navTreeStore.getProxy().extraParams.workName = this.selection;
        navTreeStore.load();
        navTree.getView().bindStore(navTreeStore);
       navTreeStore.sort([            {
                sorterFn: function (event1, event2) {
                    //console.log('sorter 1');
                    var data1 = event1.get('name').valueOf().toString();
                    var data2 = event2.get('name').valueOf().toString();
                    
                    var data1_substrArray = data1.split(' ');                  
                    var data1_substr = data1_substrArray[0]+' ';
                    if(data1_substr.indexOf('Der ') !== -1 || data1_substr.indexOf('Die ') !== -1 || data1_substr.indexOf('Das ') !== -1
                    || data1_substr.indexOf('The ') !== -1 || data1_substr.indexOf('Les ') !== -1 || data1_substr.indexOf('Le ') !== -1
                    || data1_substr.indexOf('La ') !== -1){
                        var tmp = data1.split(data1_substr);
                        data1 = tmp[1];
                    }
                    
                    var data2_substrArray = data2.split(' ', 2);
                    
                    var data2_substr = data2_substrArray[0]+' ';
                    if(data2_substr.indexOf('Der ') !== -1 || data2_substr.indexOf('Die ') !== -1 || data2_substr.indexOf('Das ') !== -1
                    || data2_substr.indexOf('The ') !== -1 || data2_substr.indexOf('Les ') !== -1 || data2_substr.indexOf('Le ') !== -1
                    || data2_substr.indexOf('La ') !== -1){
                        var tmp_1 = data2.split(data2_substr);
                        data2 = tmp_1[1];
                        
                    }
                    
                    return data1.localeCompare(data2);
                },
                direction: 'ASC'
            }
           
        ]);
        
        var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
        navTree.setRepertoirePanel(repertoirePanel);
        
        this.items =[
        navTree,
        repertoirePanel];
       
        this.callParent();
    }
});