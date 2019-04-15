Ext.define('TheaterTool.view.tabPanel.taxation.TaxTabDetails', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    regieName: null,
    count: null,
    dbkeyPerson: null,
    dbkey: null,
    elementList: null,
    workelements: null,
    
    initComponent: function () {
        
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getTaxContent.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
            },
            success: function (response) {
                var tableInhalt = response.responseText;
                
                me.add({
                    
                    html: tableInhalt,
                    border: false,
                    listeners: {
                        afterrender: function (panel) {
                            me.elementList = panel.el.dom.getElementsByTagName('persname');
                            me.workelements = panel.el.dom.getElementsByTagName('rs');
                        }
                    }
                });
                
                if (me.dbkey !== null) {
                    var elementToFocus = '';
                    
                    var filteredList = new Array();
                    for (var i = 0; i < me.elementList.length; i++) {
                        var oneElement = me.elementList[i];
                        if (oneElement.id === me.dbkey && filteredList.indexOf(oneElement) === -1) {
                            filteredList.push(oneElement);
                        }
                    }
                    
                    
                    for (var i = 0; i < me.workelements.length; i++) {
                        var element = me.workelements[i];
                        if (element.id === me.dbkey) {
                            filteredList.push(element);
                        }
                    }
                    
                    for (var i = 0; i < filteredList.length; i++) {
                        var element = filteredList[i];
                        element.style.backgroundColor = "lightgray";
                        if (elementToFocus === '' && parseInt(me.count) === parseInt(i)) {
                            element.style.border = "thick solid lightgray";
                            elementToFocus = element;
                            elementToFocus.scrollIntoView();
                        }
                    }
                }
            }
        });
        
        getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + workName + '</font>',
                    icon: workIcon,
                    id: 'werk_' + workId
                });
               
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                });
               repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };
        getPersonContent = function (personId, personName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + personName + '</font>',
                    icon: 'resources/images/Mask-19.png',
                    id: 'person_' + personId
                });
                var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                    dbkey: personId, title: '<font size="2" face="Arial" style="color:#A87678;">Person: ' + personName + '</font>', icon: 'resources/images/Mask-19.png'
                });
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        }
      
        me.callParent();
    }
});