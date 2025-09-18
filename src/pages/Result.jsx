import { useState } from 'react';
import { sendResultEmail } from '../api/quizApi';

export default function Result() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const result = JSON.parse(sessionStorage.getItem('result') || '{}');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');

  async function onSendEmail() {
    setMsg('');
    setSending(true);
    try {
      await sendResultEmail({ questionarioId: result?.idQuestionario || result?.id });
      setMsg('Resultado enviado para seu e-mail!');
    } catch {
      setMsg('Não foi possível enviar o e-mail agora.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="col-md-8">
      <div className="card card-body">
        <h2>Parabéns!</h2>
        <p>
          Oi <strong>{user?.name || 'Aluno'}</strong>, seu resultado foi{' '}
          <strong>{result?.pontuacaoTotal ?? '-'}</strong>.
        </p>
        <button className="btn btn-outline-primary" disabled={sending} onClick={onSendEmail}>
          {sending ? 'Enviando…' : 'Enviar por e-mail'}
        </button>
        {msg && <div className="alert alert-info mt-3">{msg}</div>}
      </div>
    </div>
  );
}