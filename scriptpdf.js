// تحميل قائمة الملفات من LocalStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadPdfFiles();
});

// رفع ملف PDF
function uploadFile() {
    let fileInput = document.getElementById("uploadPdf");
    let file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
        let reader = new FileReader();

        reader.onload = function (event) {
            let pdfData = event.target.result;

            // حفظ الملف في LocalStorage
            let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
            pdfFiles.push({ name: file.name, data: pdfData });
            localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));

            alert("تم رفع الملف بنجاح!");
            loadPdfFiles(); // إعادة تحميل القائمة
        };

        reader.readAsDataURL(file);
    } else {
        alert("يرجى اختيار ملف PDF صالح!");
    }
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
        deleteBtn.textContent = "❌";
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

    loadPdfFiles(); // تحديث القائمة
}
