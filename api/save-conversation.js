const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  // Captura los datos enviados desde la solicitud
  const { outseta_id, contenido, fecha } = req.body;

  // Configuración de la solicitud a Airtable (en minúsculas)
  const airtableUrl = "https://api.airtable.com/v0/appJ9k1ExwMlXrgqf/conversaciones";
  const headers = {
    "Authorization": `Bearer patLbJQX2UXN1CEYl.7800afdb0f479f8ba43cbee84dee289f60e74b0f856f85ee678148063de3ee0d`,
    "Content-Type": "application/json"
  };
  const data = {
    fields: {
      usuarios: [outseta_id],  // nombre del campo vinculado, en minúsculas
      contenido: contenido,    // nombre del campo, en minúsculas
      fecha: fecha             // nombre del campo, en minúsculas
    }
  };

  try {
    // Enviar la solicitud POST a Airtable
    const response = await axios.post(airtableUrl, data, { headers });
    res.status(200).json({ message: 'Conversación guardada en Airtable', data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
