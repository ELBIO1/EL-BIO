// ✅ تسجيل حساب جديد
function registerUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("⚠️ الرجاء ملء جميع الحقول!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق من أن البريد غير مستخدم
    let userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("⚠️ البريد الإلكتروني مسجل بالفعل!");
        return;
    }

    // إضافة المستخدم الجديد
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
    window.location.href = "login.html";
}

// ✅ تسجيل الدخول
function loginUser() {
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (validUser) {
        alert(`🎉 مرحبًا ${validUser.username}! تسجيل الدخول ناجح.`);
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        window.location.href = "home.html"; // تحويل المستخدم للصفحة الرئيسية
    } else {
        alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!");
    }
}

// ✅ التأكد من تسجيل الدخول قبل الدخول للصفحة الرئيسية
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("home.html")) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            alert("⚠️ يجب تسجيل الدخول أولًا!");
            window.location.href = "login.html";
        }
    }
});
