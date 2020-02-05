
var myExcelUtil = {

    /**
     * button
     * 导出测试数据
     */
    exportTestData: function () {
        //获取测试数据
        var arrays = this.buildTestData();
        //构建workbook对象
        var workbook = this.arrays2workbook(arrays);
        //下载
        this.downloadWorkbook(workbook);
    },

    /**
     * button
     * 导出 指定 table 里的数据
     * @param tableDomId table节点id属性
     */
    exportTableData: function (tableDomId) {
        //构建workbook对象
        var workbook = this.tableDom2workbook($('#' + tableDomId)[0]);
        //下载
        this.downloadWorkbook(workbook);
    },

    /**
     * 将一个table dom直接转成workbook
     * @param tableDom
     * @returns {{SheetNames: *[], Sheets: {}}}
     */
    tableDom2workbook: function (tableDom, sheetName) {
        var sheet = this.tableDom2sheet(tableDom);
        return this.buildworkbook([sheet], sheetName != null ? [sheetName] : null);
    },

    /**
     * 打开下载弹框，下载 workbook 文件
     * @param workbook 必须
     * @param saveName 非必须，默认文件名
     */
    downloadWorkbook: function (workbook, saveName) {
        openDownloadDialog(this.workbook2blob(workbook), saveName || '导出.xlsx');
    },

    /**
     * 二维数组转成 workbook
     * @param arrays 必须，一个sheet的数据，二维数组
     * @param sheetName 非必须，默认文件名
     * @returns {{SheetNames: [], Sheets: {}}}
     */
    arrays2workbook: function (arrays, sheetName) {
        return this.buildworkbook([this.arrays2sheet(arrays)], sheetName != null ? [sheetName] : null);
    },

    /**
     * 构建 workbook 对象
     * @param sheets 非必须，sheet数组
     * @param sheetNames 非必须，sheet名称数组
     * @returns {{SheetNames: [], Sheets: {}}}
     */
    buildworkbook: function (sheets, sheetNames) {
        var workbook = {
            SheetNames: [],
            Sheets: {}
        };
        return this.workbookAddSheets(workbook, sheets, sheetNames);
    },

    /**
     * 往workbook对象里添加多个sheet
     * @param workbook
     * @param sheets sheet数组
     * @param sheetNames 非必须，sheet名称数组
     * @returns {*}
     */
    workbookAddSheets: function (workbook, sheets, sheetNames) {
        if(sheets != null){
            let sheetName;
            for (let i = 0; i < sheets.length; i++) {
                sheetName = (sheetNames != null ? sheetNames[i] : "sheet" + (i + 1));
                workbook.SheetNames.push(sheetName);
                workbook.Sheets[sheetName] = sheets[i];
            }
        }
        return workbook;
    },

    /**
     * workbook 对象转 blob（二进制数据）对象
     * @param workbook
     * @returns {Blob}
     */
    workbook2blob: function (workbook) {
        // 生成excel的配置项
        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
        // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        return blob;
    },

    /**
     * 将一个二维数组转成sheet，会自动处理number、string、boolean、date等类型数据
     * @param arrays
     * @returns {*}
     */
    arrays2sheet: function (arrays) {
        return XLSX.utils.aoa_to_sheet(arrays);
    },

    /**
     * 将一个table dom直接转成sheet，会自动识别colspan和rowspan并将其转成对应的单元格合并
     * @param tableDom
     * @returns {[]|{}}
     */
    tableDom2sheet: function (tableDom) {
        return XLSX.utils.table_to_sheet(tableDom);
    },

    buildTestData: function () {
        //arrays
        return [
            ["测试文字","测试文字","测试文字","测试文字"],
            ["测试文字","测试文字","测试文字","测试文字"],
            ["测试文字","测试文字","测试文字","测试文字"]
        ];
    }



}


function exportExcel() {


    var data = buildTestData();
    //将一个二维数组转成sheet，会自动处理number、string、boolean、date等类型数据
    var sheet = XLSX.utils.aoa_to_sheet(data);
    //将一个table dom直接转成sheet，会自动识别colspan和rowspan并将其转成对应的单元格合并
    // var sheet2 = XLSX.utils.table_to_sheet($('#testData01')[0])
    //将一个 sheet 转成 数组对象
    // var sss = XLSX.utils.sheet_to_row_object_array(sheet)
    // var csv = table2csv($('#testData01')[0]);
    // var sheet = csv2sheet(csv);
    var blob = sheet2blob(sheet);
    openDownloadDialog(blob, '导出.xlsx');
}

function buildTestData() {
    var csv = [];
    $('#testData01').find('tr').each(function() {
        var temp = [];
        $(this).find('th,td').each(function() {
            temp.push($(this).html());
        })
        csv.push(temp);
        // temp.shift(); // 移除第一个
        // csv.push(temp.join(','));
    });
    return csv;
    // csv.shift();
    // return csv.join('\n');
}

function table2csv(table) {
    var csv = [];
    $(table).find('tr').each(function() {
        var temp = [];
        $(this).find('td').each(function() {
            temp.push($(this).html());
        })
        temp.shift(); // 移除第一个
        csv.push(temp.join(','));
    });
    csv.shift();
    return csv.join('\n');
}

// csv转sheet对象
function csv2sheet(csv) {
    var sheet = {}; // 将要生成的sheet
    csv = csv.split('\n');
    csv.forEach(function(row, i) {
        row = row.split(',');
        if(i == 0) sheet['!ref'] = 'A1:'+String.fromCharCode(65+row.length-1)+(csv.length-1);
        row.forEach(function(col, j) {
            sheet[String.fromCharCode(65+j)+(i+1)] = {v: col};
        });
    });
    return sheet;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}


/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog (url, saveName) {
    if(typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if(window.MouseEvent) {
        event = new MouseEvent('click');
    } else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}