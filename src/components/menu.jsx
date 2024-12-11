'use client';

import { useState } from "react";
import Link from "next/link";

export default function Menu() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [searchCategory, setSearchCategory] = useState('usuarios');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3000/${searchCategory}/buscarPorNombre/${searchTerm}`);
            if (!res.ok) throw new Error('Error al buscar resultados');
            const data = await res.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" href="/chat">Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" href="/noticias">Noticias</Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className="nav-link active" 
                                    href="/usuarios/mostrar" 
                                    onClick={() => setSearchCategory('usuarios')}>
                                    Usuarios
                                </Link>
                            </li>   
                            <li className="nav-item">
                                <Link 
                                    className="nav-link active" 
                                    href="/productos/mostrar" 
                                    onClick={() => setSearchCategory('productos')}>
                                    Productos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" href="/ventas/mostrar">Ventas</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div>
                {loading && <p>Cargando...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && results.length > 0 && (
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>
                                {item.nombre}
                            </li>
                        ))}
                    </ul>
                )}
                {!loading && !error && results.length === 0 && <p>No se encontraron resultados.</p>}
            </div>
        </div>
    );
}
