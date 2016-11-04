Ext.define('TheaterTool.store.work.Works', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.Werk',
    extraParams: {
        selection1: '',
        selection2: '',
        selection3: '',
        selection4: '',
        selection5: ''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getWorks.xql'
    },
    autoLoad: false
}
//worksStoreMap: null,
/*handleStoreForWorks: function(selection, isSelected){
		var navTreeStore = null;
		if(this.worksStoreMap === null){
			this.worksStoreMap = new Map();
		}
		
			if(selection === 'Aschenbrödel' || selection === 'Des Teufels Anteil' || selection === 'Der Bettelstudent'){
					//for(var i = 0; i < storeField.length; i++){
						var workName = selection;
						if(this.worksStoreMap.has(selection)){
							navTreeStore = this.worksStoreMap.get(selection);
						}
						else{
							navTreeStore = this.createStoreForWork();
							navTreeStore.getProxy().extraParams.workName = selection;					
							navTreeStore.load();
							var key = selection;
							this.worksStoreMap.set(key, navTreeStore);
						}
				
					//}
			}
			else if(isSelected){
			    // one work was selected				
				    var workName = selection;
						if(this.worksStoreMap.has(selection)){
							navTreeStore = this.worksStoreMap.get(selection);
						}
						else{
							navTreeStore = this.createStoreForWork();
							navTreeStore.getProxy().extraParams.workName = selection;					
							navTreeStore.load();
							var key = selection;
							this.worksStoreMap.set(key, navTreeStore);
						}
			}
			else {
				if(this.worksStoreMap.has(selection)){
					navTreeStore = this.worksStoreMap.get(selection);

				}
				else{
					navTreeStore = this.createStore();

                   if(selection === 1){
					navTreeStore.getProxy().extraParams.selection1 = 'A';
					navTreeStore.getProxy().extraParams.selection2 = 'B';
					navTreeStore.getProxy().extraParams.selection3 = 'C';
					
				}
				else if(selection === 2){
					navTreeStore.getProxy().extraParams.selection1 = 'D';
					navTreeStore.getProxy().extraParams.selection2 = 'E';
					navTreeStore.getProxy().extraParams.selection3 = 'F';
					
				}
				else if(selection === 3){
					navTreeStore.getProxy().extraParams.selection1 = 'G';
					navTreeStore.getProxy().extraParams.selection2 = 'H';
					navTreeStore.getProxy().extraParams.selection3 = 'I';
					
				}
				else if(selection === 4){
					navTreeStore.getProxy().extraParams.selection1 = 'J';
					navTreeStore.getProxy().extraParams.selection2 = 'K';
					navTreeStore.getProxy().extraParams.selection3 = 'L';
					
				}
				else if(selection === 5){
					navTreeStore.getProxy().extraParams.selection1 = 'M';
					navTreeStore.getProxy().extraParams.selection2 = 'N';
					navTreeStore.getProxy().extraParams.selection3 = 'O';
					
				}
				else if(selection === 6){
					navTreeStore.getProxy().extraParams.selection1 = 'P';
					navTreeStore.getProxy().extraParams.selection2 = 'Q';
					navTreeStore.getProxy().extraParams.selection3 = 'R';
					
				}
				else if(selection === 7){
					navTreeStore.getProxy().extraParams.selection1 = 'S';
					navTreeStore.getProxy().extraParams.selection2 = 'T';
					navTreeStore.getProxy().extraParams.selection3 = 'U';
					
				}
				else if(selection === 8){
					navTreeStore.getProxy().extraParams.selection1 = 'V';
					navTreeStore.getProxy().extraParams.selection2 = 'W';
					navTreeStore.getProxy().extraParams.selection3 = 'X';
					navTreeStore.getProxy().extraParams.selection3 = 'Y';
					navTreeStore.getProxy().extraParams.selection3 = 'Z';
					
				}
				
				
				navTreeStore.load();
					var key = selection;
					this.worksStoreMap.set(key, navTreeStore);

				}

			}
return navTreeStore;

}*/

);