import { useEffect, useState } from 'react';
import { getQuestionary, submitAnswers } from '../api/quizApi';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";


export default function Quiz() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [data, setData] = useState(null); // { nome, perguntas: [{ id, titulo, alternativas: [{ id, nome/descricao }] }] }
  const [answers, setAnswers] = useState({}); // { [idPergunta]: idAlternativa }
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await getQuestionary();
        setData(data);
      } catch (e) {
        setErr('Erro ao carregar questionário.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function onChoose(idPergunta, idAlternativa) {
    setAnswers((prev) => ({ ...prev, [idPergunta]: idAlternativa }));
  }

  async function onSubmit() {
    setErr('');
    try {
      const respostas = Object.entries(answers).map(([idPergunta, idAlternativa]) => ({
        idPergunta: Number(idPergunta),
        idAlternativa
      }));
      const { data: result } = await submitAnswers({
        idUsuario: user?.idUsuario, // confirme o nome do campo com o backend
        respostas
      });
      // Supondo que o back devolva { pontuacaoTotal, idQuestionario }:
      sessionStorage.setItem('result', JSON.stringify(result));
      navigate('/resultado');
    } catch (e) {
      setErr('Erro ao enviar respostas.');
    }
  }

  if (loading) return <Loading text="Carregando questionário..." />;
  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!data) return null;

  return (
    <div>
      <h1 className="mb-3">{data?.nome || 'Questionário'}</h1>
      {data.perguntas?.map((q) => (
        <div key={q.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{q.titulo}</h5>
            {q.alternativas?.map((alt) => (
              <div className="form-check" key={alt.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${q.id}`}
                  id={`q-${q.id}-a-${alt.id}`}
                  checked={answers[q.id] === alt.id}
                  onChange={() => onChoose(q.id, alt.id)}
                />
                <label className="form-check-label" htmlFor={`q-${q.id}-a-${alt.id}`}>
                  {alt.nome || alt.description}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={onSubmit}>Enviar respostas</button>
    </div>
  );
}