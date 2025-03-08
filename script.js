// إنشاء حساب جديد وتخزين البيانات
document.addEventListener("DOMContentLoaded", function () {
    let signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let newUsername = document.getElementById("newUsername").value;
            let email = document.getElementById("email").value;
            let newPassword = document.getElementById("newPassword").value;

            localStorage.setItem("username", newUsername);
            localStorage.setItem("email", email);
            localStorage.setItem("password", newPassword);

            alert("تم إنشاء الحساب بنجاح!");
            window.location.href = "login.html";
        });
    }

    // تسجيل الدخول والتحقق من البيانات
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
                window.location.href = "dashboard.html"; // تحويل المستخدم إلى لوحة التحكم
            } else {
                alert("خطأ في اسم المستخدم أو كلمة المرور!");
            }
        });
    }
});
