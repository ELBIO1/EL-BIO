// تسجيل الدخول والتحقق من البيانات
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            let storedUsername = localStorage.getItem("username");
            let storedPassword = localStorage.getItem("password");

            if (username === storedUsername && password === storedPassword) {
                alert("تم تسجيل الدخول بنجاح!");
                window.location.href = "dashboard.html"; // تحويل المستخدم إلى الصفحة الرئيسية
            } else {
                alert("خطأ في اسم المستخدم أو كلمة المرور!");
            }
        });
    }
});
