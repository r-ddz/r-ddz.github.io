var testUtil = {
    //密文
    str: "asdasdasdasdasd",
    //json字符串
    jsonStr: null,
    //json转的对象
    jsonData: null,


    test1: function () {
        document.getElementById('div1').innerHTML = this.str;

        this.jsonData = [
            ["名称", "年龄", "备注"],
            ["张三", "17", "xxxxxxxx"],
            ["李四", "18", ""],
            ["王五", "19", "yyyyyy"]
        ];
        this.jsonStr = JSON.stringify(this.jsonData);

        // var a = {
        //     name: '张三',
        //     age: 18
        // };
        // var b = JSON.stringify(a);
        // var c = JSON.parse(b);
    },

    test2: function () {
        document.getElementById('div2').innerHTML = this.jsonStr;
    },

    test3: function () {
        var isHeader = true;
        var domStr = "<table style='border-collapse: collapse;'><tbody>";
        for (var row of this.jsonData){
            domStr += "<tr>";
            for (var cell of row){
                if(isHeader){
                    domStr += ("<th>" + cell + "</th>");
                }else{
                    domStr += ("<td>" + cell + "</td>");
                }
            }
            domStr += "</tr>";
            isHeader = false;
        }
        domStr += "</tbody></table>"
        document.getElementById('div3').innerHTML = domStr;
    },

    test4: function () {
        var tableDom = document.getElementById('div3').getElementsByTagName('table')[0];
        var trsDom = tableDom.getElementsByTagName('tr');
        var newTableData = [];
        for (var trDom of trsDom){
            // var tdsDom = trDom.getElementsByTagName('th');
            // tdsDom = tdsDom.concat(trDom.getElementsByTagName('td'));
            var tdsDom = trDom.children;
            var newRowData = [];
            for (var tdDom of tdsDom){
                newRowData.push(tdDom.innerHTML);
            }
            newTableData.push(newRowData);
        }
        this.jsonData = newTableData;
        this.jsonStr = JSON.stringify(this.jsonData);
        document.getElementById('div4').innerHTML = this.jsonStr;
    }




}