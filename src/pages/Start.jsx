import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startTest } from '../api/quizApi';

export default function Start() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setErr('');
        setLoading(true);
        try {
            const { data } = await startTest({ name, email });
            // Guarde o que o backend devolver: ex. { idUsuario, idTeste }
            sessionStorage.setItem('user', JSON.stringify({
                name, email, idUsuario: data?.idUsuario, idTeste: data?.idTeste
            }));
            navigate('/quiz');
        } catch (error) {
            setErr(error?.response?.data?.message || 'Erro ao iniciar o teste.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h1 className="mb-4">Iniciar Questionário</h1>
                <form onSubmit={onSubmit} className="card card-body">
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input className="form-control" value={name}
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input type="email" className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {err && <div className="alert alert-danger">{err}</div>}
                    <button className="btn btn-primary" disabled={loading}>
                        {loading ? <Loading text="Iniciando..." /> : "Iniciar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
