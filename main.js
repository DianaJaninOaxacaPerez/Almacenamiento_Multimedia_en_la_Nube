const cloudName = "ddn6wm37f";
const Preset = "DIANA_JANIN";

const fileInput = document.getElementById("fileInput");
const Imagen = document.getElementById("Imagen");
const mensaje = document.getElementById("mensaje");
function subirImg() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Selecciona una imagen primero");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", Preset);
    // Mostrar mensaje de cargando
    mensaje.innerHTML = "<p style='color: #e444d1;'> Subiendo imagen...</p>";
    mensaje.style.display = "block";
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.secure_url) {
            Imagen.src = data.secure_url;
            Imagen.style.display = "block";
            mensaje.innerHTML = `
                <p style='color: #c641c4; font-weight: bold; font-size: 18px;'>Imagen subida exitosamente</p>
                <p style='color: #333; margin-top: 10px;'>URL de la imagen:</p>
                <a href="${data.secure_url}" target="_blank" style='color: #516ff8; 
                word-break: break-all; text-decoration: none; display: block; padding: 10px; 
                background: #f1f3f5; border-radius: 5px; margin-top: 5px;'>${data.secure_url}</a>
            `;
        } else {
            mensaje.innerHTML = "<p style='color: #dc35d9; font-weight: bold;'> Error</p>";
            console.error("No llegó secure_url");
        }
    })
    .catch(err => {
        mensaje.innerHTML = `<p style='color: #dc35b2; font-weight: bold;'> Error al subir: ${err.message}</p>`;
        console.error(err);
    });
}