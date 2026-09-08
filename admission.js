// ========================================
// TRINITY ART SCHOOL
// ADMISSION FORM FUNCTIONS
// ========================================


// PRINT / SAVE AS PDF

function printAdmissionForm() {
    window.print();
}


// DOWNLOAD ADMISSION FORM

function downloadAdmissionForm() {

    const image = document.getElementById("admissionFormImage");

    if (!image) {
        alert("Admission form image not found.");
        return;
    }

    const link = document.createElement("a");

    link.href = image.src;

    link.download = "Trinity-Art-School-Admission-Form.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
