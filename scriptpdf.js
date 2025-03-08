document.addEventListener("DOMContentLoaded", function () {
    loadPdfFiles();
});

// تحميل الملفات من LocalStorage
function loadPdfFiles() {
    let pdfList = document.getElementById("pdfList");
    pdfList.innerHTML = "";

    let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];

    pdfFiles.forEach((file, index) => {
        let listItem = document.createElement("li");

        let link = document.createElement("a");
        link.href = file.data;
        link.textContent = file.name;
        link.target = "_blank";

        let viewBtn = document.createElement("button");
        viewBtn.textContent = "👁️ مشاهدة";
        viewBtn.onclick = function () {
            viewPdf(file.data);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ حذف";
        deleteBtn.onclick = function () {
            deletePdf(index);
        };

        listItem.appendChild(link);
        listItem.appendChild(viewBtn);
        listItem.appendChild(deleteBtn);
        pdfList.appendChild(listItem);
    });
}

// عرض ملف PDF داخل الصفحة
function viewPdf(pdfUrl) {
    let pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.style.display = "block";
    pdfViewer.src = pdfUrl;
}

// رفع ملف PDF
function uploadFile() {
    let fileInput = document.getElementById("uploadPdf");
    let file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
        let reader = new FileReader();

        reader.onload = function (event) {
            let pdfData = event.target.result;

            let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
            pdfFiles.push({ name: file.name, data: pdfData });
            localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));

            alert("✅ تم رفع الملف بنجاح!");
            fileInput.value = ""; 
            loadPdfFiles();
        };

        reader.readAsDataURL(file);
    } else {
        alert("⚠️ يرجى اختيار ملف PDF صالح!");
    }
}

// حذف ملف PDF
function deletePdf(index) {
    let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    pdfFiles.splice(index, 1);
    localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));

    loadPdfFiles();
}
