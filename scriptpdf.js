// تحميل قائمة الملفات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadPdfFiles();
});

// رفع ملفات PDF متعددة
function uploadFile() {
    let fileInput = document.getElementById("uploadPdf");
    let files = fileInput.files;

    if (files.length === 0) {
        alert("يرجى اختيار ملفات PDF للرفع!");
        return;
    }

    let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    let promises = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (file.type === "application/pdf") {
            let reader = new FileReader();
            let promise = new Promise((resolve) => {
                reader.onload = function (event) {
                    pdfFiles.push({ name: file.name, data: event.target.result });
                    resolve();
                };
            });

            reader.readAsDataURL(file);
            promises.push(promise);
        } else {
            alert("❌ يرجى اختيار ملفات PDF فقط!");
        }
    }

    // حفظ الملفات بعد تحميل جميعها
    Promise.all(promises).then(() => {
        localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
        alert("✅ تم رفع الملفات بنجاح!");
        loadPdfFiles();
    });
}

// تحميل الملفات وعرضها في القائمة
function loadPdfFiles() {
    let pdfList = document.getElementById("pdfList");
    pdfList.innerHTML = "";

    let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];

    pdfFiles.forEach((file, index) => {
        let listItem = document.createElement("li");

        let link = document.createElement("a");
        link.href = file.data;
        link.target = "_blank";
        link.textContent = file.name;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑 حذف";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = function () {
            deletePdf(index);
        };

        listItem.appendChild(link);
        listItem.appendChild(deleteBtn);
        pdfList.appendChild(listItem);
    });
}

// حذف ملف PDF
function deletePdf(index) {
    let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    pdfFiles.splice(index, 1);
    localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
    loadPdfFiles();
}
