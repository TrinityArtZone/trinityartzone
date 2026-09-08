
/* =========================================================
   TRINITY ART ZONE
   SINGLE MAIN JAVASCRIPT FILE
   Homepage + Student Registration + API Connection
   ========================================================= */

/*
   =========================================================
   GOOGLE APPS SCRIPT WEB APP URL
   =========================================================

   PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT /exec URL HERE.

   Example:
   const API_URL =
     "https://script.google.com/macros/s/XXXXXXXX/exec";

   DO NOT use your Google Sheet URL here.
*/

const API_URL = "https://script.google.com/macros/s/AKfycbze1mA5pcBkwd9Cz4jHFU3p1QjSiRfPGbHe6owxLQTlkbaig7Q5bDGgfLEuM8I6qPk6/exec";

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     1. FOOTER YEAR
     ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     2. MOBILE MENU
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });


    const navigationItems =
      navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {

      link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        menuToggle.textContent = "☰";
      });

    });

  }


  /* =======================================================
     3. SMOOTH SCROLL
     ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement =
        document.querySelector(targetId);

      if (targetElement) {

        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =======================================================
     4. HEADER SHADOW
     ======================================================= */

  const header =
    document.querySelector(".site-header");

  if (header) {

    function updateHeader() {

      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    }

    window.addEventListener(
      "scroll",
      updateHeader
    );

    updateHeader();

  }


  /* =======================================================
     5. IMAGE ERROR HANDLING
     ======================================================= */

  const images =
    document.querySelectorAll("img");

  images.forEach(function (image) {

    image.addEventListener("error", function () {

      console.warn(
        "Image could not be loaded:",
        image.getAttribute("src")
      );

      image.classList.add("image-error");

    });

    image.setAttribute(
      "draggable",
      "false"
    );

  });


  /* =======================================================
     6. GALLERY IMAGE VIEWER
     ======================================================= */

  const galleryImages =
    document.querySelectorAll(
      ".gallery-grid img"
    );

  galleryImages.forEach(function (image) {

    image.style.cursor = "zoom-in";

    image.addEventListener(
      "click",
      function () {

        createImageViewer(
          this.src,
          this.alt
        );

      }
    );

  });


  function createImageViewer(
    imageSrc,
    imageAlt
  ) {

    const existingViewer =
      document.querySelector(
        ".image-viewer"
      );

    if (existingViewer) {
      existingViewer.remove();
    }


    const viewer =
      document.createElement("div");

    viewer.className =
      "image-viewer";

    viewer.innerHTML = `
      <button
        class="image-viewer-close"
        type="button"
        aria-label="Close image"
      >
        ✕
      </button>

      <img
        src="${imageSrc}"
        alt="${imageAlt || "Artwork"}"
      >
    `;


    document.body.appendChild(viewer);


    const closeButton =
      viewer.querySelector(
        ".image-viewer-close"
      );

    closeButton.addEventListener(
      "click",
      function () {
        viewer.remove();
      }
    );


    viewer.addEventListener(
      "click",
      function (event) {

        if (event.target === viewer) {
          viewer.remove();
        }

      }
    );


    function escapeHandler(event) {

      if (event.key === "Escape") {

        viewer.remove();

        document.removeEventListener(
          "keydown",
          escapeHandler
        );

      }

    }

    document.addEventListener(
      "keydown",
      escapeHandler
    );

  }


  /* =======================================================
     7. SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".section-heading, .about-grid, .art-card, .school-box, .contact-grid"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(function (element) {

      element.classList.add("reveal");

      observer.observe(element);

    });

  }


  /* =======================================================
     8. ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navAnchors =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              const currentId =
                entry.target.getAttribute(
                  "id"
                );


              navAnchors.forEach(
                function (link) {

                  link.classList.remove(
                    "active"
                  );

                  if (
                    link.getAttribute(
                      "href"
                    ) === "#" + currentId
                  ) {

                    link.classList.add(
                      "active"
                    );

                  }

                }
              );

            }

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(function (section) {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =======================================================
     9. STUDENT REGISTRATION
     Runs only on student.html
     ======================================================= */

  const studentForm =
    document.getElementById(
      "studentForm"
    );

  if (studentForm) {

    initializeStudentRegistration(
      studentForm
    );

  }


  console.log(
    "Trinity Art Zone JavaScript loaded."
  );

});


/* =========================================================
   STUDENT REGISTRATION FUNCTION
   ========================================================= */

function initializeStudentRegistration(
  form
) {

  const resultBox =
    document.getElementById(
      "studentResult"
    );

  const submitButton =
    document.getElementById(
      "submitStudentBtn"
    );


  /* -------------------------------------------------------
     Result message
     ------------------------------------------------------- */

  function showResult(
    message,
    type
  ) {

    if (!resultBox) {
      return;
    }

    resultBox.classList.remove(
      "hidden",
      "success",
      "error"
    );

    resultBox.classList.add(
      type
    );

    resultBox.innerHTML =
      message;

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


  /* -------------------------------------------------------
     Escape HTML
     ------------------------------------------------------- */

  function escapeHtml(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  /* -------------------------------------------------------
     Submit form
     ------------------------------------------------------- */

  form.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      /* Check API URL */

      if (
        !API_URL ||
        API_URL.includes(
          "PASTE_YOUR"
        )
      ) {

        showResult(
          `
          <strong>Backend not connected.</strong>
          <br><br>
          Please add your Google Apps Script
          Web App URL to <strong>script.js</strong>.
          `,
          "error"
        );

        return;

      }


      /* Read form data */

      const formData =
        new FormData(form);


      const student = {

        name:
          String(
            formData.get(
              "name"
            ) || ""
          ).trim(),

        dob:
          String(
            formData.get(
              "dob"
            ) || ""
          ).trim(),

        fatherName:
          String(
            formData.get(
              "fatherName"
            ) || ""
          ).trim(),

        motherName:
          String(
            formData.get(
              "motherName"
            ) || ""
          ).trim(),

        admissionYear:
          String(
            formData.get(
              "admissionYear"
            ) || ""
          ).trim(),

        photo:
          String(
            formData.get(
              "photo"
            ) || ""
          ).trim()

      };


      /* ---------------------------------------------------
         Validation
         --------------------------------------------------- */

      if (!student.name) {

        showResult(
          "Please enter the student's name.",
          "error"
        );

        return;

      }


      if (!student.dob) {

        showResult(
          "Please select the date of birth.",
          "error"
        );

        return;

      }


      if (!student.fatherName) {

        showResult(
          "Please enter the father's name.",
          "error"
        );

        return;

      }


      if (!student.motherName) {

        showResult(
          "Please enter the mother's name.",
          "error"
        );

        return;

      }


      if (
        !/^\d{4}$/.test(
          student.admissionYear
        )
      ) {

        showResult(
          "Please enter a valid admission year.",
          "error"
        );

        return;

      }


      if (
        student.photo &&
        !/^https?:\/\//i.test(
          student.photo
        )
      ) {

        showResult(
          "Photo must be a valid HTTP/HTTPS URL.",
          "error"
        );

        return;

      }


      /* ---------------------------------------------------
         Disable submit button
         --------------------------------------------------- */

      const originalText =
        submitButton
          ? submitButton.textContent
          : "Submit & Generate Student ID";


      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "Registering...";

      }


      try {

        /* -------------------------------------------------
           Send data to Google Apps Script
           ------------------------------------------------- */

        const response =
          await fetch(
            API_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify({
                  action:
                    "addStudent",

                  student:
                    student
                })
            }
          );


        if (!response.ok) {

          throw new Error(
            "Server error: HTTP " +
            response.status
          );

        }


        const data =
          await response.json();


        /* -------------------------------------------------
           Check backend response
           ------------------------------------------------- */

        if (!data.success) {

          throw new Error(
            data.message ||
            "Registration failed."
          );

        }


        /* -------------------------------------------------
           Student successfully registered
           ------------------------------------------------- */

        const studentId =
          data.studentId;


        const verificationUrl =
          window.location.origin +
          window.location.pathname
            .replace(
              /\/[^/]*$/,
              "/verify.html"
            ) +
          "?id=" +
          encodeURIComponent(
            studentId
          );


        /* QR code */

        const qrUrl =
          "https://api.qrserver.com/v1/create-qr-code/" +
          "?size=250x250" +
          "&data=" +
          encodeURIComponent(
            verificationUrl
          );


        /* -------------------------------------------------
           Create result
           ------------------------------------------------- */

        const safeId =
          escapeHtml(
            studentId
          );

        const safeName =
          escapeHtml(
            student.name
          );

        const safeDob =
          escapeHtml(
            student.dob
          );

        const safeFather =
          escapeHtml(
            student.fatherName
          );

        const safeMother =
          escapeHtml(
            student.motherName
          );

        const safeYear =
          escapeHtml(
            student.admissionYear
          );


        let photoHTML = "";

        if (student.photo) {

          const safePhoto =
            escapeHtml(
              student.photo
            );

          photoHTML = `
            <div
              class="student-result-photo"
            >
              <img
                src="${safePhoto}"
                alt="${safeName}"
              >
            </div>
          `;

        }


        resultBox.classList.remove(
          "hidden",
          "error"
        );

        resultBox.classList.add(
          "success"
        );


        resultBox.innerHTML = `

          <div
            class="student-success-card"
          >

            <div
              class="success-heading"
            >

              <span
                class="success-icon"
              >
                ✓
              </span>

              <div>

                <h2>
                  Registration Successful
                </h2>

                <p>
                  Your Trinity Art School
                  Student ID has been generated.
                </p>

              </div>

            </div>


            <div
              class="student-id-display"
            >

              <span>
                STUDENT ID
              </span>

              <strong>
                ${safeId}
              </strong>

            </div>


            <div
              class="student-card-preview"
            >

              <div
                class="student-card-header"
              >

                <small>
                  TRINITY ART SCHOOL
                </small>

                <h3>
                  STUDENT ID CARD
                </h3>

              </div>


              ${photoHTML}


              <div
                class="student-details"
              >

                <p>
                  <strong>
                    Student ID:
                  </strong>
                  ${safeId}
                </p>

                <p>
                  <strong>
                    Name:
                  </strong>
                  ${safeName}
                </p>

                <p>
                  <strong>
                    Date of Birth:
                  </strong>
                  ${safeDob}
                </p>

                <p>
                  <strong>
                    Father's Name:
                  </strong>
                  ${safeFather}
                </p>

                <p>
                  <strong>
                    Mother's Name:
                  </strong>
                  ${safeMother}
                </p>

                <p>
                  <strong>
                    Admission Year:
                  </strong>
                  ${safeYear}
                </p>

              </div>


              <div
                class="student-qr"
              >

                <img
                  src="${qrUrl}"
                  alt="QR code for ${safeId}"
                >

                <small>
                  Scan to verify student
                </small>

              </div>

            </div>


            <div
              class="result-actions"
            >

              <button
                type="button"
                class="btn"
                id="printStudentCard"
              >
                Print Student ID Card
              </button>

              <button
                type="button"
                class="btn btn-outline"
                id="registerAnother"
              >
                Register Another Student
              </button>

            </div>

          </div>

        `;


        resultBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });


        /* -------------------------------------------------
           Print button
           ------------------------------------------------- */

        const printButton =
          document.getElementById(
            "printStudentCard"
          );


        if (printButton) {

          printButton.addEventListener(
            "click",
            function () {

              const card =
                document.querySelector(
                  ".student-card-preview"
                );


              if (!card) {
                return;
              }


              const printWindow =
                window.open(
                  "",
                  "_blank",
                  "width=700,height=900"
                );


              if (!printWindow) {

                alert(
                  "Please allow pop-ups to print the ID card."
                );

                return;

              }


              printWindow.document.write(`

                <!DOCTYPE html>

                <html>

                <head>

                  <title>
                    Student ID ${safeId}
                  </title>

                  <style>

                    * {
                      box-sizing: border-box;
                    }

                    body {
                      margin: 0;
                      padding: 30px;
                      font-family: Arial, sans-serif;
                      background: white;
                    }

                    .student-card-preview {
                      width: 380px;
                      margin: auto;
                      padding: 24px;
                      border: 2px solid #5b3924;
                      border-radius: 15px;
                    }

                    .student-card-header {
                      text-align: center;
                      margin-bottom: 18px;
                    }

                    .student-card-header small {
                      font-size: 11px;
                      letter-spacing: 2px;
                    }

                    .student-card-header h3 {
                      margin: 6px 0;
                    }

                    .student-result-photo {
                      text-align: center;
                      margin-bottom: 15px;
                    }

                    .student-result-photo img {
                      width: 100px;
                      height: 120px;
                      object-fit: cover;
                      border-radius: 8px;
                    }

                    .student-details p {
                      margin: 8px 0;
                      font-size: 13px;
                    }

                    .student-qr {
                      text-align: center;
                      margin-top: 18px;
                    }

                    .student-qr img {
                      width: 145px;
                      height: 145px;
                    }

                    .student-qr small {
                      display: block;
                      margin-top: 5px;
                    }

                  </style>

                </head>

                <body>

                  ${card.outerHTML}

                  <script>

                    window.onload =
                      function () {

                        window.print();

                      };

                  <\/script>

                </body>

                </html>

              `);


              printWindow.document.close();

            }
          );

        }


        /* -------------------------------------------------
           Register another student
           ------------------------------------------------- */

        const anotherButton =
          document.getElementById(
            "registerAnother"
          );


        if (anotherButton) {

          anotherButton.addEventListener(
            "click",
            function () {

              form.reset();

              resultBox.classList.add(
                "hidden"
              );

              resultBox.innerHTML =
                "";

              form.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }
          );

        }


        /* Clear form */

        form.reset();


      } catch (error) {

        console.error(
          "Registration error:",
          error
        );


        showResult(
          `
          <strong>
            Registration failed.
          </strong>

          <br><br>

          ${escapeHtml(
            error.message
          )}

          <br><br>

          Please check the Google Apps Script
          deployment and Web App URL.
          `,
          "error"
        );


      } finally {

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.textContent =
            originalText;

        }

      }

    }
  );

 // Add a small click effect
    document.querySelectorAll(".social-box").forEach(function(box) {

        box.addEventListener("click", function() {
            const platform = this.dataset.platform;

            console.log("Opening " + platform);
        });

    });
