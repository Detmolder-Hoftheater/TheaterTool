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
    'tabPanel.HTTabPanel',
    'tabPanel.HTTab',
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
    'tabPanel.playSchedules.SchedulePanelInTab',
    'tabPanel.playSchedules.ScheduleMenuItemTree',
    'tabPanel.playSchedules.SchedulePanelDetails',
    'tabPanel.playSchedules.ScheduleTextSection',
    'tabPanel.playSchedules.XMLSectionSchedule',
    'tabPanel.playSchedules.LeafletFacsimile',
    'tabPanel.playSchedules.FacsimileView',
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
    'tabPanel.link.LinkPanelInTab',
    'tabPanel.zettel.TheaterZettelPanelInTab',
    'tabPanel.persons.PersonDetailsPanel',
    'tabPanel.persons.PersonNavigationTree',
    'tabPanel.search.SearchPanelInTab',
    'tabPanel.search.WorkResultTable',
    'tabPanel.search.PersonResultTable',
    'tabPanel.rolebooks.RoleTable',
    'tabPanel.playSchedules.ScheduleTable',
    'tabPanel.customitems.CustomItemPanelInTab',
    'tabPanel.customitems.CustomItemTextSection',
    'tabPanel.NavigationHistory'],
    
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
    'Theaterakte',
    'CustomItem'],
    
    stores:[
    'issue.IssueNames',
    'revenue.RevenueMonths',
    'schedule.ScheduleMonths',
    'facsimile.FacsimileNames',
    'work.ExtWork',
    'work.Works'],
    
    //projectYears: null,
    //extWorkKeys: null,
    
    launch: function () {
        
        renderer = new verovio.toolkit();
        
        Ext.Ajax.request({
            url: 'resources/xql/getDBStructure.xql',
            method: 'GET',
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                var languageType = json.language;
                languagePath = 'app/view/' + languageType + '.json';
                Ext.Ajax.request({
                    url: languagePath,
                    method: 'GET',
                    success: function (response1) {
                        GUI_NAMES = jQuery.parseJSON(response1.responseText);
                        
                        CUS_ITEMS = new Array();
                        var customItems = json.customItems;
                        for (var i = 0; i < customItems.length; i++) {
                            var oneItem = customItems[i];
                            var navItem = Ext.create('TheaterTool.model.CustomItem', {
                                dbValue: oneItem.dbValue,
                                dbPath: oneItem.dbPath
                            });
                            
                            CUS_ITEMS.push(navItem);
                        }
                        
                       // EXT_WORKS = json.extendedWorks;
                        
                        var dbPaths = json.dbPaths;
                        dbPathsMap = new Map();
                        for (var i = 0; i < dbPaths.length; i++) {
                            dbPathsMap.set(dbPaths[i].dbName, dbPaths[i].dbValue);
                        }
                        projectName = json.name;
                        projectStartYear = json.startyear;
                        projectEndYear = json.endyear;
                        projectNavType = json.navigation_type;
                        Ext.getCmp('htNavigationPanel').setTitle('<b style="color:#A87678;">' + projectName + ' ' + projectStartYear + '-' + projectEndYear + '</b>');
                        Ext.getCmp('NavigationTreeGlobal').createNavigationItems();
                        Ext.getCmp('toolbar').createToolbarItems();
                    }
                });
                
                
            }
        });
        
        
        
        
        
        /*Ext.Ajax.request({
            url: 'resources/xql/getTheaterData.xql',
            method: 'GET',
            /\*params: {
            uri: workPath
            },*\/
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                extWorkKeys = json.dbkeys;
            }
        });
        
        // temporary global
        storeField = new Array("Aschenbrödel", "Der Bettelstudent", 'Des Teufels Anteil');*/
    },
    
    getDBPaths: function () {
        return this.dbPaths;
    }
});