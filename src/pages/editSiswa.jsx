import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSiswa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [jurusan, setJurusan] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/siswa/${id}`)
            .then((response) => {
                const m = response.data;
                setNama(m.nama);
                setAlamat(m.alamat);
                setTanggalLahir(m.tanggal_lahir);
                setJurusan(m.jurusan);
            })
            .catch(() => alert("Gagal mengambil data"))
            .finally(() => setLoading(false));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/siswa/${id}`, {
                nama,
                alamat,
                tanggal_lahir,
                jurusan
            });

            alert("Siswa berhasil diupdate!");
            navigate("/siswa");

        } catch (error) {
            console.error(error);
            alert("Gagal memperbarui data");
        }
    };

    if (loading) {
        return (
            <div className="spinner-border text-info mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Data Siswa</h2>

            <form onSubmit={handleUpdate}>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
                    <label>Nama</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                    <label>Alamat</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="date" className="form-control" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} />
                    <label>Tanggal Lahir</label>
                </div>

                <div className="form-floating mb-2">
                    <select className="form-select" value={jurusan} onChange={(e) => setJurusan(e.target.value)}>
                        <option disabled value="">--- Jurusan ---</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                    <label>Jurusan</label>
                </div>

                <button className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    );
}
