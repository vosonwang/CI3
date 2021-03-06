/**
 * Created by voson on 2016/9/21.
 */
function getAesString(data,key,iv){//加密
    key  = CryptoJS.enc.Hex.parse(key);
    iv   = CryptoJS.enc.Latin1.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data,key,
        {
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7
        });
    return encrypted;

}
function getDAesString(encrypted,key,iv){//解密
     key  = CryptoJS.enc.Hex.parse(key);
     iv   = CryptoJS.enc.Latin1.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(encrypted,key,
        {
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function getAES(data){ //加密
    var key  = '7506687117238842';  //密钥  生成环境，要修改成从服务器取session
    var iv   = 'Pkcs7';
    var encrypted = getAesString(data,key,iv);
    return encrypted; //密文

}

function getDAes(encrypted){//解密
    var key  = '7506687117238842';
    var iv   = 'Pkcs7';
    var decryptedStr =getDAesString(encrypted,key,iv);
    return decryptedStr;
}