var testUtil = {

    encrypt: function(type){
        document.getElementById('div2').innerHTML = '';
        var str = document.getElementById('div1').innerHTML.trim();
        var key = document.getElementById('div0').innerHTML.trim();
        document.getElementById('div2').innerHTML = CryptoJS[type].encrypt(str, key);
        // //加密方法
        // var rs = CryptoJS.AES.encrypt(str, key);
        // var rs = CryptoJS.DES.encrypt(str, key);
        // var rs = CryptoJS.RC4.encrypt(str, key);
        // var rs = CryptoJS.Rabbit.encrypt(str, key);
        // var rs = CryptoJS.TripleDES.encrypt(str, key);
    },

    decrypt: function(type){
        document.getElementById('div3').innerHTML = '';
        var str = document.getElementById('div2').innerHTML.trim();
        var key = document.getElementById('div0').innerHTML.trim();
        document.getElementById('div3').innerHTML = CryptoJS[type].decrypt(str, key).toString(CryptoJS.enc.Utf8);
        // //解密
        // var rs = CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
        // var rs = CryptoJS.DES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
        // var rs = CryptoJS.RC4.decrypt(str, key).toString(CryptoJS.enc.Utf8);
        // var rs = CryptoJS.Rabbit.decrypt(str, key).toString(CryptoJS.enc.Utf8);
        // var rs = CryptoJS.TripleDES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
    },

    // // 加密的另一种方法
    // encrypt: function (data,key,iv) { //key,iv：16位的字符串
    //     var key1  = CryptoJS.enc.Latin1.parse(key);
    //     var iv1   = CryptoJS.enc.Latin1.parse(iv);
    //     return CryptoJS.AES.encrypt(data, key1,{
    //         iv : iv1,
    //         mode : CryptoJS.mode.CBC,
    //         padding : CryptoJS.pad.ZeroPadding
    //     }).toString();
    // },
    //
    // // 解密的另一种方法
    // decrypt: function (data,key,iv){ //key,iv：16位的字符串
    //     var key1  = CryptoJS.enc.Latin1.parse(key);
    //     var iv1   = CryptoJS.enc.Latin1.parse(iv);
    //     var decrypted=CryptoJS.AES.decrypt(data,key1,{
    //         iv : iv1,
    //         mode : CryptoJS.mode.CBC,
    //         padding : CryptoJS.pad.ZeroPadding
    //     });
    //     return decrypted.toString(CryptoJS.enc.Utf8);
    // }



}