import { useEffect, useState } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function Siswa() {
    const [siswa, setSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [jurusan, setJurusan] = useState("");
    const navigate = useNavigate();

    const fetchData = () => {
        axios
            .get('http://localhost:3000/api/siswa')
            .then(response => {
                setSiswa(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        const modalEl = document.getElementById("exampleModal");
        if (modalEl) {
            const bsModal = new Modal(modalEl);

            // Reset form setiap modal ditutup
            modalEl.addEventListener("hidden.bs.modal", () => {
                setNama("");
                setAlamat("");
                setTanggalLahir("");
                setJurusan("");
            });
        }

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3000/api/siswa',
                { nama, alamat, tanggal_lahir, jurusan }
            )
            .then(response => {
                setNama("");
                setAlamat("");
                setTanggalLahir("");
                setJurusan("");
                fetchData();
                console.log(response);
            })
            .catch(error => {
                console.log("Gagal menyimpan data:", error);
            })
            .finally(() => {
                const modalEl = document.getElementById("exampleModal");
                const modalInstance = Modal.getInstance(modalEl);
                if (modalInstance) {
                    modalInstance.hide();
                }

                // hapus drackdrop klo ada
                // document.querySelectorAll(".modal-backdrop").forEach(bd => bd.remove());

                // // scrollable
                // document.body.classList.remove("modal-open");
                // document.body.style.overflow = "";
                // document.body.style.paddingRight = "";
            });
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Apakah kamu yakin akan menghapus data ini?"
        );
        if (!confirmDelete) return;

        axios
            .delete(`http://localhost:3000/api/siswa/${id}`)
            .then(response => {
                fetchData();
                console.log(response.data);
            })
            .catch(error => {
                console.error("Gagal menghapus data:", error);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    if (loading) {
        return (
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    const handleEdit = (id) => {
        navigate(`/editSiswa/${id}`);
    }

    return (
        <>
            <h2 className="text-center m-4">Daftar Siswa</h2>

            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn btn-primary col-12" onClick={() => {
                        const modalEl = document.getElementById("exampleModal");
                        const modal = new Modal(modalEl);
                        modal.show();
                    }}>
                        Tambah Siswa
                    </button><hr />
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Kode Siswa</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Tanggal Lahir</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswa.map((siswa, index) => (
                                <tr key={siswa.id}>
                                    <td>{index + 1}</td>
                                    <td>{siswa.kode_siswa}</td>
                                    <td>{siswa.nama}</td>
                                    <td>{siswa.alamat}</td>
                                    <td>{siswa.tanggal_lahir}</td>
                                    <td>{siswa.jurusan}</td>
                                    <td>
                                        <button className="btn btn-danger m-2" onClick={() => handleDelete(siswa.id)}><FaTrash /></button>
                                        <button className="btn btn-primary" onClick={() => handleEdit(siswa.id)}><FaEdit /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* tambahkan data */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Data Siswa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" placeholder="Nama Siswa" value={nama} onChange={(e) => setNama(e.target.value)} required />
                                    <label>Nama</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" placeholder="Alamat Siswa" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                                    <label>Alamat</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="date" className="form-control" placeholder="Tanggal Lahir" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
                                    <label>Tanggal Lahir</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <select className="form-select" aria-label="Default select example" value={jurusan} onChange={(e) => setJurusan(e.target.value)} required >
                                        <option defaultValue="" disabled>--- Jurusan ---</option>
                                        <option value="Software Engineer">Software Engineer</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                    </select>
                                    <label>Jurusan</label>
                                </div>

                                <div className="modal-footer mt-4">
                                    <button className="btn btn-primary m-1">Tambahkan</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Siswa;