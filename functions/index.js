const { onRequest, onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();


// 📌 Función para obtener todos los alumnos
exports.getAlumnos = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("alumnos").get();
      const alumnos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(alumnos);
    } catch (error) {
      res.status(500).send("Error obteniendo alumnos: " + error);
    }
  });
});

// 📌 Función para agregar alumno
exports.addAlumno = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { nombre, presente, justificante } = req.body;
      const newAlumno = {
        nombre,
        presente: presente || false,
        justificante: justificante || "",
      };

      const docRef = await db.collection("alumnos").add(newAlumno);
      res.status(201).json({ id: docRef.id, ...newAlumno });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar alumno" });
    }
  });
});

// 📌 Función para eliminar alumno
exports.deleteAlumno = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Se requiere un ID" });
      }

      await db.collection("alumnos").doc(id).delete();
      res.status(200).json({ message: "Alumno eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar alumno" });
    }
  });
});

exports.updateAsistencia = onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log('Request body:', req.body); // Verifica los datos recibidos

    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id, nombre, presente, justificante } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Se requiere un ID" });
      }

      // Crear objeto de actualización sólo con las propiedades definidas
      const updateData = {};
      if (nombre !== undefined) updateData.nombre = nombre;
      if (presente !== undefined) updateData.presente = presente;
      if (justificante !== undefined) updateData.justificante = justificante;

      await db.collection("alumnos").doc(id).update(updateData);

      res.status(200).json({ message: "Alumno actualizado correctamente" });
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      res.status(500).json({ error: "Error al actualizar alumno: " + error.message });
    }
  });
});

exports.generateUploadUrl = onCall(async (request) => {

  const bucket = admin.storage().bucket();
  const fileName = `profesores/${Date.now()}.jpg`;
  const file = bucket.file(fileName);

  const [url] = await file.getSignedUrl({
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // Expira en 15 min
      contentType: "image/jpeg"
  });

  return { uploadUrl: url, filePath: fileName };
});

exports.saveProfessorData = onCall(async (request) => {
  try {
    const { nombre, materia, email, telefono, imageUrl } = request.data; // Cambié 'data' por 'request.data'

    // Verifica que los datos no estén vacíos
    if (!nombre || !materia || !email || !telefono) {
        throw new functions.https.HttpsError("invalid-argument", "Faltan datos obligatorios.");
    }

    const profesorRef = db.collection("profesores").doc(email);
    await profesorRef.set({
        nombre,
        materia,
        email,
        telefono,
        imageUrl: imageUrl || null,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: "Información guardada correctamente." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
