import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';

const Modal = ({ onClose, addBook, books }) => {
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookSlug, setBookSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const generateSlug = () => {
      const slugifiedTitle = bookName.toLowerCase().replace(/\s+/g, '-');
      setBookSlug(slugifiedTitle);
    };
    generateSlug();
  }, [bookName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bookName.trim() === '' || bookAuthor.trim() === '') {
      alert('Усі поля мають бути заповнені');
      return;
    }
  
    if (!books.some(book => book.title === bookName && book.author === bookAuthor)) {
      addBook({
        title: bookName,
        author: bookAuthor,
        slug: bookSlug,
      });
    }
    else {
      alert('Книга з такою назвою і автором вже існує');
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <BootstrapModal show={true} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Додати нову книгу</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="bookName">
            <Form.Label>Назва книги</Form.Label>
            <Form.Control
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Назва книги"
            />
          </Form.Group>
          <Form.Group controlId="bookAuthor">
            <Form.Label>Автор</Form.Label>
            <Form.Control
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Автор"
            />
          </Form.Group>
          <Form.Group controlId="bookSlug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              value={bookSlug}
              placeholder="Slug"
              readOnly
            />
          </Form.Group>
          <Button type="submit" className="mt-3" disabled={isSubmitting}>{isSubmitting ? 'Додається...' : 'Додати книгу'}</Button>
        </Form>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;