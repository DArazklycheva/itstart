import React, { useEffect, useState } from 'react';
import './Seminars.css'
import seminarsData from './seminars.json'; // Импортируйте данные из JSON файла

const Seminars = () => {
    const [seminars, setSeminars] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSeminar, setCurrentSeminar] = useState(null);

    useEffect(() => {
        // Устанавливаем семинары из импортированных данных
        setSeminars(seminarsData.seminars);
    }, []);

    // Реализовываем кнопку удаления семинара
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот семинар?");
        if (confirmDelete) {
            setSeminars(seminars.filter(seminar => seminar.id !== id));
        }
    };

    // Реализовываем кнопку редактирования семинара
    const handleEdit = (seminar) => {
        setCurrentSeminar(seminar);
        setIsEditing(true);
    };

    // Реализовываем кнопку сохранения семинара
    const handleSave = (updatedSeminar) => {
        setSeminars(seminars.map(seminar => (seminar.id === updatedSeminar.id ? updatedSeminar : seminar)));
        setIsEditing(false);
        setCurrentSeminar(null);
    };

    return (
        <div className="container">
            <h1>Семинары</h1>
            <ul className="seminars">
                {seminars.map(seminar => (
                    <li key={seminar.id} className="seminar">
                        <h2>{seminar.title}</h2>
                        <p>{seminar.description}</p>
                        <p>Дата: {seminar.date}</p>
                        <p>Время: {seminar.time}</p>
                        <img src={seminar.photo} alt={seminar.title} />
                        <div className="actions">
                            <button onClick={() => handleDelete(seminar.id)} className="delete">Удалить</button>
                            <button onClick={() => handleEdit(seminar)}
                                className="edit">Редактировать</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isEditing && (
                <Modal
                    seminar={currentSeminar}
                    onSave={handleSave}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

// Модальное окно
const Modal = ({ seminar, onSave, onClose }) => {
    const [updatedSeminar, setUpdatedSeminar] = useState(seminar);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSeminar({ ...updatedSeminar, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedSeminar);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-title">Редактировать семинар</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label className="label-modal">
                        Название:
                        <input
                            type="text"
                            name="title"
                            value={updatedSeminar.title}
                            onChange={handleChange}
                            className="input-modal"
                        />
                    </label>
                    <label className="label-modal">
                        Описание:
                        <textarea
                            name="description"
                            value={updatedSeminar.description}
                            onChange={handleChange}
                            className="textarea-modal"
                        />
                    </label>
                    <label className="label-modal">
                        Дата:
                        <input
                            type="date"
                            name="date"
                            value={updatedSeminar.date}
                            onChange={handleChange}
                            className="input-modal"
                        />
                    </label>
                    <label className="label-modal">
                        Время:
                        <input
                            type="time"
                            name="time"
                            value={updatedSeminar.time}
                            onChange={handleChange}
                            className="input-modal"
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit" className="save">Сохранить</button>
                        <button type="button" className="close" onClick={onClose}>Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Seminars;