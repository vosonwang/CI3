/**
 * Created by voson on 2016/9/22.
 */
function logout() {
    $.ajax({
        type: 'POST',
        url: 'C_login/logout',
        success: function (msg) {
                eval(msg);
        }
    })
}