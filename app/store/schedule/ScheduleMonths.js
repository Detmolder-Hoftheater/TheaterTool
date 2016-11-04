Ext.define('TheaterTool.store.schedule.ScheduleMonths', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.MonthNumber',
    extraParams: {
        selectedYear: ''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getMonthsForSelectedYear.xql'
    },
    sorters:[ {
        sorterFn: function (o1, o2) {
            var getRank = function (o) {
                var name = o.get('name');
                if (name === 'Januar') {
                    return 1;
                } else if (name === 'Februar') {
                    return 2;
                } else if (name === 'März') {
                    return 3;
                } else if (name === 'April') {
                    return 4;
                } else if (name === 'Mai') {
                    return 5;
                } else if (name === 'Juni') {
                    return 6;
                } else if (name === 'Juli') {
                    return 7;
                } else if (name === 'August') {
                    return 8;
                } else if (name === 'September') {
                    return 9;
                } else if (name === 'Oktober') {
                    return 10;
                } else if (name === 'November') {
                    return 11;
                } else {
                    return 12;
                }
            },
            rank1 = getRank(o1),
            rank2 = getRank(o2);
            
            if (rank1 === rank2) {
                return 0;
            }
            
            return rank1 < rank2 ? -1: 1;
        }
    }],
    autoLoad: false
});