import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import PageTransition from '../../components/PageTransition';
import { productsApi } from '../../api/products.api';
import type { Product } from '../../types';

const emptyForm = {
  name: '', category: 'equipment' as 'equipment' | 'supplements',
  price: 0, imageUrl: '', stock: 0, description: '', brand: '',
};

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => productsApi.findAll().then(setProducts);
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyForm); setShow(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, category: p.category, price: p.price, imageUrl: p.imageUrl,
      stock: p.stock, description: p.description, brand: p.brand ?? '',
    });
    setShow(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await productsApi.update(editing.id, form);
        toast.success('Product updated');
      } else {
        await productsApi.create(form);
        toast.success('Product created');
      }
      setShow(false);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await productsApi.remove(id);
    toast.success('Product deleted');
    load();
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0">Manage products</h1>
          <Button variant="dark" onClick={openNew}><FaPlus className="me-2" />Add product</Button>
        </div>

        <Table responsive hover className="align-middle bg-white shadow-sm">
          <thead>
            <tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.imageUrl} alt="" width={50} height={50} style={{ objectFit: 'cover', borderRadius: 4 }} /></td>
                <td>{p.name}</td>
                <td><Badge bg={p.category === 'equipment' ? 'primary' : 'success'}>{p.category}</Badge></td>
                <td>₹{p.price.toLocaleString('en-IN')}</td>
                <td>{p.stock}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEdit(p)}><FaEdit /></Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton><Modal.Title>{editing ? 'Edit' : 'New'} product</Modal.Title></Modal.Header>
          <Form onSubmit={handleSave}>
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}>
                  <option value="equipment">Equipment</option>
                  <option value="supplements">Supplements</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Brand</Form.Label>
                <Form.Control value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" required value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Image URL</Form.Label>
                <Form.Control required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
              <Button type="submit" variant="dark">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </PageTransition>
  );
}