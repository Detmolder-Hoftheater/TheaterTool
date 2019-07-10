/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('TheaterTool.Application', {
    extend: 'Ext.app.Application',
    
    name: 'TheaterTool',
    
    views:[
    'main.Main',
    'toolbar.HTToolbar',
    'panel.ViewPanel',
    'tabPanel.HTTabPanel',
    'tabPanel.HTTab',
    'navPanel.HTNavigationPanel',
    'tabPanel.repertoire.TabText',
    'tabPanel.repertoire.TabXML',
    'tabPanel.repertoire.work.WorkDetailsTabPanel',
    'tabPanel.repertoire.work.WorkDetailsTabPanelTest',
    'tabPanel.repertoire.RepertoirePanel',
    'tabPanel.repertoire.work.WorkPanelDetails',
    'tabPanel.repertoire.source.SourceOverviewSection',
    'tabPanel.repertoire.source.SourcePanel',
    'tabPanel.repertoire.rism.RISMPanel',
    'tabPanel.repertoire.beat.BeatPanel',
    'tabPanel.repertoire.beat.BeatXMLSection',
    'tabPanel.repertoire.work.PlanTable',
    'tabPanel.repertoire.work.JournalTable',
    'tabPanel.repertoire.work.RegieTable',
    'tabPanel.repertoire.work.RoleTable',
    'tabPanel.repertoire.work.RevenueTable',
    'tabPanel.repertoire.work.IssueTable',
    'tabPanel.repertoire.work.TabTextWork',
    'tabPanel.repertoire.work.TabXMLWork',
    'tabPanel.repertoire.work.WorkPanelInTab',
    'tabPanel.repertoire.rism.RISMDetailsTabPanel',
    'tabPanel.repertoire.rism.RISMDetailsSection',
    'tabPanel.repertoire.source.SourceDetailsTabPanel',
    'tabPanel.repertoire.source.SourcesTabPanel',
    'tabPanel.repertoire.source.SourceDetailsSection',
    'tabPanel.repertoire.source.SourcesSection',
    'tabPanel.repertoire.source.TabTextSource',
    'tabPanel.repertoire.source.SourcesTree',
    'tabPanel.repertoire.work.WorkDetailsSectionXML',
    'tabPanel.repertoire.source.TabXMLSource',
    'tabPanel.repertoire.source.SourceDetailsSectionXML',
    'tabPanel.repertoire.rism.RISMDetailsSectionXML',
    'tabPanel.repertoire.beat.LeafletFacsimile',
    'tabPanel.repertoire.beat.FacsimileView',
    
    'tabPanel.playSchedules.XMLWindow',
    'tabPanel.repertoire.RepertoireAlphNavigation',
    'tabPanel.repertoire.RepertoireDetailsPanel',
    'tabPanel.repertoire.work.WorkDetailsSection',
    'navPanel.NavigationTreePublic',
    'tabPanel.repertoire.RepertoireNavigationTree',
    'main.InformationDialog',
    'toolbar.DatenRelationWindow',
    'tabPanel.repertoire.RepertoirePanelInTab',
    'tabPanel.repertoire.RepertoireMenuItemTree',
    'tabPanel.repertoire.beat.FacsimileNavTree',
    'tabPanel.repertoire.PersonTable',
    'tabPanel.RoleTable',
    'tabPanel.DayReportTable',
    'tabPanel.TaxationTable',
    'tabPanel.playSchedules.SchedulePanelInTab',
    'tabPanel.playSchedules.ScheduleMenuItemTree',
    'tabPanel.playSchedules.SchedulePanelDetails',
    'tabPanel.playSchedules.ScheduleTextSection',
    'tabPanel.playSchedules.XMLSectionSchedule',
    'tabPanel.revenue.XMLSectionRevenue',
    'tabPanel.revenue.RevenueTextSection',
    'tabPanel.revenue.RevenuePanelDetails',
    'tabPanel.revenue.RevenueMenuItemTree',
    'tabPanel.revenue.RevenuePanelInTab',
    'tabPanel.revenue.RevenueTable',
    'tabPanel.revenue.FacsimileView',
    'tabPanel.revenue.LeafletFacsimile',
    'tabPanel.issue.IssuePanelInTab',
    'tabPanel.issue.IssueMenuItemTree',
    'tabPanel.issue.IssuePanelDetails',
    'tabPanel.issue.IssueTextSection',
    'tabPanel.issue.FacsimileView',
    'tabPanel.issue.XMLSectionIssue',
    'tabPanel.repertoire.incipits.IncipitsPanel',
    'tabPanel.repertoire.incipits.IncipitSection',
    'tabPanel.repertoire.incipits.IncipitWindow',
    'tabPanel.persons.PersonPanelInTab',
    'tabPanel.persons.PersonTabXML',
    'tabPanel.persons.PersonTabDetails',
    'tabPanel.persons.PersonSelectionDialog',
    'tabPanel.regiebooks.RegiePanelInTab',
    'tabPanel.regiebooks.RegieTabDetails',
    'tabPanel.regiebooks.RegieTabXML',
    'tabPanel.rolebooks.RoleKostuemPanelInTab',
    'tabPanel.rolebooks.RoleTabDetails',
    'tabPanel.rolebooks.RoleTabXML',
    'tabPanel.gagebooks.GageBookPanelInTab',
    'tabPanel.gagebooks.GageBookTabDetails',
    'tabPanel.gagebooks.GageBookTabXML',
    'tabPanel.abo.AboPanelInTab',
    'tabPanel.abo.AboTabDetails',
    'tabPanel.abo.AboTabXML',
    'tabPanel.taxation.TaxPanelInTab',
    'tabPanel.taxation.TaxTabDetails',
    'tabPanel.journal.JournalPanelInTab',
    'tabPanel.journal.JournalTabDetails',
    'tabPanel.journal.JournalTabXML',
    'tabPanel.repertoire.incipits.IncipitsTabPanel',
    'tabPanel.repertoire.incipits.IncipitDetailsSection',
    'tabPanel.repertoire.incipits.IncipitDetailsSectionXML',
    'tabPanel.repertoire.EventsTable',
    'tabPanel.persons.OccupationTable',
    'tabPanel.persons.ResidenceTable',
    'tabPanel.GagenTable',
    'tabPanel.SourcesTable',
    'tabPanel.WorksTable',
    'tabPanel.issue.FacsimileView',
    'tabPanel.issue.LeafletFacsimile',
    'tabPanel.issue.IssueTable',
    'tabPanel.dailyreport.FacsimileView',
    'tabPanel.dailyreport.LeafletFacsimile',
    'tabPanel.dailyreport.DailyreportTable',
    'tabPanel.dailyreport.DailyreportPanelInTab',
    'tabPanel.dailyreport.DailyreportMenuItemTree',
    'tabPanel.dailyreport.DailyreportPanelDetails',
    'tabPanel.dailyreport.DailyreportTextSection',
    'tabPanel.dailyreport.XMLSectionDailyreport',
    'tabPanel.link.LinkPanelInTab',
    'tabPanel.zettel.TheaterZettelPanelInTab',
    'tabPanel.zettel.TheaterZettelPanelInTabDresden',
    'tabPanel.zettel.ZettelTextSection',
    'tabPanel.persons.PersonDetailsPanel',
    'tabPanel.persons.PersonNavigationTree',
    'tabPanel.search.SearchPanelInTab',
    'tabPanel.search.WorkResultTable',
    'tabPanel.search.PersonResultTable',
    'tabPanel.search.RolesResultTable',
    'tabPanel.rolebooks.RoleTable',
    'tabPanel.roles.RoleDetailsPanel',
    'tabPanel.roles.RolesNavigationTree',
    'tabPanel.roles.RolePanelInTab',
    'tabPanel.roles.RoleTabDetails',
    'tabPanel.playSchedules.ScheduleTable',
    'tabPanel.NavigationHistory',
    'tabPanel.media.MediaPanelInTab'],
    
    models:[
    'Werk',
    'Plan',
    'Person',
    'Source',
    'FacsimileNavigation',
    'IssueName',
    'MonthNumber',
    'SourceDetails',
    'Event',
    'RefData',
    'PersonData',
    'SearchWork',
    'Theaterakte'],
    
    stores:[
    'issue.IssueNames',
    'revenue.RevenueMonths',
    'schedule.ScheduleMonths',
    'facsimile.FacsimileNames',
    'work.ExtWork',
    'work.Works'],
    
    projectYears: null,
    //extWorkKeys: null,
    
    launch: function () {
        //console.log(window.location.href);
        
        renderer = new verovio.toolkit();
        
        var workPath;
        
        /*window.onbeforeunload = function () {
        return "Your work will be lost.";
        };*/
        
        Ext.Ajax.request({
            url: 'resources/xql/getDBStructure.xql',
            method: 'GET',
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                var dbPaths = json.dbPaths;
                dbPathsMap = new Map();
                for (var i = 0; i < dbPaths.length; i++) {
                    dbPathsMap. set (dbPaths[i].dbName, dbPaths[i].dbValue);
                }
                
                Ext.getCmp('NavigationTreeGlobal').getNavigationItems();
                Ext.Ajax.request({
                    url: 'resources/xql/getTheaterData.xql',
                    method: 'GET',
                    params: {
                        uri: workPath
                    },
                    success: function (response, options) {
                        var json = jQuery.parseJSON(response.responseText);
                        extWorkKeys = json.dbkeys;
                        projectName = json.name;
                        this.projectYears = json.years;
                        //  Ext.getCmp('htNavigationPanel').setTitle('<span style="font-family:Tahoma; color:gray;">' + projectName + ' ' + this.projectYears + '</span>');
                        dbTheaterPath = json.dbpath;
                        
                        if (window.location.href.indexOf('#') !== -1) {
                            var linkArray = window.location.href.split(':');
                            var tailPathSrray = linkArray[linkArray.length -1].split('_');
                            var idName = tailPathSrray[1];
                            var folderName = tailPathSrray[0];
                            
                            if (folderName === 'werk') {
                                Ext.Ajax.request({
                                    url: 'resources/xql/getWorkName.xql',
                                    async: false,
                                    method: 'GET',
                                    params: {
                                        dbkey: idName
                                    },
                                    success: function (result) {
                                        var json = jQuery.parseJSON(result.responseText);
                                        var persName = json.werk[0];
                                        
                                        var workIcon = '';
                                        if (extWorkKeys.indexOf(idName) > -1) {
                                            workIcon = 'resources/images/BookBlau-16.png';
                                        } else {
                                            workIcon = 'resources/images/Books1-17.png';
                                        }
                                        
                                        // #tabpanel:werk_H020166
                                        var historyButton = Ext.getCmp('historyButton');
                                        var menuItem = historyButton.menu.add({
                                            text: '<font style="color:gray;">' + persName + '</font>', icon: workIcon, dbkey: idName
                                        });
                                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                        var existItems = navTreeGlobal.items;
                                        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, persName, menuItem.id);
                                        if (! isFoundItem) {
                                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                                title: '<font style="color:gray;">' + persName + '</font>',
                                                icon: workIcon,
                                                id: 'werk_' + idName
                                            });
                                            
                                            var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                                                selection: idName, workName: persName, workIcon: workIcon
                                            });
                                            repertoireTab.add(repertoireDetails);
                                            
                                            repertoireTab.setActiveMenuItemId(menuItem.id);
                                            repertoireTab.setMenuAdded(true);
                                            navTreeGlobal.add(repertoireTab);
                                            navTreeGlobal.setActiveTab(repertoireTab);
                                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                                            historyButton.setDisabled(false);
                                            var toolBar = Ext.getCmp('toolbar');
                                            toolBar.handleHistoryButtons();
                                        }
                                    }
                                });
                            } else if (folderName === 'person') {
                                
                                Ext.Ajax.request({
                                    url: 'resources/xql/getPersonName.xql',
                                    async: false,
                                    method: 'GET',
                                    params: {
                                        dbkey: idName
                                    },
                                    success: function (result) {
                                        
                                        var json = jQuery.parseJSON(result.responseText);
                                        var persName = json.person[0];
                                        // #tabpanel:person_H000001
                                        var historyButton = Ext.getCmp('historyButton');
                                        var menuItem = historyButton.menu.add({
                                            text: '<font style="color:gray;">' + persName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: idName
                                        });
                                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                        var existItems = navTreeGlobal.items;
                                        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, persName, menuItem.id);
                                        if (! isFoundItem) {
                                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                                title: '<font style="color:gray;">' + persName + '</font>',
                                                icon: 'resources/images/Mask-19.png',
                                                id: 'person_' + idName
                                            });
                                            var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                                                dbkey: idName, title: '<font size="2" face="Tahoma" style="color:#909090;">Person: ' + persName + '</font>',
                                                icon: 'resources/images/Mask-19.png'
                                            });
                                            repertoireTab.add(personDetails);
                                            
                                            repertoireTab.setActiveMenuItemId(menuItem.id);
                                            repertoireTab.setMenuAdded(true);
                                            navTreeGlobal.add(repertoireTab);
                                            navTreeGlobal.setActiveTab(repertoireTab);
                                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                                            historyButton.setDisabled(false);
                                            var toolBar = Ext.getCmp('toolbar');
                                            toolBar.handleHistoryButtons();
                                        }
                                    }
                                });
                            } else if (folderName === 'rolle') {
                                
                                Ext.Ajax.request({
                                    url: 'resources/xql/getRolleName.xql',
                                    async: false,
                                    method: 'GET',
                                    params: {
                                        dbkey: idName
                                    },
                                    success: function (result) {
                                        
                                        var json = jQuery.parseJSON(result.responseText);
                                        var persName = json.rolle[0];
                                        // #tabpanel:rolle_H040280
                                        var historyButton = Ext.getCmp('historyButton');
                                        var menuItem = historyButton.menu.add({
                                            text: '<font style="color:gray;">' + persName + '</font>', icon: 'resources/images/theatreB.png', dbkey: idName
                                        });
                                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                        var existItems = navTreeGlobal.items;
                                        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, persName, menuItem.id);
                                        if (! isFoundItem) {
                                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                                title: '<font style="color:gray;">' + persName + '</font>',
                                                icon: 'resources/images/theatreB.png',
                                                id: 'rolle_' + idName
                                            });
                                            
                                            var personDetails = new TheaterTool.view.tabPanel.roles.RolePanelInTab({
                                                dbkey: idName, icon: 'resources/images/theatreB.png', title: '<font size="2" face="Tahoma" style="color:#909090;">Rolle: ' + persName + '</font>'
                                            });
                                            
                                            repertoireTab.add(personDetails);
                                            
                                            repertoireTab.setActiveMenuItemId(menuItem.id);
                                            repertoireTab.setMenuAdded(true);
                                            navTreeGlobal.add(repertoireTab);
                                            navTreeGlobal.setActiveTab(repertoireTab);
                                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                                            historyButton.setDisabled(false);
                                            var toolBar = Ext.getCmp('toolbar');
                                            toolBar.handleHistoryButtons();
                                        }
                                    }
                                });
                            } else if (folderName === 'quelle') {
                                Ext.Ajax.request({
                                    url: 'resources/xql/getQuelleName.xql',
                                    async: false,
                                    method: 'GET',
                                    params: {
                                        dbkey: idName
                                    },
                                    success: function (result) {
                                        var json = jQuery.parseJSON(result.responseText);
                                        var persNameArray = json.quelle;
                                        var persName = persNameArray[0];
                                        var workId = persNameArray[1];
                                        var selfLoc = persNameArray[3];
                                        var quellName = persNameArray[2];
                                        // #tabpanel:quelle_H220080
                                        
                                        var workIcon = '';
                                        var sourceIcon = '';
                                        if (extWorkKeys.indexOf(workId) > -1) {
                                            workIcon = 'resources/images/SourceBlue.png';
                                            sourceIcon = 'resources/images/BookBlau-16.png';
                                        } else {
                                            workIcon = 'resources/images/SourceRed.png';
                                            sourceIcon = 'resources/images/Books1-17.png'
                                        }
                                        
                                        
                                        var historyButton = Ext.getCmp('historyButton');
                                        var menuItem = historyButton.menu.add({
                                            text: '<font style="color:gray;">' + persName + '</font>', icon: sourceIcon, dbkey: idName
                                        });
                                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                        var existItems = navTreeGlobal.items;
                                        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, persName, menuItem.id);
                                        if (! isFoundItem) {
                                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                                title: '<font style="color:gray;">' + persName + '</font>',
                                                icon: sourceIcon,
                                                id: 'quelle_' + idName
                                            });
                                            
                                            
                                            var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                                                selection: workId, isSelected: true, workName: persName, workIcon: workIcon, sourceId: idName, sourceTitle: quellName, selLocation: selfLoc
                                            });
                                            repertoireTab.add(personDetails);
                                            
                                            repertoireTab.setActiveMenuItemId(menuItem.id);
                                            repertoireTab.setMenuAdded(true);
                                            navTreeGlobal.add(repertoireTab);
                                            navTreeGlobal.setActiveTab(repertoireTab);
                                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                                            historyButton.setDisabled(false);
                                            var toolBar = Ext.getCmp('toolbar');
                                            toolBar.handleHistoryButtons();
                                        }
                                    }
                                });
                            }
                            
                            if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
                                Ext.getCmp('infoDialog').close();
                            }
                        }
                    }
                });
            }
        });
        
        // temporary global
        storeField = new Array("Aschenbrödel", "Der Bettelstudent", 'Des Teufels Anteil', 'Die Unbekannte');
    },
    
    getDBPaths: function () {
        return this.dbPaths;
    }
});