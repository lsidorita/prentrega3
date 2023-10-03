document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("user_your_emailjs_user_id");

    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const saveEmailButton = document.getElementById("saveEmailButton");
    const recoverEmailButton = document.getElementById("recoverEmailButton");
    const deleteEmailButton = document.getElementById("deleteEmailButton");
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
        emailInput.value = savedEmail;
        toggleButtons("recover");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        if (!name || !email || !message) {
            toast("Por favor, complete todos los campos.");
            return;
        }
        localStorage.setItem("savedEmail", email);
        toggleButtons("recover");
        // Cambiar el texto del botón a "Enviando..."
        const submitButton = document.querySelector("button[type='submit']");
        submitButton.textContent = "Enviando...";
        submitButton.disabled = true;
        emailjs.send("service_j5lsuzm", "template_yg57thw", {
            from_name: name,
            to_name: "lsidorita",
            from_email: email,
            to_email: "isibarratorres@gmail.com",
            message: message,
        }, "XeT9pWLdLvQusrwNp")
        .then(
            () => {
                toast("Mensaje enviado con éxito, muchas gracias. Me contactaré con usted a la brevedad.");

                nameInput.value = "";
                emailInput.value = "";
                messageInput.value = "";

                // Restaurar el texto original del botón
                submitButton.textContent = "Enviar";
                submitButton.disabled = false;
            },
            (error) => {
                console.log(error);
                toast("Hubo un error al enviar el mensaje. Intente nuevamente.");

                // Restaurar el texto original del botón
                submitButton.textContent = "Enviar";
                submitButton.disabled = false;
            }
        );
    });
    // Manejar el clic en el botón Guardar
    saveEmailButton.addEventListener("click", function () {
        const email = emailInput.value;
        if (email) {
            // Guardar el correo en localStorage
            localStorage.setItem("savedEmail", email);
            toggleButtons("recover");
        }
    });

    // Manejar el clic en el botón Recuperar
    recoverEmailButton.addEventListener("click", function () {
        const savedEmail = localStorage.getItem("savedEmail");
        if (savedEmail) {
            // Rellenar el campo de correo con el correo guardado
            emailInput.value = savedEmail;
            toggleButtons("delete");
        }
    });

    // Manejar el clic en el botón Borrar
    deleteEmailButton.addEventListener("click", function () {
        // Borrar el correo guardado en localStorage
        localStorage.removeItem("savedEmail");
        emailInput.value = ""; // Limpiar el campo de correo
        toggleButtons("save");
    });

    function toggleButtons(action) {
        switch (action) {
            case "recover":
                recoverEmailButton.style.display = "block";
                deleteEmailButton.style.display = "block";
                saveEmailButton.style.display = "none";
                break;
            case "delete":
                recoverEmailButton.style.display = "block";
                deleteEmailButton.style.display = "block";
                saveEmailButton.style.display = "none";
                break;
            default:
                recoverEmailButton.style.display = "none";
                deleteEmailButton.style.display = "none";
                saveEmailButton.style.display = "block";
                break;
        }
    }
    function toast(message) {
        const toastContainer = document.getElementById("toast-container");
        const toastElement = document.createElement("div");
        toastElement.className = "toast";
        toastElement.textContent = message;
        toastContainer.appendChild(toastElement);

        setTimeout(() => {
            toastContainer.removeChild(toastElement);
        }, 3000);
    }

});