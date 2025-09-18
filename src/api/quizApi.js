import api from './client';

// POST /api/iniciar-teste  { name, email }
export function startTest({ name, email }) {
  return api.post('/api/iniciar-teste', { nome: name, email });
}

// GET /api/questionario
export function getQuestionary() {
  return api.get('/api/questionario');
}

// POST /api/resposta  { idUsuario, respostas: [{ idPergunta, idAlternativa }] }
export function submitAnswers({ idUsuario, respostas }) {
  return api.post('/api/resposta', { idUsuario, respostas });
}

// POST /api/questionario/:id/enviar-email
export function sendResultEmail({ questionarioId }) {
  return api.post(`/api/questionario/${questionarioId}/enviar-email`);
}